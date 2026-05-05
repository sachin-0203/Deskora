from flask import Blueprint, request, jsonify
from models import Task, ProjectMembers
from db import db
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

task_bp = Blueprint("task", __name__)

# ---------------- CREATE TASK ----------------
@task_bp.route("/", methods=["POST"])
@jwt_required()
def create_task():
  user_id = int(get_jwt_identity())
  data = request.get_json()

  project_id = data.get("project_id")
  title = data.get("title")
  description = data.get("description")
  due_date = data.get("due_date")
  priority = data.get("priority")
  assigned_to = data.get("assigned_to")

  # Check if user is admin
  member = ProjectMembers.query.filter_by(
    user_id=user_id,
    project_id=project_id
  ).first()

  if not member or member.role != "admin":
    return jsonify({"error": "Only admin can create tasks"}), 403

  task = Task(
    title=title,
    description=description,
    due_date=datetime.strptime(due_date, "%Y-%m-%d"),
    priority=priority,
    project_id=project_id,
      assigned_to=assigned_to
  )

  db.session.add(task)
  db.session.commit()

  return jsonify({"message": "Task created", "task_id": task.id}), 201


# ---------------- GET TASKS BY PROJECT ----------------
@task_bp.route("/project/<int:project_id>", methods=["GET"])
@jwt_required()
def get_tasks(project_id):
  user_id = int(get_jwt_identity())

  # Check membership
  member = ProjectMembers.query.filter_by(
    user_id=user_id,
    project_id=project_id
  ).first()

  if not member:
    return jsonify({"error": "Access denied"}), 403

  tasks = Task.query.filter_by(project_id=project_id).all()

  result = []
  for t in tasks:
    result.append({
      "id": t.id,
      "title": t.title,
      "description": t.description,
      "status": t.status,
      "priority": t.priority,
      "due_date": t.due_date.strftime("%Y-%m-%d"),
      "assigned_to": t.assigned_to
    })

  return jsonify(result), 200


# ---------------- UPDATE TASK ----------------
@task_bp.route("/<int:task_id>", methods=["PUT"])
@jwt_required()
def update_task(task_id):
  user_id = int(get_jwt_identity())
  data = request.get_json()

  task = Task.query.get(task_id)
  if not task:
    return jsonify({"error": "Task not found"}), 404

  member = ProjectMembers.query.filter_by(
    user_id=user_id,
    project_id=task.project_id
  ).first()

  if not member:
    return jsonify({"error": "Access denied"}), 403

  # Member can update only assigned tasks
  if member.role != "admin" and task.assigned_to != user_id:
    return jsonify({"error": "Unauthorized"}), 403

  task.title = data.get("title", task.title)
  task.description = data.get("description", task.description)
  task.status = data.get("status", task.status)
  task.priority = data.get("priority", task.priority)

  db.session.commit()

  return jsonify({"message": "Task updated"}), 200


# ---------------- DELETE TASK ----------------
@task_bp.route("/<int:task_id>", methods=["DELETE"])
@jwt_required()
def delete_task(task_id):
  user_id = int(get_jwt_identity())

  task = Task.query.get(task_id)
  if not task:
    return jsonify({"error": "Task not found"}), 404

  member = ProjectMembers.query.filter_by(
    user_id=user_id,
    project_id=task.project_id
  ).first()

  if not member or member.role != "admin":
    return jsonify({"error": "Only admin can delete tasks"}), 403

  db.session.delete(task)
  db.session.commit()

  return jsonify({"message": "Task deleted"}), 200