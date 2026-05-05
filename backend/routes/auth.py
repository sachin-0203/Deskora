from flask import Blueprint, request, jsonify
from models import User
from db import db
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token

auth_bp = Blueprint("auth", __name__)
bcrypt = Bcrypt()

# ---------------- SIGNUP ----------------
@auth_bp.route("/signup", methods=["POST"])
def signup():
  data = request.get_json()

  name = data.get("name")
  email = data.get("email")
  password = data.get("password")

  if not name or not email or not password:
    return jsonify({"error": "All fields required"}), 400

  # Check if user exists
  existing_user = User.query.filter_by(email=email).first()
  if existing_user:
    return jsonify({"error": "User already exists"}), 400

  # Hash password
  hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

  new_user = User(name=name, email=email, password=hashed_password)
  db.session.add(new_user)
  db.session.commit()

  return jsonify({"message": "User created successfully"}), 201


# ---------------- LOGIN ----------------
@auth_bp.route("/login", methods=["POST"])
def login():
  data = request.get_json()

  email = data.get("email")
  password = data.get("password")

  user = User.query.filter_by(email=email).first()

  if not user or not bcrypt.check_password_hash(user.password, password):
      return jsonify({"error": "Invalid credentials"}), 401

  # Generate JWT token
  token = create_access_token(identity=str(user.id))

  return jsonify({
    "token": token,
    "user": {
      "id": user.id,
      "name": user.name,
      "email": user.email
    }
  }), 200