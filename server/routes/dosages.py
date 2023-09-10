from flask_restful import Resource, Api
from models.models import User
from config import *
from flask import Flask, request, session, abort, make_response
from models.models import Dosage

class Dosages(Resource):
    def get(self):
        all_dosages = [herb.to_dict() for herb in Dosage.query.all()]
        return all_dosages, 200

    def post(self, id):
        data = request.get_json()
        new_dosage = Dosage(
            dosage_form = data['dosage_form'],
            dosage_description = data['dosage_description'],
            herb_id = id
        )
        db.session.add(new_dosage)
        db.session.commit()

class DosageByHerb(Resource):
    def get(self, id):
        herb_dosages = [dosage.to_dict() for dosage in Dosage.query.filter_by(id=id).first()]
        return herb_dosages, 200
    
    def patch(self, id):
        dosage = Dosage.query.filter_by(id=id).first()
