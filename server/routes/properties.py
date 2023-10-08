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
                        if key not in ['id', 'entered_by_id']:
                            setattr(prop, key, data[key])
                            db.session.commit()
                            return prop.to_dict(), 202
            
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

api.add_resource(Properties, '/api/properties')
api.add_resource(PropertiesByID, '/api/properties/<int:id>')


