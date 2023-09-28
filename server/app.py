#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, render_template
from flask_restful import Resource

# Local imports
from config import *
# Add your model imports
from models.models import *
from routes.routes import *


# Views go here!

@app.route('/')
@app.route('/<int:id>')
def index(id=0):
    return render_template("index.html")


if __name__ == '__main__':
    app.run(port=5555, debug=True)

