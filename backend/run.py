from flask import Flask
from models import db
from api import api_bp
from dotenv import load_dotenv
from flask_cors import CORS
import os

# Load environment variables from .env file
load_dotenv()


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

    # Initialize the database
    db.init_app(app)

    # Register blueprints
    app.register_blueprint(api_bp, url_prefix='/api')

    # Enable CORS
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

    # Create tables if they do not exist
    with app.app_context():
        # db.drop_all()
        db.create_all()

    return app


# Create the Flask app instance
app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
