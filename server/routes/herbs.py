from flask_restful import Resource, Api
from models.models import User
from config import *
from flask import Flask, request, session, abort, make_response
from models.models import Herb, User, Property, Dosage


class Herbs(Resource):
    def get(self):
        all_herbs = [herb.to_dict() for herb in Herb.query.all()]
        return all_herbs, 200
    
    def post(self):
        data = request.get_json()
        try:
            new_herb = Herb(
                name=data['name'],
                latin_name=data['latin_name'],
                description=data['description'],
                warnings=data['warnings'],
                image_url=data['image_url'],
                entered_by_id = session.get('user_id')
            )
            if 'dosages' in data:
                dosages_data = data.get('dosages', [])
                dosages = [Dosage(
                    dosage_form=dosage_data['dosage_form'],
                    dosage_description=dosage_data['dosage_description']
                ) for dosage_data in dosages_data]
                new_herb.dosages = dosages

            if 'property_ids' in data:
                property_ids = data.get('property_ids', [])
                properties = Property.query.filter(Property.id.in_(property_ids)).all()
                new_herb.properties = properties

            db.session.add(new_herb)
            db.session.commit()

            response = new_herb.to_dict(), 201

            return response
        
        except ValueError as e:
            abort(422, e.args[0])

class HerbsByID(Resource):
    def get(self, id):
        herb = Herb.query.filter_by(id=id).first()
        if not herb:
            return {'error': 'Not found'}, 404
        response = herb.to_dict(), 200
        return response
    
    def patch(self, id):
        herb = Herb.query.filter_by(id=id).first()

        if not herb:
            return {'error': 'Herb not found'}, 404
        
        current_user = User.query.filter_by(id=session.get('user_id')).first()
        if herb:
            if herb.entered_by_id == session.get('user_id') or current_user.admin == 1:
                data = request.get_json()

                if 'property_ids' in data:
                    property_ids = data['property_ids']

                    properties = Property.query.filter(Property.id.in_(property_ids)).all()
                    herb.properties = properties

                if 'dosages' in data:
                    dosages_data = data['dosages']
                    herb.dosages = [Dosage(**dosage_data) for dosage_data in dosages_data]

                else:
                    for key in data.keys():
                        if key !="id" and hasattr(herb,key):
                            setattr(herb, key, data[key])
                    db.session.commit()

                response= herb.to_dict(), 202
                return response
            else:
                return {'error':'Unauthorized'}, 401
    
    def delete(self, id):
        herb = Herb.query.filter_by(id=id).first()

        if not herb:
            return {'error': 'Herb not found'}, 404
        
        current_user = User.query.filter_by(id=session.get('user_id')).first()
        if herb:
            if herb.entered_by_id == session.get('user_id') or current_user.admin == 1:
                db.session.delete(herb)
                db.session.commit()
            
                return {'message':'Herb deleted'}, 204

            else:
                return {'error':'Unauthorized'}  , 401     
    
api.add_resource(Herbs, '/herbs')
api.add_resource(HerbsByID, '/herbs/<int:id>')