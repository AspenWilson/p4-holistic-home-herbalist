from flask_restful import Resource, Api
from models.models import User
from config import *
from flask import Flask, request, session, abort
from models.models import Property, User

class Properties(Resource):
    def get(self):
        property_list = [prop.to_dict() for prop in Property.query.all()]
        response = property_list, 200

        return response
    
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

        response = new_property.to_dict(), 201

        return response
    
class PropertiesByID(Resource):
    def get(self, id):
        prop = Property.query.filter_by(id=id).first()
        if not prop:
            return {'error': 'Property not found'}, 404
        
        response = prop.to_dict(), 200
        return response
    
    def patch(self, id):
        prop = Property.query.filter_by(id=id).first()
        current_user = User.query.filter_by(id=session.get('user_id')).first()
        if prop:
            if prop.entered_by_id == session.get('user_id') or current_user.admin == 1:
                try: 
                    data = request.get_json()

                    for key in data.keys():
                        if key !="id" and hasattr(prop,key):
                            setattr(prop, key, data[key])
                    db.session.add(prop)
                    db.session.commit()

                    response= prop.to_dict(), 200
                    return response
                except:
                    return {'error': 'Property not found'}, 404
    
    def delete(self, id):
        prop = Property.query.filter_by(id=id).first()
        if not prop:
            return {'error': 'Property not found'}, 404
        db.session.delete(prop)
        db.session.commit()

        response = 'Property deleted', 204
        return response  

api.add_resource(Properties, '/properties')
api.add_resource(PropertiesByID, '/properties/<int:id>')


