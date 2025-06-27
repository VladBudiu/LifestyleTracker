from fastapi import FastAPI, Query
import asyncpg
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Database connection settings
DB_CONFIG = {
    "dbname"  : "name_of_your_database",
    "user"    : "admin",
    "password": "your_password_here",
    "host"    : "localhost",
    "port"    : "5432"
}


DSN = f"postgresql://{DB_CONFIG['user']}:{DB_CONFIG['password']}@{DB_CONFIG['host']}:{DB_CONFIG['port']}/{DB_CONFIG['dbname']}"

pool: asyncpg.pool.Pool = None 

@app.on_event("startup")
async def startup():
    global pool
    pool = await asyncpg.create_pool(dsn=DSN, min_size=1, max_size=5)

@app.on_event("shutdown")
async def shutdown():
    await pool.close()

@app.get("/api/foods")
async def search_food(q: str = Query(..., min_length=2, max_length=50),
                      limit: int = 20):
    async with pool.acquire() as conn:
        rows = await conn.fetch(
            """
            SELECT name, calories, protein, carbs, fat
            FROM   food_nutrition
            WHERE  name % $1            -- fast trigram match
            ORDER  BY similarity(name, $1) DESC
            LIMIT  $2
            """,
            q, limit,
        )
    return [dict(r) for r in rows]

#python -m uvicorn nutrition_api:app --host 0.0.0.0 --port 9091 --reload