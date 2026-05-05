import os
from flask import Flask
from db import db
from dotenv import load_dotenv
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt

# Routes
from routes.auth import auth_bp
from routes.project import project_bp
from routes.task import task_bp
from routes.dashboard import dashboard_bp

load_dotenv()

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

# ---------------- CONFIG ----------------
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL", "sqlite:///database.db")
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "fallback-secret")

# ---------------- INIT ----------------
db.init_app(app)
jwt = JWTManager(app)

# ---------------- ROUTES ----------------
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(project_bp, url_prefix="/api/projects")
app.register_blueprint(task_bp, url_prefix="/api/tasks")
app.register_blueprint(dashboard_bp, url_prefix="/api/dashboard")

# ---------------- TEST PROTECTED ROUTE ----------------
@app.route("/api/protected", methods=["GET"])
@jwt_required()
def protected():
  user_id = get_jwt_identity()
  return {"message": "Protected route working", "user_id": user_id}

# ---------------- ROOT ----------------
@app.route("/")
def home():
  return {"message": "API running"}

# ---------------- DB INIT ----------------
with app.app_context():
  db.create_all()

# ---------------- RUN ----------------
if __name__ == "__main__":
  app.run(debug=True)