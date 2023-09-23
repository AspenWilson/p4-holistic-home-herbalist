from flask_restful import Resource
from models.models import User
from config import api, db
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
        user = User.query.filter_by(id=session.get('user_id')).first()
        if user:
            response = user.to_dict(), 200
            return response
        else:
            return {'error': 'Unauthorized'}, 401


class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {'message': 'Logout successful'}, 204

class Users(Resource):
    def get(self):
        current_user = User.query.filter_by(id=session.get('user_id')).first()
        if current_user.admin == 1:
            all_users = [user.to_dict() for user in User.query.all()]
            response = all_users, 200
            return response
        
        return {'error':'Unauthorized'}, 401

class UsersByID(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return {'error': 'User not found'}, 404
        current_user = User.query.filter_by(id=session.get('user_id')).first()
        if user:
            if user.id == session.get('user_id') or current_user.admin == 1:
                response = user.to_dict(), 200
                return response
            
            return {'error':'Unauthorized'}, 401
    
    def patch(self, id):
        user = User.query.filter_by(id=id).first()

        if not user:
            return {'error': 'User not found'}, 404
        
        current_user = User.query.filter_by(id=session.get('user_id')).first()
        if user:
            if user.id == session.get('user_id') or current_user.admin == 1:
                data = request.get_json()
                for attr, value in data.items():
                    setattr(user, attr, value)
                
                db.session.commit()

                response= user.to_dict(), 202
                return response

            return {'error':'Unauthorized'}, 401
    
    def delete(self, id):
        user = User.query.filter_by(id=id).first()

        if not user:
            return {'error': 'User not found'}, 404
        
        current_user = User.query.filter_by(id=session.get('user_id')).first()
        if current_user.admin == 1:

            db.session.delete(user)
            db.session.commit()

            return {'message':'User deleted'}, 204
        
        return {'error':'Unauthorized'}, 401
    



api.add_resource(SignUp, '/signup')
api.add_resource(Login, '/login')
api.add_resource(CheckSession, '/checksession')
api.add_resource(Logout, '/logout')
api.add_resource(Users, '/users')
api.add_resource(UsersByID, '/users/<int:id>')
