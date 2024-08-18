from flask import Blueprint, request, jsonify, abort
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import current_user, login_required
import jwt
import datetime
import os
from models import db, User, Complaint

api_bp = Blueprint('api', __name__)

SECRET_KEY = os.getenv('SECRET_KEY')

# User Registration
@api_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400
    
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'User already exists'}), 400
    
    hashed_password = generate_password_hash(password, method='sha256')
    new_user = User(email=email, password_hash=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': 'User registered successfully'}), 201

# User Login
@api_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400
    
    user = User.query.filter_by(email=email).first()
    
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({'message': 'Invalid credentials'}), 401
    
    # Generate token
    token = jwt.encode({
        'sub': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }, SECRET_KEY, algorithm='HS256')
    
    return jsonify({'message': 'Login successful', 'token': token}), 200

# Create a New Complaint
@api_bp.route('/complaints', methods=['POST'])
@login_required
def create_complaints():
    data = request.json
    
    if not isinstance(data, list):
        return jsonify({'error': 'Input should be an array of complaints'}), 400

    complaints = []
    for item in data:
        category = item.get('category')
        insight = item.get('insight')
        
        if not category or not insight:
            return jsonify({'error': 'Category and insight are required for each complaint'}), 400

        complaint = Complaint(
            category=category,
            insight=insight,
            user_id=current_user.id  # Associate each complaint with the logged-in user
        )
        complaints.append(complaint)

    db.session.bulk_save_objects(complaints)
    db.session.commit()

    return jsonify({'message': 'Complaints created successfully'}), 201

# Get complaint by category  
@api_bp.route('/complaints/<string:category>', methods=['GET'])
def get_complaints_by_category(category):
    complaints = Complaint.query.filter_by(category=category).all()
    complaints_list = [{'id': c.id, 'category': c.category,
                        'insight': c.insight} for c in complaints]
    return jsonify(complaints_list), 200


# Get All Complaints for a User
@api_bp.route('/complaints/<uuid:user_id>', methods=['GET'])
def get_complaints(user_id):
    complaints = Complaint.query.filter_by(user_id=user_id).all()
    
    results = [
        {
            'id': str(complaint.id),
            'category': complaint.category,
            'insight': complaint.insight
        } for complaint in complaints
    ]
    
    return jsonify(results), 200

# Update a Complaint by Complaint ID
@api_bp.route('/complaints/<uuid:complaint_id>', methods=['PATCH'])
def update_complaint_insight(complaint_id):
    complaint = Complaint.query.get(complaint_id)
    if complaint is None:
        abort(404, description="Complaint not found")

    data = request.get_json()
    new_insight = data.get('insight')

    if new_insight is None:
        abort(400, description="No insight provided")

    complaint.insight = new_insight

    db.session.commit()

    return jsonify({
        'id': str(complaint.id),
        'category': complaint.category,
        'insight': complaint.insight,
        'user_id': str(complaint.user_id)
    }), 200

# Delete a Complaint by Complaint ID
@api_bp.route('/complaints/<uuid:complaint_id>', methods=['DELETE'])
def delete_complaint(complaint_id):
    complaint = Complaint.query.get(complaint_id)
    
    if not complaint:
        return jsonify({'message': 'Complaint not found'}), 404
    
    db.session.delete(complaint)
    db.session.commit()
    
    return jsonify({'message': 'Complaint deleted successfully'}), 200
