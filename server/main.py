from typing import Dict

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from queries import (
    cancel_surgeries_with_ids,
    create_surgery_with_values,
    get_all_patients,
    get_all_providers,
    get_all_surgeries,
    update_surgery_with_values,
)

app = FastAPI(debug=True)


# This allows our react app to call this api
origins = ["http://localhost:3000", "localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/surgery")
async def surgeries():
    return get_all_surgeries()


@app.post("/surgery/cancel")
async def cancel_surgeries(payload: Dict):  # this typing is lazy, i appologize
    cancel_surgeries_with_ids(payload["surgery_ids"])


@app.post("/surgery/create")
async def create_surgery(new_surgery: Dict):
    return create_surgery_with_values(new_surgery)


@app.post("/surgery/update")
async def update_surgery(new_surgery: Dict):
    return update_surgery_with_values(new_surgery)


@app.get("/providers")
async def get_providers():
    return get_all_providers()


@app.get("/patients")
async def get_patients():
    return get_all_patients()
