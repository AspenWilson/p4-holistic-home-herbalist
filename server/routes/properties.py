from flask_restful import Resource
from config import api, db
from flask import request, session, abort
from models.models import Property
from .helpers import get_all, get_first, get_current_user, unauth_error, unfound_error, deleted_msg

class Properties(Resource):
    def get(self):
        all_properties = get_all(Property)
        return all_properties, 200
    
    def post(self):
        data = request.get_json()

        new_property = Property(
            name=data['name'], 
            description=data['description'],
            entered_by_id=session.get('user_id')
        )

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
        current_user = get_current_user()
        data = request.get_json()

        if not prop:
            return unfound_error('Property')
        
        if prop.entered_by_id != session.get('user_id') or current_user.admin != '1':
            return unauth_error    

        prop.name=data['name'], 
        prop.description=data['description']

        db.session.commit()
        return prop.to_dict(), 202
            
    
    def delete(self, id):
        prop = get_first(Property, 'id', id)
        current_user = get_current_user()
        if not prop:
            return unfound_error('Property')
        
        if prop.entered_by_id != session.get('user_id') or current_user.admin != '1':
                return unauth_error
        
        db.session.delete(prop)
        db.session.commit()

        return deleted_msg('Property')
            

api.add_resource(Properties, '/api/properties')
api.add_resource(PropertiesByID, '/api/properties/<int:id>')


