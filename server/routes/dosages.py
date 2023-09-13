from flask_restful import Resource, Api
from models.models import User
from config import *
from flask import Flask, request, session, abort, make_response
from models.models import Dosage

class DosagesByHerb(Resource):
    def get(self, herb_id):
        all_dosages = [dosage.to_dict() for dosage in Dosage.query.filter_by(herb_id=herb_id).all()]
        return all_dosages, 200

class DosageByID(Resource):
    def get(self, herb_id, id):
        dosage = Dosage.query.filter((Dosage.id == id) & (Dosage.herb_id == herb_id)).first()
        if dosage:
            return dosage.to_dict(), 200
        else:
            return {'error': 'Dosage not found'}, 404
    
    def patch(self, herb_id, id):
        dosage = Dosage.query.filter((Dosage.id == id) & (Dosage.herb_id == herb_id)).first()
        if dosage:
            data = request.get_json()
            for attr, value in data.items():
                    setattr(dosage, attr, value)
            
            db.session.commit()

            response = dosage.to_dict(), 200
            return response
        else:
            return {'error': 'Dosage not found'}, 404
    
    def delete(self, herb_id, id):
        dosage = Dosage.query.filter((Dosage.id == id) & (Dosage.herb_id == herb_id)).first()
        if dosage:
            db.session.delete(dosage)
            db.session.commit()

            response = 'Dosage deleted', 204
            return response 

        else:
            return {'error': 'Dosage not found'}, 404
        
api.add_resource(DosagesByHerb, '/herbs/<int:herb_id>/dosages')
api.add_resource(DosageByID, '/herbs/<int:herb_id>/dosages/<int:id>')
