from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import UUID
import uuid

db = SQLAlchemy()

class Complaint(db.Model):
    __tablename__ = 'complaint'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    category = db.Column(db.String, nullable=False)
    insight = db.Column(db.String, nullable=False)
