from flask import Blueprint, jsonify, request
from models import db, Complaint

api_bp = Blueprint('api', __name__)

@api_bp.route('/hello', methods=['GET'])
def hello_world():
    return jsonify({'message': 'Hello, World!'}), 200

@api_bp.route('/complaints', methods=['GET'])
def get_complaints():
    complaints = Complaint.query.all()
    complaints_list = [{'id': c.id, 'category': c.category, 'insight': c.insight} for c in complaints]
    return jsonify(complaints_list), 200


@api_bp.route('/complaints', methods=['POST'])
def create_complaint():
    data = request.json
    category = data.get('category')
    insight = data.get('insight')
    if not category or not insight:
        return jsonify({'error': 'Category and insight are required'}), 400

    complaint = Complaint(category=category, insight=insight)
    db.session.add(complaint)
    db.session.commit()

    return jsonify({'message': 'Complaint created successfully'}), 201
