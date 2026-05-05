from db import db
from datetime import datetime

# ---------------- USER ----------------
class User(db.Model):
  __tablename__ = "users"

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100), nullable=False)
  email = db.Column(db.String(120), unique=True, nullable=False)
  password = db.Column(db.String(200), nullable=False)

  # Relationships
  projects = db.relationship("ProjectMembers", backref="user", cascade="all, delete")
  tasks = db.relationship("Task", backref="assigned_user", cascade="all, delete")

  def __repr__(self):
    return f"<User {self.email}>"


# ---------------- PROJECT ----------------
class Project(db.Model):
  __tablename__ = "projects"

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(150), nullable=False)
  created_by = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

  # Relationships
  members = db.relationship("ProjectMembers", backref="project", cascade="all, delete")
  tasks = db.relationship("Task", backref="project", cascade="all, delete")


# ---------------- PROJECT MEMBERS ----------------
class ProjectMembers(db.Model):
  __tablename__ = "project_members"

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  project_id = db.Column(db.Integer, db.ForeignKey("projects.id"), nullable=False)
  role = db.Column(db.String(10), default="member")  # admin / member


# ---------------- TASK ----------------
class Task(db.Model):
  __tablename__ = "tasks"

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(150), nullable=False)
  description = db.Column(db.Text)
  due_date = db.Column(db.DateTime)
  priority = db.Column(db.String(10))  # Low, Medium, High
  status = db.Column(db.String(20), default="To Do")

  project_id = db.Column(db.Integer, db.ForeignKey("projects.id"), nullable=False)
  assigned_to = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

  created_at = db.Column(db.DateTime, default=datetime.utcnow)