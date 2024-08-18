from flask import Blueprint, jsonify, request
from models import db, Complaint


api_bp = Blueprint('api', __name__)


@api_bp.route('/hello', methods=['GET'])
def hello_world():
    return jsonify({'message': 'Hello, World!'}), 200


@api_bp.route('/complaints', methods=['GET'])
def get_complaints():
    complaints = Complaint.query.all()
    complaints_list = [{'id': c.id, 'category': c.category,
                        'insight': c.insight} for c in complaints]
    return jsonify(complaints_list), 200


@api_bp.route('/complaints/<string:category>', methods=['GET'])
def get_complaints_by_category(category):
    complaints = Complaint.query.filter_by(category=category).all()
    complaints_list = [{'id': c.id, 'category': c.category,
                        'insight': c.insight} for c in complaints]
    return jsonify(complaints_list), 200


@api_bp.route('/complaints', methods=['POST'])
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

        complaint = Complaint(category=category, insight=insight)
        complaints.append(complaint)

    db.session.bulk_save_objects(complaints)
    db.session.commit()

    return jsonify({'message': 'Complaints created successfully'}), 201
