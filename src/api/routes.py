"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity



api = Blueprint('api', __name__)

@api.route('/landing-page', methods=['POST', 'GET'])
def landing_page():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200



destinations_data = [
    {'id': 1, 'name': 'New York City', 'country': 'United States', 'description': 'The city that never sleeps'},
    {'id': 2, 'name': 'Paris', 'country': 'France', 'description': 'The city of love and lights'},
    {'id': 3, 'name': 'Tokyo', 'country': 'Japan', 'description': 'A vibrant and futuristic metropolis'}
]

@api.route('/destinations', methods=['GET'])
def search_destinations():
    search_query = request.args.get('query')

    if not search_query:
        return jsonify({'error': 'Please provide a search query.'}), 400

    
    matching_destinations = [
        destination for destination in destinations_data
        if search_query.lower() in destination['name'].lower()
    ]

    return jsonify({'results': matching_destinations}), 200

@api.route('/destination/<int:destination_id>', methods=['GET'])
def get_destination(destination_id):
    
    destination = next((d for d in destinations_data if d['id'] == destination_id), None)

    if not destination:
        return jsonify({'error': 'Destination not found.'}), 404

    return jsonify(destination), 200

@api.route('/destinations', methods=['POST'])
def save_destination():
    data = request.get_json()
    name = data.get('name')
    country = data.get('country')
    description = data.get('description')

    if not name or not country:
        return jsonify({'error': 'Name and country are required fields.'}), 400

    
    new_destination_id = max(d['id'] for d in destinations_data) + 1

    new_destination = {
        'id': new_destination_id,
        'name': name,
        'country': country,
        'description': description
    }

    destinations_data.append(new_destination)

    return jsonify({'message': 'Destination saved successfully.', 'new_destination': new_destination}), 201

  
    # REGISTER ENDPOINT
@api.route('/register', methods=['POST'])
def create_user():
    user_email= request.json.get('email', None)
    user_password = request.json.get('password', None)
    active_user = User.query.filter_by(email = user_email).first()
    if active_user:
        return jsonify({"Error": "Email already in use, try another one"}), 409
    new_user = User(email=user_email,password=user_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"Message": "User successfully created"})


 
# LOGIN ENDPOINT FOR USERS
@api.route('/login', methods=['POST'])
def login_user():
     user_email = request.json.get("email", None)
     user_password = request.json.get("password", None)
     user = User.query.filter_by(email = user_email, password = user_password).first()
     if user is None:
          return jsonify({"Error": "Wrong email or password"}), 401
     token = create_access_token(identity=user.id)
     return jsonify({"Response": "Successfully logged in", "token": token, "email": user.email}), 200


#GET ALL USERS
@api.route('/users', methods=['GET'])
def get_all_users():
    all_users = User.query.all()
    mapped_users = list(map(lambda index: index.serialize(), all_users))
    response_body=jsonify(mapped_users)
    return response_body, 200

#ACCESSING USERS PRIVATE PAGE

@api.route('/private', methods=['GET'])
@jwt_required()
def show_email():
    current_user_id = get_jwt_identity()
    user=User.query.get(current_user_id)
    return jsonify ({"email": user.email, "id": user.id, "response": "That is your data up there!"}), 200


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({"id": user.id, "email": user.email }), 200

@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    # Query your database for email and password
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        # the user was not found on the database
        return jsonify({"msg": "Bad email or password"}), 401
    
    # create a new token with the user id inside
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })
