import os
from flask import Flask
from db import db
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from routes.auth import auth_bp
from routes.project import project_bp
from dotenv import load_dotenv
from routes.task import task_bp
from routes.dashboard import dashboard_bp


load_dotenv()

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

db.init_app(app)
jwt = JWTManager(app)

app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(project_bp, url_prefix="/projects")
app.register_blueprint(task_bp, url_prefix="/tasks")
app.register_blueprint(dashboard_bp, url_prefix="/dashboard")

# Create tables
with app.app_context():
  db.create_all()

@app.route("/")
def home():
  return {"message": "API running"}

if __name__ == "__main__":
  app.run(debug=True)