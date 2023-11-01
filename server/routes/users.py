from flask_restful import Resource
from models.models import User
from config import api, db
from flask import request, session
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
        
        if not user or not user.authenticate(data['password']):
            return {'error': 'Incorrect username or password'}, 401
        
        session['user_id'] = user.id 
        response = user.to_dict(), 202
        return response


class CheckSession(Resource):
    def get(self):
        user = get_current_user()
        if not user:
            return unauth_error
        
        return user.to_dict(), 200


class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {'message': 'Logout successful'}, 204

class Users(Resource):
    def get(self):
        current_user = get_current_user()

        if current_user.admin != '1':
            return unauth_error
        
        all_users = get_all(User)
        return all_users, 200


class UsersByID(Resource):
    def get(self, id):
        user = get_first(User, 'id', id)
        current_user = get_current_user()
        if not user:
            return unfound_error('User')
        
        if user.id != session.get('user_id') or current_user.admin != "1":
            return unauth_error
        
        return user.to_dict(), 200
            
    def patch(self, id):
        user = get_first(User, 'id', id)
        current_user = get_current_user()
        data = request.get_json()

        if not user:
            return unfound_error('User')
        
        if user.id != session.get('user_id') or current_user.admin != '1':
            return unauth_error
        
        for key in data.keys():
            if key not in ['id', 'admin']:
                setattr(user, key, data[key])
                
        db.session.commit()
        return user.to_dict(), 202

    
    def delete(self, id):
        user = get_first(User, 'id', id)
        current_user = get_current_user()

        if not user:
            return unfound_error('User')
        
        if current_user.admin != '1':
            return unauth_error

        db.session.delete(user)
        db.session.commit()

        return {'message':'User deleted'}, 204
        
    
api.add_resource(SignUp, '/api/signup')
api.add_resource(Login, '/api/login')
api.add_resource(CheckSession, '/api/checksession')
api.add_resource(Logout, '/api/logout')
api.add_resource(Users, '/api/users')
api.add_resource(UsersByID, '/api/users/<int:id>')
