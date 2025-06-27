CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    sign_up_date DATE NOT NULL,
    username VARCHAR(255),
    weight_goal VARCHAR(50),
    activity_level VARCHAR(50),
    height INT,
    weight INT,
    weight_target DOUBLE
);


CREATE TABLE user_goals (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    goal_weight BIGINT,
    calorie_target BIGINT,
    updated_at TIME,
    sleep_goal BIGINT,
    steps_goal BIGINT,
    water_goal BIGINT,
    workout_goal BIGINT,
    weekly_goal VARCHAR(50),
    protein_goal INT,
    carbs_goal INT,
    fat_goal INT
);

CREATE TABLE calorie_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    day_date DATE NOT NULL,
    current_calories INT DEFAULT 0 NOT NULL,
    target_calories INT DEFAULT 2000 NOT NULL
);


CREATE TABLE days (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    date DATE NOT NULL
);

CREATE TABLE meals (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    day_id BIGINT NOT NULL,
    type VARCHAR(255) NOT NULL,
    total_calories BIGINT NOT NULL
);

CREATE TABLE foods (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    meal_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    calories BIGINT NOT NULL,
    quantity BIGINT NOT NULL,
    protein DOUBLE DEFAULT 0,
    carbs DOUBLE DEFAULT 0,
    fat DOUBLE DEFAULT 0
);

CREATE TABLE sleep_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    sleep_hours BIGINT NOT NULL,
    logged_at TIMESTAMP NOT NULL
);

CREATE TABLE steps_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    steps BIGINT NOT NULL,
    logged_at TIMESTAMP NOT NULL
);

CREATE TABLE water_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    water_intake BIGINT NOT NULL,
    logged_at TIMESTAMP NOT NULL
);

CREATE TABLE weight_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    weight BIGINT NOT NULL,
    logged_at TIME NOT NULL
);

CREATE TABLE workouts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    muscle_group TEXT,
    image_url TEXT,
    duration_in_min INT
);

CREATE TABLE user_workouts (
    id BIGINT PRIMARY KEY,
    duration_in_min INT NOT NULL,
    image_url VARCHAR(255),
    type TEXT,
    title TEXT,
    description TEXT,
    user_id BIGINT
);

CREATE TABLE user_workout_exercises (
    user_workout_id BIGINT NOT NULL,
    exercise_id BIGINT NOT NULL,
    performed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (user_workout_id, exercise_id)
);

CREATE TABLE user_workout_sets (
    user_workout_id BIGINT NOT NULL,
    exercise_id BIGINT NOT NULL,
    set_order SMALLINT NOT NULL,
    weight_kg NUMERIC,
    reps SMALLINT,
    rir SMALLINT,
    rest_seconds SMALLINT,
    notes TEXT,
    performed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_workout_id, exercise_id, set_order)
);
