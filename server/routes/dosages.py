from flask_restful import Resource, Api
from models.models import User
from config import *
from flask import Flask, request, session, abort, make_response
from models.models import Herb, User, Property, Dosage

class HerbDosages(Resource):
    def get(self, id):
        herb = Herb.query.filter_by(id=id)
        if not herb:
            return {'error':'Herb not found'}, 404
        
        if herb:
            dosages = [dosage.to_dict() for dosage in herb.dosages]

            return dosages, 200
    
    def post(self, id):
        herb = Herb.query.filter_by(id=id)
        if not herb:
            return {'error':'Herb not found'}, 404
        
        if herb:
            data = request.get_json()
            new_dosage = Dosage(
              dosage_form = data['dosage_form'], 
              dosage_description = data['dosage_description'],
              herb_id = id  
            ) 
            herb.dosage.append(new_dosage)
            db.session.commit()
            return new_dosage.to_dict()


class HerbDosagesByID(Resource):
    def get(self, id, dosage_id):
        herb = Herb.query.filter_by(id=id)
        if not herb:
            return {'error':'Herb not found'}, 404
        
        if herb:
            dosage = Dosage.query.filter_by(id = dosage_id).first()

            if not dosage:
                return {'error':'Dosage not found'}, 404

            if dosage.herb_id == id:
                return dosage.to_dict(), 200
            
            else:
                return {'error':'This dosage is not for this herb.'}, 409
        
    
    def patch(self, id, dosage_id):
        herb = Herb.query.filter_by(id=id)
        if not herb:
            return {'error':'Herb not found'}, 404
        
        if herb:
            dosage = Dosage.query.filter_by(id = dosage_id)

            if not dosage:
                return {'error':'Dosage not found'}, 404

            if dosage.herb_id == id:
                current_user = User.query.filter_by(id=session.get('user_id')).first()
                data = request.get_json()
                if herb.entered_by_id == session.get('user_id') or current_user.admin == 1: 
                    for attr, value in data.items():
                        setattr(dosage, attr, value)
                        db.session.commit()
                        return dosage.to_dict(), 204
                
                else:
                    return {'error':'Unauthorized'}, 401
            
            else:
                return {'error':'This dosage is not for this herb.'}, 409
    
    def delete(self, id, dosage_id):
        herb = Herb.query.filter_by(id=id)
        if not herb:
            return {'error':'Herb not found'}, 404
        
        if herb:
            dosage = Dosage.query.filter_by(id = dosage_id)

            if dosage.herb_id == id:
                current_user = User.query.filter_by(id=session.get('user_id')).first()
                if dosage.entered_by_id == current_user.id or current_user.admin == 1:
                    db.session.delete(dosage)
                    db.session.commit
                    return {'message':'Dosage deleted.'}, 204
                
                else:
                    return {'error':'Unauthorized'}, 401
            
            else:
                return {'error':'This dosage is not for this herb.'}, 409
        
api.add_resource(HerbDosages, '/herbs/<int:id>/dosages')
api.add_resource(HerbDosagesByID, '/herbs/<int:id>/dosages/<int:dosage_id>')
