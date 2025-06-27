package VladBudiu.licenta.Backend.service;

import VladBudiu.licenta.Backend.DTOs.*;
import VladBudiu.licenta.Backend.Utility.DtoMapper;
import VladBudiu.licenta.Backend.model.CalorieLog;
import VladBudiu.licenta.Backend.model.User;
import VladBudiu.licenta.Backend.model.diary.*;
import VladBudiu.licenta.Backend.repository.CalorieLogRepository;
import VladBudiu.licenta.Backend.repository.UserGoalsRepository;
import VladBudiu.licenta.Backend.repository.diary.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DiaryService {

   
    private final DayRepository         dayRepo;
    private final MealRepository        mealRepo;
    private final FoodRepository        foodRepo;
    private final WaterLogRepository    waterRepo;
    private final StepsLogRepository    stepsRepo;
    private final SleepLogRepository    sleepRepo;
    private final WeightLogRepository   weightRepo;
    private final CalorieLogRepository  calorieRepo;
    private final UserGoalsRepository   goalsRepo;

   
    private Day getOrCreateDay(User user, LocalDate date) {
        return dayRepo.findByUserIdAndDate(user.getId(), date)
                .orElseGet(() -> {
                    Day d = new Day();
                    d.setUser(user);
                    d.setDate(date);
                    return dayRepo.save(d);
                });
    }

    private Meal getOrCreateMeal(Day day, MealType type) {
        return mealRepo.findByDayIdAndType(day.getId(), type)
                .orElseGet(() -> {
                    Meal m = new Meal();
                    m.setDay(day);
                    m.setType(type);
                    return mealRepo.save(m);
                });
    }

    
    @Transactional
    public DiaryDTO addFood(User user, LocalDate date,
                            MealType type, AddFoodRequestDTO req) {

        
        Day  day  = getOrCreateDay(user, date);
        Meal meal = getOrCreateMeal(day, type);

        Food f = new Food();
        f.setMeal(meal);
        f.setName(req.getName());
        f.setCalories(req.getCalories());
        f.setProtein(req.getProtein());
        f.setCarbs(req.getCarbs());
        f.setFat(req.getFat());
        f.setQuantity(req.getQuantity());
        foodRepo.save(f);

        /* ----- update meal's own calorie total (optional) ----- */
        int mealTotal = foodRepo.findByMealId(meal.getId())
                .stream().mapToInt(Food::getCalories).sum();
        meal.setTotalCalories(mealTotal);
        mealRepo.save(meal);

        /* ----- bump today's CalorieLog.currentCalories ----- */
        CalorieLog log = getOrCreateCalorieLog(user, date);
        log.setCurrentCalories(log.getCurrentCalories() + req.getCalories());
        calorieRepo.save(log);

        /* ----- return fresh diary ----- */
        return buildDiary(user, date);
    }


    /* ----- water: cumulate for a day ----- */
    @Transactional
    public DiaryDTO updateWater(User user, LocalDate date, int ml) {
        Optional<WaterLog> existing = waterRepo
                .findFirstByUserIdAndLoggedAtBetween(
                        user.getId(),
                        date.atStartOfDay(),
                        date.plusDays(1).atStartOfDay());

        WaterLog log = existing.orElseGet(WaterLog::new);
        log.setUser(user);
        log.setWaterIntake((existing.map(WaterLog::getWaterIntake).orElse(0)) + ml);
        log.setLoggedAt(LocalDateTime.now());
        waterRepo.save(log);

        return buildDiary(user, date);
    }

    /* ----- steps / sleep / weight: simple append ----- */
    @Transactional
    public DiaryDTO updateSteps(User user, LocalDate date, int steps) {
        StepsLog s = new StepsLog();
        s.setUser(user); s.setSteps(steps); s.setLoggedAt(LocalDateTime.now());
        stepsRepo.save(s);
        return buildDiary(user, date);
    }

    @Transactional
    public DiaryDTO updateSleep(User user, LocalDate date, double hours) {
        SleepLog sl = new SleepLog();
        sl.setUser(user); sl.setSleepHours(hours); sl.setLoggedAt(LocalDateTime.now());
        sleepRepo.save(sl);
        return buildDiary(user, date);
    }

    @Transactional
    public DiaryDTO updateWeight(User user, LocalDate date, double kg) {
        WeightLog wl = new WeightLog();
        wl.setUser(user); wl.setWeight(kg); wl.setLoggedAt(LocalDateTime.now());
        weightRepo.save(wl);
        return buildDiary(user, date);
    }

    /* ───────── build full diary DTO ───────── */
    @Transactional(readOnly = true)
    public DiaryDTO buildDiary(User user, LocalDate date) {

        /* meals  */
        Day day = dayRepo.findByUserIdAndDate(user.getId(), date).orElse(null);
        List<MealDTO> meals = day == null ? List.of()
                : day.getMeals().stream().map(DtoMapper::toDto).toList();


        /*  calories & macros  */
        CalorieLog cLog = calorieRepo.findByUserIdAndDay(user.getId(), date).orElse(null);
        int totalCal = cLog != null ? cLog.getCurrentCalories() : 0;

        double totProt = 0, totCarb = 0, totFat = 0;
        for (MealDTO m : meals) {
            for (var food : m.getFoods()) {
                totProt += food.getProtein();
                totCarb += food.getCarbs();
                totFat  += food.getFat();
            }
        }


        /*  water / steps / etc.  */
        int water = waterRepo.findFirstByUserIdOrderByLoggedAtDesc(user.getId())
                .map(WaterLog::getWaterIntake).orElse(0);

        int waterGoal = goalsRepo.findByUserId(user.getId())
                .map(ug -> Optional.ofNullable(ug.getWaterGoal()).orElse(2000))
                .orElse(2000);

        int steps = stepsRepo.findFirstByUserIdAndLoggedAtBetween(
                        user.getId(), date.atStartOfDay(), date.plusDays(1).atStartOfDay())
                .map(StepsLog::getSteps).orElse(0);

        double sleep = sleepRepo.findFirstByUserIdOrderByLoggedAtDesc(user.getId())
                .map(SleepLog::getSleepHours).orElse(0.0);

        double weight = weightRepo.findFirstByUserIdOrderByLoggedAtDesc(user.getId())
                .map(WeightLog::getWeight).orElse(0.0);

        /*  calorie goal  */
        int calorieGoal = calorieRepo.findByUserIdAndDay(user.getId(), date)
                .map(CalorieLog::getTargetCalories)
                .orElse(2000);

        /*  macro goals  */
        MacroGoals macroGoals = goalsRepo.findByUserId(user.getId())
                .map(ug -> new MacroGoals(
                        Optional.ofNullable(ug.getProteinGoal()).orElse(0),
                        Optional.ofNullable(ug.getCarbsGoal()).orElse(0),
                        Optional.ofNullable(ug.getFatGoal()).orElse(0)))
                .orElseGet(() -> computeMacroGoals(calorieGoal, user.getWeightGoal()));

        System.out.println("Macros: " + totFat + totProt + totCarb);

        return DiaryDTO.builder()
                .date(date)
                .meals(meals)
                .totalCalories(totalCal)
                .protein(totProt)
                .carbs(totCarb)
                .fat(totFat)
                .macroGoals(macroGoals)
                .waterMl(water)
                .waterGoalMl(waterGoal)
                .steps(steps)
                .sleepHours(sleep)
                .weight(weight)
                .calorieGoal(calorieGoal)
                .build();
    }

    /*  recommended macro split  */
    private MacroGoals computeMacroGoals(int kcal, String weightGoal) {
        int carbsPct   = 40;
        int proteinPct = "gain".equalsIgnoreCase(weightGoal) ? 40 : 30;
        int fatPct     = 100 - carbsPct - proteinPct;     

        double carbsG   = (kcal * carbsPct   / 100.0) / 4;   // 4 kcal / g
        double proteinG = (kcal * proteinPct / 100.0) / 4;
        double fatG     = (kcal * fatPct     / 100.0) / 9;   // 9 kcal / g
        return new MacroGoals(
                Math.round(proteinG),
                Math.round(carbsG),
                Math.round(fatG));
    }

    /* ---------- ensure a CalorieLog row exists & return it ---------- */
    private CalorieLog getOrCreateCalorieLog(User user, LocalDate date) {
        return calorieRepo.findByUserIdAndDay(user.getId(), date)
                .orElseGet(() -> {
                    CalorieLog cl = new CalorieLog();
                    cl.setUser(user);
                    cl.setDay(date);
                    cl.setTargetCalories(2_000);      // default goal
                    cl.setCurrentCalories(0);
                    return calorieRepo.save(cl);
                });
    }

}
