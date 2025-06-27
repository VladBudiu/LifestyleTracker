export interface FoodDBItem {
    id: string;
    name: string;
    /** values per 100 g */
    kcal: number;
    prot: number;
    carb: number;
    fat: number;
  }
  
  export const FOOD_DB: FoodDBItem[] = [
    { id: "apple",   name: "Apple, raw",              kcal: 52,  prot: 0.3, carb: 14,  fat: 0.2 },
    { id: "banana",  name: "Banana, raw",             kcal: 89,  prot: 1.1, carb: 23,  fat: 0.3 },
    { id: "chicken", name: "Chicken breast, cooked",  kcal: 165, prot: 31,  carb: 0,   fat: 3.6 },
    { id: "rice",    name: "White rice, cooked",      kcal: 130, prot: 2.7, carb: 28,  fat: 0.3 },
    { id: "egg",     name: "Egg, whole, boiled",      kcal: 155, prot: 13,  carb: 1.1, fat: 11  },

  ];
  