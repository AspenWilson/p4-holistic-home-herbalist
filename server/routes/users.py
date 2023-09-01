from flask_restful import Resource, Api
from models.models import User
from config import *
from flask import Flask, request, session, abort

class SignUp(Resource):
    def post(self):
        data = request.get_json()
        new_user = User(username=data['username'])
        new_user.password_hash = data['password']

        db.session.add(new_user)
        db.session.commit()

        response = new_user.to_dict(), 201

        return response

api.add_resource(SignUp, '/signup')

class Login(Resource):
    def post(self):
        data = request.get_json()
        user=User.query.filter_by(username=data['username']).first()
        if user and user.authenticate(data['password']):
            session['user_id'] = user.id 
            response = user.to_dict(), 200
            return response
        else:
            return {'error': 'Incorrect username or password'}, 401

api.add_resource(Login, '/login')