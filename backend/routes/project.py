from flask import Blueprint, request, jsonify
from models import Project, ProjectMembers, User
from db import db
from flask_jwt_extended import jwt_required, get_jwt_identity

project_bp = Blueprint("project", __name__)

# ---------------- CREATE PROJECT ----------------
@project_bp.route("/", methods=["POST"])
@jwt_required()
def create_project():
  user_id = int(get_jwt_identity())
  data = request.get_json()

  name = data.get("name")

  if not name:
    return jsonify({"error": "Project name required"}), 400

  # Create project
  project = Project(name=name, created_by=user_id)
  db.session.add(project)
  db.session.commit()

  # Add creator as admin
  member = ProjectMembers(
    user_id=user_id,
    project_id=project.id,
    role="admin"
  )
  db.session.add(member)
  db.session.commit()

  return jsonify({
    "message": "Project created",
    "project_id": project.id
  }), 201


# ---------------- GET USER PROJECTS ----------------
@project_bp.route("/", methods=["GET"])
@jwt_required()
def get_projects():
  user_id = int(get_jwt_identity())

  memberships = ProjectMembers.query.filter_by(user_id=user_id).all()

  project_list = []
  for m in memberships:
    project = Project.query.get(m.project_id)
    project_list.append({
      "id": project.id,
      "name": project.name,
      "role": m.role
    })

  return jsonify(project_list), 200


# ---------------- ADD MEMBER (ADMIN ONLY) ----------------
@project_bp.route("/<int:project_id>/add-member", methods=["POST"])
@jwt_required()
def add_member(project_id):
  user_id = int(get_jwt_identity())
  data = request.get_json()

  email = data.get("email")

  # Check if current user is admin
  member = ProjectMembers.query.filter_by(
    user_id=user_id,
    project_id=project_id
  ).first()

  if not member or member.role != "admin":
    return jsonify({"error": "Only admin can add members"}), 403

  # Find user to add
  user = User.query.filter_by(email=email).first()
  if not user:
    return jsonify({"error": "User not found"}), 404

  # Check if already member
  existing = ProjectMembers.query.filter_by(
    user_id=user.id,
    project_id=project_id
  ).first()

  if existing:
    return jsonify({"error": "User already in project"}), 400

  new_member = ProjectMembers(
    user_id=user.id,
    project_id=project_id,
    role="member"
  )
  db.session.add(new_member)
  db.session.commit()

  return jsonify({"message": "Member added"}), 200


# ---------------- REMOVE MEMBER (ADMIN ONLY) ----------------
@project_bp.route("/<int:project_id>/remove-member/<int:member_id>", methods=["DELETE"])
@jwt_required()
def remove_member(project_id, member_id):
  user_id = int(get_jwt_identity())

  # Check admin
  admin = ProjectMembers.query.filter_by(
    user_id=user_id,
    project_id=project_id
  ).first()

  if not admin or admin.role != "admin":
    return jsonify({"error": "Only admin can remove members"}), 403

  member = ProjectMembers.query.filter_by(
    user_id=member_id,
    project_id=project_id
  ).first()

  if not member:
    return jsonify({"error": "Member not found"}), 404

  db.session.delete(member)
  db.session.commit()

  return jsonify({"message": "Member removed"}), 200