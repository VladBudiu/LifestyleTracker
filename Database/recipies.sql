PGDMP  ;                     }           NutritionInformation    17.4    17.4 	    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    24576    NutritionInformation    DATABASE     |   CREATE DATABASE "NutritionInformation" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en-US';
 &   DROP DATABASE "NutritionInformation";
                     postgres    false            �            1259    24607    recipes    TABLE     �   CREATE TABLE public.recipes (
    id integer NOT NULL,
    name text NOT NULL,
    ingredients text,
    calories real,
    image_path text
);
    DROP TABLE public.recipes;
       public         heap r       postgres    false            �            1259    24606    recipes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.recipes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.recipes_id_seq;
       public               postgres    false    221            �           0    0    recipes_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.recipes_id_seq OWNED BY public.recipes.id;
          public               postgres    false    220            c           2604    24610 
   recipes id    DEFAULT     h   ALTER TABLE ONLY public.recipes ALTER COLUMN id SET DEFAULT nextval('public.recipes_id_seq'::regclass);
 9   ALTER TABLE public.recipes ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    220    221    221            e           2606    24614    recipes recipes_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.recipes DROP CONSTRAINT recipes_pkey;
       public                 postgres    false    221           