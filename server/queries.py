from database import db_session
from sqlalchemy.sql import text

# Not sure I like all this sql in a string, should probs make an ORM or something
base_surgery_query = """
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
"""


def _map_surgery_object(surgery_row):
    return {
        "id": surgery_row.id,
        "date": surgery_row.date,
        "type": surgery_row.type,
        "provider": {
            "id": surgery_row.provider_id,
            "first_name": surgery_row.provider_first_name,
            "last_name": surgery_row.provider_last_name,
        },
        "patient": {
            "id": surgery_row.patient_id,
            "first_name": surgery_row.patient_first_name,
            "last_name": surgery_row.patient_last_name,
            "dob": surgery_row.patient_dob,
        },
    }


def get_all_surgeries():
    surgeries = db_session.execute(
        text(
            f"""
             {base_surgery_query}
              where not surgery.cancelled
              order by surgery.date
             """
        )
    ).fetchall()

    return [_map_surgery_object(surgery) for surgery in surgeries]


def cancel_surgeries_with_ids(surgery_ids):
    db_session.execute(
        text(
            """
           update surgery
              set cancelled = 'true'
            where id = any(:surgery_ids)
             """
        ),
        {"surgery_ids": surgery_ids},
    )


def create_surgery_with_values(new_surgery):
    surgery_id = db_session.execute(
        text(
            """
            insert into surgery (date, type, patient_id, provider_id)
            values (:date, :type, :patient_id, :provider_id)
            returning id
            """
        ),
        new_surgery,
    ).scalar()

    surgery = db_session.execute(
        text(
            f"""
            {base_surgery_query}
            where surgery.id = :id
            """
        ),
        {"id": surgery_id},
    ).one_or_none()

    return _map_surgery_object(surgery)


def update_surgery_with_values(updated_surgery):
    db_session.execute(
        text(
            """
            update surgery
               set date = :date,
                   patient_id = :patient_id,
                   provider_id = :provider_id,
                   type = :type
             where id = :id
            """
        ),
        updated_surgery,
    )

    surgery = db_session.execute(
        text(
            f"""
            {base_surgery_query}
            where surgery.id = :id
            """
        ),
        {"id": updated_surgery["id"]},
    ).one_or_none()

    return _map_surgery_object(surgery)


def get_all_providers():
    providers = db_session.execute(
        text(
            """
            select id,
                   first_name,
                   last_name
              from provider
            """
        )
    )

    return [
        {
            "id": provider.id,
            "first_name": provider.first_name,
            "last_name": provider.last_name,
        }
        for provider in providers
    ]


def get_all_patients():
    patients = db_session.execute(
        text(
            """
            select id,
                   first_name,
                   last_name
              from patient
            """
        )
    )

    return [
        {
            "id": patient.id,
            "first_name": patient.first_name,
            "last_name": patient.last_name,
        }
        for patient in patients
    ]
