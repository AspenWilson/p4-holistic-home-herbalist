from models.models import User
from config import db
from flask import Flask, session

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
