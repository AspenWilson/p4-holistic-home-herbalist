from flask_restful import Resource
from config import api, db
from flask import request, session
from models.models import Herb, Property, Dosage
from .helpers import get_current_user, get_all, unauth_error, unfound_error, get_first, deleted_msg

class Herbs(Resource):
    def get(self):
        all_herbs = get_all(Herb)
        return all_herbs, 200
    
    def post(self):
        data = request.get_json()

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


class HerbsByID(Resource):
    def get(self, id):
        herb = get_first(Herb, 'id', id)
        
        if not herb:
            return unfound_error('Herb')
        
        return herb.to_dict(), 200
    
    def patch(self, id):
        herb = get_first(Herb, 'id', id)
        current_user = get_current_user()
        data = request.get_json()

        if not herb:
            return unfound_error('Herb')
        
        if herb.entered_by_id != session.get('user_id') and current_user.admin != "1":
            return unauth_error
        
        protected_attributes = ['id', 'entered_by_id', 'entered_on']

        for key, value in data.items():
            if key not in protected_attributes:
                setattr(herb, key, value)

        if 'property_ids' in data:
            property_ids = data['property_ids']
            unique_property_ids = set(property_ids)
            properties = Property.query.filter(Property.id.in_(unique_property_ids)).all()
            herb.properties = properties

        if 'dosages' in data:
            dosages_data = data['dosages']
            for dosage_data in dosages_data:
                new_dosage = Dosage(**dosage_data)
                herb.dosages.append(new_dosage)
                                        
        db.session.commit()
        return herb.to_dict(), 202
    
    def delete(self, id):
        herb = get_first(Herb, 'id', id)
        current_user = get_current_user()

        if not herb:
            return unfound_error('Herb')

        if herb.entered_by_id != session.get('user_id') and current_user.admin != "1":
            return unauth_error  
                
        for ingredient in herb.ingredients:
            db.session.delete(ingredient)
                
        for dosage in herb.dosages:
            db.session.delete(dosage)
                    
        db.session.delete(herb)
        db.session.commit()
            
        return deleted_msg('Herb')



api.add_resource(Herbs, '/api/herbs')
api.add_resource(HerbsByID, '/api/herbs/<int:id>')