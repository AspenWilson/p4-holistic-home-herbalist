from flask_restful import Resource
from models.models import User
from config import api, db
from flask import Flask, request, session, abort

# Declared variables:

unauth_error = {'error':'Unauthorized'}, 401



#Model queries:

def get_all(model):
    all_entries = [entry.to_dict() for entry in model.query.all()]
    return all_entries

def get_first(model, search_key, value_key):
    entry = model.query.filter_by(**{search_key : value_key}).first()
    return entry

def get_current_user():
    user_id = session.get('user_id')
    current_user = User.query.filter_by(id=user_id).first()
    return current_user


# Errors and messages functions

def unfound_error(model):
    return {'error':f'{model} not found.'}, 404

def deleted_msg(model):
    return {'message':f'{model} deleted successfully.'}, 204

def unrelated_err(model1, model2):
    return {'error': f'This {model1} is not for this {model2}'}, 409

def requires_authorization(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        user = User.query.filter_by(id=kwargs.get('id')).first()
        current_user = User.query.filter_by(id=session.get('user_id')).first()

        if not user:
            return {'error': 'User not found'}, 404

        if not current_user:
            return {'error': 'Current user not found'}, 404

        if user.id == current_user.id or current_user.admin == 1:
            return func(*args, **kwargs)

        return {'error': 'Unauthorized'}, 401

    return wrapper
# def check_auth()
#             user = User.query.filter_by(id=id).first()
#         if not user:
#             return {'error': 'User not found'}, 404
#         current_user = User.query.filter_by(id=session.get('user_id')).first()
#         if user:
#             if user.id == session.get('user_id') or current_user.admin == 1:
#                 response = user.to_dict(), 200
#                 return response
#                     user = User.query.filter_by(id=id).first()
#         if not user:
#             return {'error': 'User not found'}, 404
        
#         current_user = User.query.filter_by(id=session.get('user_id')).first()
#         if user:
#             if user.id == session.get('user_id') or current_user.admin == 1:
#                 comments = [comment.to_dict() for comment in user.comments]
#                 return comments, 200
            
#             return {'error':'Unauthorized'}


def patch_entry(model, search_key, value_key, auth_key):
        patch_entry = model.query.filter_by(**{search_key: value_key}).first()  

        if not patch_entry:
            return {'error':f'{model} not found'}, 404
        
        if patch_entry:
            if getattr(patch_entry,auth_key) == session.get('user_id') or current_user.admin == 1:
                for attr, value in data.items():
                    setattr(patch_entry, attr, value)

                db.session.commit() 
                response = patch_entry.to_dict(), 201
                return response

            return unauth_error