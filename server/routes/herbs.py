from flask_restful import Resource
from config import *
from flask import Flask, request, session, abort
from models.models import Herb, Property, Dosage
from .helpers import get_current_user, get_all, unauth_error, unfound_error, get_first, deleted_msg


class Herbs(Resource):
    def get(self):
        all_herbs = get_all(Herb)
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

            return new_herb.to_dict(), 201
        
        except ValueError as e:
            abort(422, e.args[0])

class HerbsByID(Resource):
    def get(self, id):
        herb = get_first(Herb, 'id', id)
        if not herb:
            return unfound_error('Herb')
        
        return herb.to_dict(), 200
    
    def patch(self, id):
        herb = get_first(Herb, 'id', id)

        if not herb:
            return unfound_error('Herb')
        
        current_user = get_current_user()
        if herb:
            if herb.entered_by_id == session.get('user_id') or current_user.admin == '1':
                data = request.get_json()

                if 'property_ids' in data:
                    property_ids = data['property_ids']

                    properties = Property.query.filter(Property.id.in_(property_ids)).all()
                    herb.properties.extend(properties)

                if 'dosages' in data:
                    dosages_data = data['dosages']
                    for dosage_data in dosages_data:
                        new_dosage = Dosage(**dosage_data)
                        herb.dosages.append(new_dosage)

                else:
                    for key in data.keys():
                        if key not in ['id', 'entered_by_id']:
                            setattr(herb, key, data[key])
                            db.session.commit()
                            return herb.to_dict(), 202
                        
                        return unauth_error
                                        
                db.session.commit()
                return herb.to_dict(), 202

            return unauth_error
    
    def delete(self, id):
        herb = get_first(Herb, 'id', id)

        if not herb:
            return unfound_error('Herb')
        
        current_user = get_current_user()
        if herb:
            if herb.entered_by_id == session.get('user_id') or current_user.admin == '1':
                for ingredient in herb.ingredients:
                    db.session.delete(ingredient)
                
                for dosage in herb.dosages:
                    db.session.delete(dosage)
                    
                db.session.delete(herb)
                db.session.commit()
            
                return deleted_msg('Herb')

            else:
                return unauth_error    
    
api.add_resource(Herbs, '/herbs')
api.add_resource(HerbsByID, '/herbs/<int:id>')