PGDMP                       }           NutritionInformation    17.4    17.4 	    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    24576    NutritionInformation    DATABASE     |   CREATE DATABASE "NutritionInformation" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en-US';
 &   DROP DATABASE "NutritionInformation";
                     postgres    false            �            1259    24578    food_nutrition    TABLE     �   CREATE TABLE public.food_nutrition (
    id integer NOT NULL,
    name text NOT NULL,
    calories real,
    protein real,
    carbs real,
    fat real
);
 "   DROP TABLE public.food_nutrition;
       public         heap r       postgres    false            �            1259    24577    food_nutrition_id_seq    SEQUENCE     �   CREATE SEQUENCE public.food_nutrition_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.food_nutrition_id_seq;
       public               postgres    false    219            �           0    0    food_nutrition_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.food_nutrition_id_seq OWNED BY public.food_nutrition.id;
          public               postgres    false    218            c           2604    24581    food_nutrition id    DEFAULT     v   ALTER TABLE ONLY public.food_nutrition ALTER COLUMN id SET DEFAULT nextval('public.food_nutrition_id_seq'::regclass);
 @   ALTER TABLE public.food_nutrition ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    219    218    219            e           2606    24585 "   food_nutrition food_nutrition_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.food_nutrition
    ADD CONSTRAINT food_nutrition_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.food_nutrition DROP CONSTRAINT food_nutrition_pkey;
       public                 postgres    false    219           