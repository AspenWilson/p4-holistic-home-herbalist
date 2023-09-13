from flask_restful import Resource, Api
from models.models import User
from config import *
from flask import Flask, request, session, abort, make_response
from models.models import Ingredient

class IngredientsByRecipe(Resource):
    def get(self):
        all_ingredients= [ingredient.to_dict() for ingredient in Ingredient.query.all()]
        return all_ingredients, 200

    def post(self, id):
        data = request.get_json()
        new_ingredient = Ingredient(
            amount = data['amount'],
            amount_type = data['amount_type'],
            herb_type = data['herb_type'],
            herb_id = data['herb_id'],
            recipe_id = id
        )
        db.session.add(new_ingredient)
        db.session.commit()

class IngredientByID(Resource):
    def get(self, id):
        recipe_ingredients = [ingredient.to_dict() for ingredient in Ingredient.query.filter_by(id=id).first()]
        return recipe_ingredients, 200
    
    def patch(self, id):
        ingredient = Ingredient.query.filter_by(id=id).first()
