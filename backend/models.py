from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import UUID
import uuid
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

# User model for storing user account information
class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    
    # Relationship to connect users with complaints
    complaints = db.relationship('Complaint', backref='user', lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


# Complaint model to store complaints made by users
class Complaint(db.Model):
    __tablename__ = 'complaint'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    category = db.Column(db.String, nullable=False)
    insight = db.Column(db.String, nullable=False)
    
    # Foreign key to associate complaints with a user
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('user.id'), nullable=False)
