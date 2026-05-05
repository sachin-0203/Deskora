from flask import Blueprint, jsonify
from models import Task, ProjectMembers
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

dashboard_bp = Blueprint("dashboard", __name__)

@dashboard_bp.route("/<int:project_id>", methods=["GET"])
@jwt_required()
def get_dashboard(project_id):
  user_id = int(get_jwt_identity())

  # Check if user belongs to project
  member = ProjectMembers.query.filter_by(
    user_id=user_id,
    project_id=project_id
  ).first()

  if not member:
    return jsonify({"error": "Access denied"}), 403

  tasks = Task.query.filter_by(project_id=project_id).all()

  total_tasks = len(tasks)

  status_count = {
    "To Do": 0,
    "In Progress": 0,
    "Done": 0
  }

  overdue_tasks = 0
  today = datetime.utcnow()

  user_task_count = {}

  for t in tasks:
    # Status count
    status_count[t.status] = status_count.get(t.status, 0) + 1

    # Overdue
    if t.due_date and t.due_date < today and t.status != "Done":
      overdue_tasks += 1

  # Tasks per user
  if t.assigned_to:
    user_task_count[t.assigned_to] = user_task_count.get(t.assigned_to, 0) + 1

  return jsonify({
    "total_tasks": total_tasks,
    "tasks_by_status": status_count,
    "overdue_tasks": overdue_tasks,
    "tasks_per_user": user_task_count
  }), 200