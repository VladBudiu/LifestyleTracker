PGDMP  /                     }           ftiness    17.4    17.4 k    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    16538    ftiness    DATABASE     m   CREATE DATABASE ftiness WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en-US';
    DROP DATABASE ftiness;
                     postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                     pg_database_owner    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                        pg_database_owner    false    5            �            1259    16578    admin_actions    TABLE       CREATE TABLE public.admin_actions (
    id bigint NOT NULL,
    "adminId" bigint NOT NULL,
    "userId" bigint NOT NULL,
    action character varying(255) NOT NULL,
    "timestamp" timestamp(0) without time zone NOT NULL,
    details character varying(255) NOT NULL
);
 !   DROP TABLE public.admin_actions;
       public         heap r       postgres    false    5            �            1259    16571    admins    TABLE     �   CREATE TABLE public.admins (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "dateCreated" date NOT NULL
);
    DROP TABLE public.admins;
       public         heap r       postgres    false    5            �            1259    33132    calorie_logs    TABLE     �   CREATE TABLE public.calorie_logs (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    day date NOT NULL,
    current_calories integer DEFAULT 0 NOT NULL,
    target_calories integer DEFAULT 2000 NOT NULL
);
     DROP TABLE public.calorie_logs;
       public         heap r       postgres    false    5            �            1259    33131    calorie_logs_id_seq    SEQUENCE     |   CREATE SEQUENCE public.calorie_logs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.calorie_logs_id_seq;
       public               postgres    false    5    246            �           0    0    calorie_logs_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.calorie_logs_id_seq OWNED BY public.calorie_logs.id;
          public               postgres    false    245            �            1259    16546    days    TABLE     j   CREATE TABLE public.days (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    date date NOT NULL
);
    DROP TABLE public.days;
       public         heap r       postgres    false    5            �            1259    33095    days_id_seq    SEQUENCE     t   CREATE SEQUENCE public.days_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.days_id_seq;
       public               postgres    false    5    219            �           0    0    days_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.days_id_seq OWNED BY public.days.id;
          public               postgres    false    241            �            1259    32817 	   exercises    TABLE     �  CREATE TABLE public.exercises (
    id integer NOT NULL,
    exercise text,
    short_youtube_demo jsonb,
    in_depth_youtube_explanation jsonb,
    difficulty_level text,
    target_muscle_group text,
    prime_mover_muscle text,
    secondary_muscle text,
    tertiary_muscle text,
    primary_equipment text,
    primary_items integer,
    secondary_equipment text,
    secondary_items integer,
    posture text,
    single_or_double_arm text,
    continuous_or_alternating_arms text,
    grip text,
    load_position_ending text,
    continuous_or_alternating_legs text,
    foot_elevation text,
    combination_exercises text,
    movement_pattern_1 text,
    movement_pattern_2 text,
    movement_pattern_3 text,
    plane_of_motion_1 text,
    plane_of_motion_2 text,
    plane_of_motion_3 text,
    body_region text,
    force_type text,
    mechanics text,
    laterality text,
    primary_exercise_classification text
);
    DROP TABLE public.exercises;
       public         heap r       postgres    false    5            �            1259    32816    exercises_id_seq    SEQUENCE     �   CREATE SEQUENCE public.exercises_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.exercises_id_seq;
       public               postgres    false    238    5            �           0    0    exercises_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.exercises_id_seq OWNED BY public.exercises.id;
          public               postgres    false    237            �            1259    16556    foods    TABLE     +  CREATE TABLE public.foods (
    id bigint NOT NULL,
    meal_id bigint NOT NULL,
    name character varying(255) NOT NULL,
    calories bigint NOT NULL,
    quantity bigint NOT NULL,
    protein double precision DEFAULT 0,
    carbs double precision DEFAULT 0,
    fat double precision DEFAULT 0
);
    DROP TABLE public.foods;
       public         heap r       postgres    false    5            �            1259    33104    foods_id_seq    SEQUENCE     u   CREATE SEQUENCE public.foods_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.foods_id_seq;
       public               postgres    false    221    5            �           0    0    foods_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.foods_id_seq OWNED BY public.foods.id;
          public               postgres    false    243            �            1259    16551    meals    TABLE     �   CREATE TABLE public.meals (
    id bigint NOT NULL,
    day_id bigint NOT NULL,
    type character varying(255) NOT NULL,
    total_calories bigint NOT NULL
);
    DROP TABLE public.meals;
       public         heap r       postgres    false    5            �            1259    33097    meals_id_seq    SEQUENCE     u   CREATE SEQUENCE public.meals_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.meals_id_seq;
       public               postgres    false    5    220            �           0    0    meals_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.meals_id_seq OWNED BY public.meals.id;
          public               postgres    false    242            �            1259    33403    sleep_logs_id_seq    SEQUENCE     z   CREATE SEQUENCE public.sleep_logs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.sleep_logs_id_seq;
       public               postgres    false    5            �            1259    16590 
   sleep_logs    TABLE     �   CREATE TABLE public.sleep_logs (
    id bigint DEFAULT nextval('public.sleep_logs_id_seq'::regclass) NOT NULL,
    user_id bigint NOT NULL,
    sleep_hours bigint NOT NULL,
    logged_at timestamp(0) without time zone NOT NULL
);
    DROP TABLE public.sleep_logs;
       public         heap r       postgres    false    249    5            �            1259    33406    step_logs_id_seq    SEQUENCE     y   CREATE SEQUENCE public.step_logs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.step_logs_id_seq;
       public               postgres    false    5            �            1259    16595 
   steps_logs    TABLE     �   CREATE TABLE public.steps_logs (
    id bigint DEFAULT nextval('public.step_logs_id_seq'::regclass) NOT NULL,
    user_id bigint NOT NULL,
    steps bigint NOT NULL,
    logged_at timestamp(0) without time zone NOT NULL
);
    DROP TABLE public.steps_logs;
       public         heap r       postgres    false    250    5            �            1259    16566 
   user_goals    TABLE     �  CREATE TABLE public.user_goals (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    goal_weight bigint,
    calorie_target bigint,
    updated_at time(0) without time zone,
    sleep_goal bigint,
    steps_goal bigint,
    water_goal bigint,
    workout_goal bigint,
    weekly_goal character varying(50),
    protein_goal integer,
    carbs_goal integer,
    fat_goal integer
);
    DROP TABLE public.user_goals;
       public         heap r       postgres    false    5            �            1259    32783    user_goals_id_seq    SEQUENCE     z   CREATE SEQUENCE public.user_goals_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.user_goals_id_seq;
       public               postgres    false    5    223            �           0    0    user_goals_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.user_goals_id_seq OWNED BY public.user_goals.id;
          public               postgres    false    234            �            1259    16585    user_sessions    TABLE     �   CREATE TABLE public.user_sessions (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    login_time timestamp(0) without time zone NOT NULL,
    logout_time timestamp(0) without time zone NOT NULL,
    is_active boolean NOT NULL
);
 !   DROP TABLE public.user_sessions;
       public         heap r       postgres    false    5            �            1259    32843    user_workout_exercises    TABLE     �   CREATE TABLE public.user_workout_exercises (
    user_workout_id bigint NOT NULL,
    exercise_id bigint NOT NULL,
    performed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
 *   DROP TABLE public.user_workout_exercises;
       public         heap r       postgres    false    5            �            1259    33119    user_workout_sets    TABLE     4  CREATE TABLE public.user_workout_sets (
    user_workout_id bigint NOT NULL,
    exercise_id bigint NOT NULL,
    set_order smallint NOT NULL,
    weight_kg numeric,
    reps smallint,
    rir smallint,
    rest_seconds smallint,
    notes text,
    performed_at timestamp without time zone DEFAULT now()
);
 %   DROP TABLE public.user_workout_sets;
       public         heap r       postgres    false    5            �            1259    16683    user_workouts    TABLE     �   CREATE TABLE public.user_workouts (
    id bigint NOT NULL,
    duration_in_min integer NOT NULL,
    image_url character varying(255),
    type text,
    title text,
    description text,
    user_id bigint,
    performed_at date DEFAULT CURRENT_DATE
);
 !   DROP TABLE public.user_workouts;
       public         heap r       postgres    false    5            �            1259    41304    user_workouts_seq    SEQUENCE     z   CREATE SEQUENCE public.user_workouts_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.user_workouts_seq;
       public               postgres    false    232    5            �           0    0    user_workouts_seq    SEQUENCE OWNED BY     J   ALTER SEQUENCE public.user_workouts_seq OWNED BY public.user_workouts.id;
          public               postgres    false    251            �            1259    16539    users    TABLE     �  CREATE TABLE public.users (
    id bigint NOT NULL,
    first_name character varying(255),
    last_name character varying(255),
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    date_of_birth date,
    sign_up_date date NOT NULL,
    username character varying(255),
    weight_goal character varying(50),
    activity_level character varying(50),
    height integer,
    weight integer,
    weight_target double precision
);
    DROP TABLE public.users;
       public         heap r       postgres    false    5            �            1259    32776    users_id_seq    SEQUENCE     u   CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public               postgres    false    218    5            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public               postgres    false    233            �            1259    16600 
   water_logs    TABLE     �   CREATE TABLE public.water_logs (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    water_intake bigint NOT NULL,
    logged_at timestamp(0) without time zone NOT NULL
);
    DROP TABLE public.water_logs;
       public         heap r       postgres    false    5            �            1259    33150    water_logs_id_seq    SEQUENCE     �   ALTER TABLE public.water_logs ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.water_logs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    5    229            �            1259    16561    weight_logs    TABLE     �   CREATE TABLE public.weight_logs (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    weight bigint NOT NULL,
    logged_at timestamp without time zone NOT NULL
);
    DROP TABLE public.weight_logs;
       public         heap r       postgres    false    5            �            1259    33148    weight_logs_id_seq    SEQUENCE     �   ALTER TABLE public.weight_logs ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.weight_logs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    5    222            �            1259    32825    workout_exercises    TABLE     m   CREATE TABLE public.workout_exercises (
    workout_id integer NOT NULL,
    exercise_id integer NOT NULL
);
 %   DROP TABLE public.workout_exercises;
       public         heap r       postgres    false    5            �            1259    16682    workout_id_seq    SEQUENCE     �   ALTER TABLE public.user_workouts ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.workout_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    5    232            �            1259    16605    workout_logs    TABLE     �   CREATE TABLE public.workout_logs (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    week_start date NOT NULL,
    workouts_done bigint NOT NULL
);
     DROP TABLE public.workout_logs;
       public         heap r       postgres    false    5            �            1259    41327    workout_logs_id_seq    SEQUENCE     �   ALTER TABLE public.workout_logs ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.workout_logs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    230    5            �            1259    41316    workout_sessions    TABLE     �   CREATE TABLE public.workout_sessions (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    workout_id bigint NOT NULL,
    session_date date NOT NULL,
    total_volume numeric,
    created_at timestamp without time zone DEFAULT now()
);
 $   DROP TABLE public.workout_sessions;
       public         heap r       postgres    false    5            �            1259    41315    workout_sessions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.workout_sessions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.workout_sessions_id_seq;
       public               postgres    false    5    253            �           0    0    workout_sessions_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.workout_sessions_id_seq OWNED BY public.workout_sessions.id;
          public               postgres    false    252            �            1259    32798    workouts    TABLE     �   CREATE TABLE public.workouts (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    muscle_group text,
    image_url text,
    duration_in_min integer
);
    DROP TABLE public.workouts;
       public         heap r       postgres    false    5            �            1259    32797    workouts_id_seq    SEQUENCE     �   CREATE SEQUENCE public.workouts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.workouts_id_seq;
       public               postgres    false    236    5            �           0    0    workouts_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.workouts_id_seq OWNED BY public.workouts.id;
          public               postgres    false    235            �           2604    33135    calorie_logs id    DEFAULT     r   ALTER TABLE ONLY public.calorie_logs ALTER COLUMN id SET DEFAULT nextval('public.calorie_logs_id_seq'::regclass);
 >   ALTER TABLE public.calorie_logs ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    246    245    246            �           2604    33096    days id    DEFAULT     b   ALTER TABLE ONLY public.days ALTER COLUMN id SET DEFAULT nextval('public.days_id_seq'::regclass);
 6   ALTER TABLE public.days ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    241    219            �           2604    32820    exercises id    DEFAULT     l   ALTER TABLE ONLY public.exercises ALTER COLUMN id SET DEFAULT nextval('public.exercises_id_seq'::regclass);
 ;   ALTER TABLE public.exercises ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    238    237    238            �           2604    33105    foods id    DEFAULT     d   ALTER TABLE ONLY public.foods ALTER COLUMN id SET DEFAULT nextval('public.foods_id_seq'::regclass);
 7   ALTER TABLE public.foods ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    243    221            �           2604    33098    meals id    DEFAULT     d   ALTER TABLE ONLY public.meals ALTER COLUMN id SET DEFAULT nextval('public.meals_id_seq'::regclass);
 7   ALTER TABLE public.meals ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    242    220            �           2604    32784    user_goals id    DEFAULT     n   ALTER TABLE ONLY public.user_goals ALTER COLUMN id SET DEFAULT nextval('public.user_goals_id_seq'::regclass);
 <   ALTER TABLE public.user_goals ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    234    223            �           2604    32777    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    233    218            �           2604    41319    workout_sessions id    DEFAULT     z   ALTER TABLE ONLY public.workout_sessions ALTER COLUMN id SET DEFAULT nextval('public.workout_sessions_id_seq'::regclass);
 B   ALTER TABLE public.workout_sessions ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    252    253    253            �           2604    32801    workouts id    DEFAULT     j   ALTER TABLE ONLY public.workouts ALTER COLUMN id SET DEFAULT nextval('public.workouts_id_seq'::regclass);
 :   ALTER TABLE public.workouts ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    236    235    236            �           2606    16545    users User_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 ;   ALTER TABLE ONLY public.users DROP CONSTRAINT "User_pkey";
       public                 postgres    false    218            �           2606    16584     admin_actions admin_actions_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.admin_actions
    ADD CONSTRAINT admin_actions_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.admin_actions DROP CONSTRAINT admin_actions_pkey;
       public                 postgres    false    225            �           2606    16577    admins admins_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.admins DROP CONSTRAINT admins_pkey;
       public                 postgres    false    224            �           2606    33139    calorie_logs calorie_logs_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.calorie_logs
    ADD CONSTRAINT calorie_logs_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.calorie_logs DROP CONSTRAINT calorie_logs_pkey;
       public                 postgres    false    246            �           2606    33141 )   calorie_logs calorie_logs_user_day_unique 
   CONSTRAINT     l   ALTER TABLE ONLY public.calorie_logs
    ADD CONSTRAINT calorie_logs_user_day_unique UNIQUE (user_id, day);
 S   ALTER TABLE ONLY public.calorie_logs DROP CONSTRAINT calorie_logs_user_day_unique;
       public                 postgres    false    246    246            �           2606    16550    days days_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.days
    ADD CONSTRAINT days_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.days DROP CONSTRAINT days_pkey;
       public                 postgres    false    219            �           2606    32824    exercises exercises_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.exercises
    ADD CONSTRAINT exercises_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.exercises DROP CONSTRAINT exercises_pkey;
       public                 postgres    false    238            �           2606    16560    foods foods_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.foods
    ADD CONSTRAINT foods_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.foods DROP CONSTRAINT foods_pkey;
       public                 postgres    false    221            �           2606    16555    meals meals_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.meals
    ADD CONSTRAINT meals_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.meals DROP CONSTRAINT meals_pkey;
       public                 postgres    false    220            �           2606    16594    sleep_logs sleep_logs_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.sleep_logs
    ADD CONSTRAINT sleep_logs_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.sleep_logs DROP CONSTRAINT sleep_logs_pkey;
       public                 postgres    false    227            �           2606    16599    steps_logs steps_logs_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.steps_logs
    ADD CONSTRAINT steps_logs_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.steps_logs DROP CONSTRAINT steps_logs_pkey;
       public                 postgres    false    228            �           2606    41326    workout_logs unique_user_week 
   CONSTRAINT     g   ALTER TABLE ONLY public.workout_logs
    ADD CONSTRAINT unique_user_week UNIQUE (user_id, week_start);
 G   ALTER TABLE ONLY public.workout_logs DROP CONSTRAINT unique_user_week;
       public                 postgres    false    230    230            �           2606    16570    user_goals user_goals_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.user_goals
    ADD CONSTRAINT user_goals_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.user_goals DROP CONSTRAINT user_goals_pkey;
       public                 postgres    false    223            �           2606    16589     user_sessions user_sessions_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.user_sessions
    ADD CONSTRAINT user_sessions_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.user_sessions DROP CONSTRAINT user_sessions_pkey;
       public                 postgres    false    226            �           2606    32847 2   user_workout_exercises user_workout_exercises_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.user_workout_exercises
    ADD CONSTRAINT user_workout_exercises_pkey PRIMARY KEY (user_workout_id, exercise_id);
 \   ALTER TABLE ONLY public.user_workout_exercises DROP CONSTRAINT user_workout_exercises_pkey;
       public                 postgres    false    240    240            �           2606    33125 (   user_workout_sets user_workout_sets_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.user_workout_sets
    ADD CONSTRAINT user_workout_sets_pkey PRIMARY KEY (user_workout_id, exercise_id, set_order);
 R   ALTER TABLE ONLY public.user_workout_sets DROP CONSTRAINT user_workout_sets_pkey;
       public                 postgres    false    244    244    244            �           2606    16604    water_logs water_logs_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.water_logs
    ADD CONSTRAINT water_logs_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.water_logs DROP CONSTRAINT water_logs_pkey;
       public                 postgres    false    229            �           2606    16565    weight_logs weight_logs_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.weight_logs
    ADD CONSTRAINT weight_logs_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.weight_logs DROP CONSTRAINT weight_logs_pkey;
       public                 postgres    false    222            �           2606    32829 (   workout_exercises workout_exercises_pkey 
   CONSTRAINT     {   ALTER TABLE ONLY public.workout_exercises
    ADD CONSTRAINT workout_exercises_pkey PRIMARY KEY (workout_id, exercise_id);
 R   ALTER TABLE ONLY public.workout_exercises DROP CONSTRAINT workout_exercises_pkey;
       public                 postgres    false    239    239            �           2606    16609    workout_logs workout_logs_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.workout_logs
    ADD CONSTRAINT workout_logs_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.workout_logs DROP CONSTRAINT workout_logs_pkey;
       public                 postgres    false    230            �           2606    16689    user_workouts workout_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.user_workouts
    ADD CONSTRAINT workout_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.user_workouts DROP CONSTRAINT workout_pkey;
       public                 postgres    false    232            �           2606    41324 &   workout_sessions workout_sessions_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.workout_sessions
    ADD CONSTRAINT workout_sessions_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.workout_sessions DROP CONSTRAINT workout_sessions_pkey;
       public                 postgres    false    253            �           2606    32807    workouts workouts_name_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.workouts
    ADD CONSTRAINT workouts_name_key UNIQUE (name);
 D   ALTER TABLE ONLY public.workouts DROP CONSTRAINT workouts_name_key;
       public                 postgres    false    236            �           2606    32805    workouts workouts_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.workouts
    ADD CONSTRAINT workouts_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.workouts DROP CONSTRAINT workouts_pkey;
       public                 postgres    false    236            �           1259    33147    idx_calorie_logs_user_day    INDEX     Z   CREATE INDEX idx_calorie_logs_user_day ON public.calorie_logs USING btree (user_id, day);
 -   DROP INDEX public.idx_calorie_logs_user_day;
       public                 postgres    false    246    246            �           1259    41303    idx_user_workouts_user_date    INDEX     f   CREATE INDEX idx_user_workouts_user_date ON public.user_workouts USING btree (user_id, performed_at);
 /   DROP INDEX public.idx_user_workouts_user_date;
       public                 postgres    false    232    232            �           2606    16665 +   admin_actions admin_actions_adminid_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.admin_actions
    ADD CONSTRAINT admin_actions_adminid_foreign FOREIGN KEY ("adminId") REFERENCES public.admins(id);
 U   ALTER TABLE ONLY public.admin_actions DROP CONSTRAINT admin_actions_adminid_foreign;
       public               postgres    false    224    225    4817            �           2606    16655 *   admin_actions admin_actions_userid_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.admin_actions
    ADD CONSTRAINT admin_actions_userid_foreign FOREIGN KEY ("userId") REFERENCES public.users(id);
 T   ALTER TABLE ONLY public.admin_actions DROP CONSTRAINT admin_actions_userid_foreign;
       public               postgres    false    225    4805    218                       2606    33142 &   calorie_logs calorie_logs_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.calorie_logs
    ADD CONSTRAINT calorie_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 P   ALTER TABLE ONLY public.calorie_logs DROP CONSTRAINT calorie_logs_user_id_fkey;
       public               postgres    false    4805    218    246            �           2606    33090    days fk_days_user    FK CONSTRAINT     �   ALTER TABLE ONLY public.days
    ADD CONSTRAINT fk_days_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 ;   ALTER TABLE ONLY public.days DROP CONSTRAINT fk_days_user;
       public               postgres    false    4805    219    218            �           2606    33099    meals fk_meals_day    FK CONSTRAINT     �   ALTER TABLE ONLY public.meals
    ADD CONSTRAINT fk_meals_day FOREIGN KEY (day_id) REFERENCES public.days(id) ON DELETE CASCADE;
 <   ALTER TABLE ONLY public.meals DROP CONSTRAINT fk_meals_day;
       public               postgres    false    220    4807    219            �           2606    32778    user_goals fk_user    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_goals
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 <   ALTER TABLE ONLY public.user_goals DROP CONSTRAINT fk_user;
       public               postgres    false    223    218    4805                       2606    32858 #   user_workouts fk_user_workouts_user    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_workouts
    ADD CONSTRAINT fk_user_workouts_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;
 M   ALTER TABLE ONLY public.user_workouts DROP CONSTRAINT fk_user_workouts_user;
       public               postgres    false    218    4805    232            �           2606    16610    foods foods_meal_id_foreign    FK CONSTRAINT     z   ALTER TABLE ONLY public.foods
    ADD CONSTRAINT foods_meal_id_foreign FOREIGN KEY (meal_id) REFERENCES public.meals(id);
 E   ALTER TABLE ONLY public.foods DROP CONSTRAINT foods_meal_id_foreign;
       public               postgres    false    220    4809    221            �           2606    16640 $   sleep_logs sleep_logs_userid_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.sleep_logs
    ADD CONSTRAINT sleep_logs_userid_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);
 N   ALTER TABLE ONLY public.sleep_logs DROP CONSTRAINT sleep_logs_userid_foreign;
       public               postgres    false    4805    227    218            �           2606    16650 $   steps_logs steps_logs_userid_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.steps_logs
    ADD CONSTRAINT steps_logs_userid_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);
 N   ALTER TABLE ONLY public.steps_logs DROP CONSTRAINT steps_logs_userid_foreign;
       public               postgres    false    4805    228    218            �           2606    16630 *   user_sessions user_sessions_userid_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_sessions
    ADD CONSTRAINT user_sessions_userid_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);
 T   ALTER TABLE ONLY public.user_sessions DROP CONSTRAINT user_sessions_userid_foreign;
       public               postgres    false    4805    218    226                       2606    32853 >   user_workout_exercises user_workout_exercises_exercise_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_workout_exercises
    ADD CONSTRAINT user_workout_exercises_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES public.exercises(id);
 h   ALTER TABLE ONLY public.user_workout_exercises DROP CONSTRAINT user_workout_exercises_exercise_id_fkey;
       public               postgres    false    240    4840    238                       2606    32848 B   user_workout_exercises user_workout_exercises_user_workout_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_workout_exercises
    ADD CONSTRAINT user_workout_exercises_user_workout_id_fkey FOREIGN KEY (user_workout_id) REFERENCES public.user_workouts(id);
 l   ALTER TABLE ONLY public.user_workout_exercises DROP CONSTRAINT user_workout_exercises_user_workout_id_fkey;
       public               postgres    false    4834    240    232                       2606    33126 D   user_workout_sets user_workout_sets_user_workout_id_exercise_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_workout_sets
    ADD CONSTRAINT user_workout_sets_user_workout_id_exercise_id_fkey FOREIGN KEY (user_workout_id, exercise_id) REFERENCES public.user_workout_exercises(user_workout_id, exercise_id) ON DELETE CASCADE;
 n   ALTER TABLE ONLY public.user_workout_sets DROP CONSTRAINT user_workout_sets_user_workout_id_exercise_id_fkey;
       public               postgres    false    244    240    240    4844    244                        2606    16635 #   water_logs water_logs_useid_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.water_logs
    ADD CONSTRAINT water_logs_useid_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);
 M   ALTER TABLE ONLY public.water_logs DROP CONSTRAINT water_logs_useid_foreign;
       public               postgres    false    218    229    4805            �           2606    16660 &   weight_logs weight_logs_userid_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.weight_logs
    ADD CONSTRAINT weight_logs_userid_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);
 P   ALTER TABLE ONLY public.weight_logs DROP CONSTRAINT weight_logs_userid_foreign;
       public               postgres    false    218    222    4805                       2606    32830 4   workout_exercises workout_exercises_exercise_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.workout_exercises
    ADD CONSTRAINT workout_exercises_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES public.exercises(id) ON DELETE CASCADE;
 ^   ALTER TABLE ONLY public.workout_exercises DROP CONSTRAINT workout_exercises_exercise_id_fkey;
       public               postgres    false    4840    239    238                       2606    32835 3   workout_exercises workout_exercises_workout_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.workout_exercises
    ADD CONSTRAINT workout_exercises_workout_id_fkey FOREIGN KEY (workout_id) REFERENCES public.workouts(id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.workout_exercises DROP CONSTRAINT workout_exercises_workout_id_fkey;
       public               postgres    false    4838    236    239                       2606    16615 (   workout_logs workout_logs_userid_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.workout_logs
    ADD CONSTRAINT workout_logs_userid_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);
 R   ALTER TABLE ONLY public.workout_logs DROP CONSTRAINT workout_logs_userid_foreign;
       public               postgres    false    4805    230    218           