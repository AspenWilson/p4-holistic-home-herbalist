from flask_restful import Resource
from models.models import User
from config import api, db
from flask import Flask, request, session
from .helpers import unfound_error, unauth_error, get_all, get_first, get_current_user

class SignUp(Resource):
    def post(self):
        data = request.get_json()
        new_user = User(username=data['username'])
        new_user.password_hash = data['password']

        db.session.add(new_user)
        db.session.commit()

        return new_user.to_dict(), 201

class Login(Resource):
    def post(self):
        data = request.get_json()
        user=User.query.filter_by(username=data['username']).first()
        
        if user and user.authenticate(data['password']):
            session['user_id'] = user.id 
            response = user.to_dict(), 202
            return response
        else:
            return {'error': 'Incorrect username or password'}, 401


class CheckSession(Resource):
    def get(self):
        user = get_current_user()
        if user:
            return user.to_dict(), 200
        
        else:
            return unauth_error


class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {'message': 'Logout successful'}, 204

class Users(Resource):
    def get(self):
        current_user = get_current_user()

        if current_user.admin == '1':
            all_users = get_all(User)
            return all_users, 200

        if current_user.admin == '0':
            return unauth_error

class UsersByID(Resource):
    def get(self, id):
        user = get_first(User, 'id', id)
        if not user:
            return unfound_error('User')
        current_user = get_current_user()
        if user:
            if user.id == session.get('user_id') or current_user.admin == '1':
                return user.to_dict(), 200
            
            return unauth_error
    
    def patch(self, id):
        user = get_first(User, 'id', id)

        if not user:
            return unfound_error('User')
        
        current_user = get_current_user()
        if user:
            if user.id == session.get('user_id') or current_user.admin == '1':
                data = request.get_json()
                for key in data.keys():
                    if key not in ['id', 'admin']:
                        setattr(user, key, data[key])
                
                        db.session.commit()

                        return user.to_dict(), 202

            return unauth_error
    
    def delete(self, id):
        user = get_first(User, 'id', id)

        if not user:
            return unfound_error('User')
        
        current_user = get_current_user()
        if current_user.admin == '1':

            db.session.delete(user)
            db.session.commit()

            return {'message':'User deleted'}, 204
        
        return unauth_error
    


api.add_resource(SignUp, '/signup')
api.add_resource(Login, '/login')
api.add_resource(CheckSession, '/checksession')
api.add_resource(Logout, '/logout')
api.add_resource(Users, '/users')
api.add_resource(UsersByID, '/users/<int:id>')
