from fastapi.logger import logger
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.sql import text

# probs should change user away from postgres, but this was easier than dealing with
# permission issues
engine = create_engine("postgresql://postgres@database/main")

db_session = scoped_session(
    sessionmaker(autocommit=False, autoflush=False, bind=engine)
)

try:
    # checking to see if we can actually talk to the database
    db_session.execute(text("select 1"))
    logger.info("We are connected to the database.")
except Exception as e:
    logger.error("We are not connected to the database.")
