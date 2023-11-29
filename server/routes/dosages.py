from flask_restful import Resource
from config import api, db
from flask import request, session
from models.models import Herb, Dosage
from .helpers import get_current_user, get_first, unauth_error, unfound_error, unrelated_err

class HerbDosages(Resource):
    def get(self, id):
        herb = get_first(Herb, 'id', id)
        
        if not herb:
            return unfound_error('Herb')
        
        herb_dosages = [dosage.to_dict() for dosage in herb.dosages]
        return herb_dosages, 200
    
    def post(self, id):
        herb = get_first(Herb, 'id', id)
        data = request.get_json()
        if not herb:
            return unfound_error('Herb')
        
        new_dosage = Dosage(
            dosage_form = data['dosage_form'], 
            dosage_description = data['dosage_description'],
            herb_id = id  
        )

        herb.dosages.append(new_dosage)
        db.session.commit()
        return new_dosage.to_dict()


class HerbDosagesByID(Resource):
    def get(self, id, dosage_id):
        herb = get_first(Herb, 'id', id)
        dosage = get_first(Dosage, 'id', dosage_id)
        
        if not herb:
            return unfound_error('Herb')
        
        if not dosage:
            return unfound_error('Dosage')

        if dosage.herb_id != id:
            return unrelated_err('Dosage', 'Herb')
        
        return dosage.to_dict(), 200
            
    
    def patch(self, id, dosage_id):
        herb = get_first(Herb, 'id', id)
        current_user = get_current_user()
        data = request.get_json()

        dosage = get_first(Dosage, 'id', dosage_id)
        
        if not herb:
            return unfound_error('Herb')
        
        if not dosage:
            return unfound_error('Dosage')

        if dosage.herb_id != id:
            return unrelated_err('Dosage', 'Herb')
        
        if herb.entered_by_id != session.get('user_id') and current_user.admin != "1":
            return unauth_error
        
        for key, value in data.items():
            setattr(dosage, key, value)
        
        db.session.commit()
        return dosage.to_dict(), 202

            
    def delete(self, id, dosage_id):
        herb = get_first(Herb, 'id', id)
        dosage = get_first(Dosage, 'id', dosage_id)
        current_user = get_current_user()
        
        if not herb:
            return unfound_error('Herb')
        
        if not dosage:
            return unfound_error('Dosage')

        if dosage.herb_id != id:
            return unrelated_err('Dosage', 'Herb')
        
        if herb.entered_by_id != session.get('user_id') and current_user.admin != "1":
            return unauth_error
        
        db.session.delete(dosage)
        db.session.commit()
        return {'message':'Dosage deleted.'}, 204
                
            
        
api.add_resource(HerbDosages, '/api/herbs/<int:id>/dosages')
api.add_resource(HerbDosagesByID, '/api/herbs/<int:id>/dosages/<int:dosage_id>')
