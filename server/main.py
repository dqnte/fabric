from fastapi import FastAPI
from sqlalchemy.sql import text
from database import db_session
from fastapi.middleware.cors import CORSMiddleware

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


@app.get("/")
async def root():
    return {"message": "Fabric in the building!"}


def _find_surgeries():
    surgeries = db_session.execute(
        text(
            """
             select surgery.id,
                    surgery.patient_id,
                    surgery.type,
                    surgery.date,
                    surgery.patient_id,
                    patient.first_name patient_first_name,
                    patient.last_name patient_last_name,
                    patient.dob patient_dob,
                    surgery.provider_id,
                    provider.first_name provider_first_name,
                    provider.last_name provider_last_name
               from surgery
               left join patient
                 on surgery.patient_id = patient.id
               left join provider
                 on provider.id = surgery.provider_id
              where not surgery.deleted
              order by surgery.date
             """
        )
    ).fetchall()
    return [
        {
            "id": surgery.id,
            "date": surgery.date,
            "type": surgery.type,
            "provider": {
                "id": surgery.provider_id,
                "first_name": surgery.provider_first_name,
                "last_name": surgery.provider_last_name,
            },
            "patient": {
                "id": surgery.patient_id,
                "first_name": surgery.patient_first_name,
                "last_name": surgery.patient_last_name,
                "dob": surgery.patient_dob
            },
        }
        for surgery in surgeries
    ]


@app.get("/surgery")
async def surgeries():
    return {"surgeries": _find_surgeries()}
