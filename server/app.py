#!/usr/bin/env python3

# Remote library imports
# from flask import render_template
from config import app
from routes.routes import *
from models.models import *

# @app.route('/')
# @app.route('/<int:id>')
# def index(id=0):
#     return render_template("index.html")


if __name__ == '__main__':
    app.run(port=5555, debug=True)

