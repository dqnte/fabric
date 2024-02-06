from fastapi import FastAPI
from sqlalchemy.sql import text
from database import db_session

app = FastAPI(debug=True)


@app.get("/")
async def root():
    return {"message": "Fabric in the building!"}


def _find_surgeries():
    surgeries = db_session.execute(
        text("select id, date from surgery where not deleted")
    ).fetchall()
    return [{"id": surgery.id, "date": surgery.date} for surgery in surgeries]


@app.get("/surgery")
async def surgeries():
    return {"surgeries": _find_surgeries()}
