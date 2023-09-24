from flask_restful import Resource
from models.models import User
from config import *
from flask import Flask, request, session, abort
from models.models import Property, User
from .helpers import get_all, get_first, get_current_user, unauth_error, unfound_error, deleted_msg

class Properties(Resource):
    def get(self):
        all_properties = get_all(Property)
        # property_list = [prop.to_dict() for prop in Property.query.all()]
        # response = property_list, 200

        return all_properties, 200
    
    def post(self):
        data = request.get_json()

        try:
            new_property = Property(
                name=data['name'], 
                description=data['description'],
                entered_by_id=session.get('user_id')
            )
        
        except ValueError as e:
            abort(422, e.args[0])

        db.session.add(new_property)
        db.session.commit()

        return new_property.to_dict(), 201
    
class PropertiesByID(Resource):
    def get(self, id):
        prop = get_first(Property, 'id', id)
        if not prop:
            return unfound_error('Property')
        
        return prop.to_dict(), 200
    
    def patch(self, id):
        prop = get_first(Property, 'id', id)
        if not prop:
            return unfound_error('Property')
        current_user = get_current_user()
        if prop:
            if prop.entered_by_id == session.get('user_id') or current_user.admin == '1':
                    data = request.get_json()

                    for key in data.keys():
                        if key !="id" and hasattr(prop,key):
                            setattr(prop, key, data[key])
                    db.session.commit()

                    response= prop.to_dict(), 202
                    return response
            else:  
                return unauth_error    
    
    def delete(self, id):
        prop = get_first(Property, 'id', id)
        if not prop:
            return unfound_error('Property')
        
        current_user = get_current_user()
        if prop:
            if prop.entered_by_id == session.get('user_id') or current_user.admin == '1':
                db.session.delete(prop)
                db.session.commit()

                return deleted_msg('Property')
            
            else:
                return unauth_error

api.add_resource(Properties, '/properties')
api.add_resource(PropertiesByID, '/properties/<int:id>')


