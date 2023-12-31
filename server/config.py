import os
# Remote library imports
from flask import Flask, render_template
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt

# from dotenv import load_dotenv
# load_dotenv()


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///app.db"
app.secret_key = b'\x0f\xf1\xd6\xd4\x8fS0m\xad\xb2t\x97\xa5\x0eAc'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False


metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)

api = Api(app)


