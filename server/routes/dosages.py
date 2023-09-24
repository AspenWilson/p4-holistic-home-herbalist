from flask_restful import Resource
from config import *
from flask import Flask, request, session
from models.models import Herb, Dosage
from .helpers import get_current_user, get_first, unauth_error, unfound_error, unrelated_err

class HerbDosages(Resource):
    def get(self, id):
        herb = get_first(Herb, 'id', id)
        if not herb:
            return unfound_error('Herb')
        
        if herb:
            herb_dosages = [dosage.to_dict() for dosage in herb.dosages]
            return herb_dosages, 200
    
    def post(self, id):
        herb = get_first(Herb, 'id', id)
        if not herb:
            return unfound_error('Herb')
        
        if herb:
            data = request.get_json()
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
        if not herb:
            return unfound_error('Herb')
        
        if herb:
            dosage = get_first(Dosage, 'id', dosage_id)

            if not dosage:
                return unfound_error('Dosage')

            if dosage.herb_id == id:
                return dosage.to_dict(), 200
            
            return unrelated_err('Dosage', 'Herb')
        
    
    def patch(self, id, dosage_id):
        herb = get_first(Herb, 'id', id)
        if not herb:
            return unfound_error('Herb')
        
        if herb:
            dosage = get_first(Dosage, 'id', dosage_id)

            if not dosage:
                return unfound_error('Dosage')

            if dosage.herb_id == id:
                current_user = get_current_user()
                data = request.get_json()
                if herb.entered_by_id == session.get('user_id') or current_user.admin == '1': 
                    for key in data.keys():
                        if key not in ['id', 'herb_id']:
                            setattr(dosage, key, data[key])
                            db.session.commit()
                            return dosage.to_dict(), 202

                return unauth_error
            
            return unrelated_err('Dosage', 'Herb')
    
    def delete(self, id, dosage_id):
        herb = get_first(Herb, 'id', id)
        if not herb:
            return unfound_error('Herb')
        
        if herb:
            dosage = get_first(Dosage, 'id', dosage_id)

            if not dosage:
                return unfound_error('Dosage')

            if dosage.herb_id == id:
                current_user = get_current_user()
                if herb.entered_by_id == current_user.id or current_user.admin == '1':
                    db.session.delete(dosage)
                    db.session.commit()
                    return {'message':'Dosage deleted.'}, 204
                
                return unauth_error
            
            return unrelated_err('Dosage', 'Herb')
        
api.add_resource(HerbDosages, '/herbs/<int:id>/dosages')
api.add_resource(HerbDosagesByID, '/herbs/<int:id>/dosages/<int:dosage_id>')
