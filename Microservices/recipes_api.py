from fastapi import FastAPI
from typing import List
import psycopg2
import os
from dotenv import load_dotenv
import random
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles


load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.mount("/images", StaticFiles(directory="Food Images/Food Images"), name="images")


conn = psycopg2.connect(
    dbname=os.getenv("DB_NAME"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASS"),
    host=os.getenv("DB_HOST"),
    port=os.getenv("DB_PORT")
)

def fetch_recipes(query: str):
    with conn.cursor() as cur:
        cur.execute(query)
        rows = cur.fetchall()
        return [
            dict(zip([desc[0] for desc in cur.description], row))
            for row in rows
        ]

@app.get("/recipes/random", response_model=List[dict])
def get_random_recipes():
    recipes = fetch_recipes("SELECT * FROM recipes")
    sampled = random.sample(recipes, min(36, len(recipes)))

    for recipe in sampled:
        full_path = recipe["image_path"]
        filename = os.path.basename(full_path)
        recipe["image_path"] = f"http://localhost:9090/images/{filename}"

    return sampled


@app.get("/recipes/all", response_model=List[dict])
def get_all_recipes():
    recipes = fetch_recipes("SELECT * FROM recipes")
    for recipe in recipes:
        full_path = recipe["image_path"]
        filename = os.path.basename(full_path)
        recipe["image_path"] = f"http://localhost:9090/images/{filename}"
    return recipes

#python -m uvicorn recipes_api:app --host 0.0.0.0 --port 9090 --reload
