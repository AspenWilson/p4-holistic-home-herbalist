from flask_restful import Resource, Api
from models.models import User
from config import *
from flask import Flask, request, session, abort
from models.models import Recipe, Ingredient

class Recipes(Resource):
    def get(self):
        all_recipes = [recipe.to_dict() for recipe in Recipe.query.all()]
        return all_recipes, 200
    
    def post(self):
        data = request.get_json()
        new_recipe = Recipe(
            name = data['name'],
            directions = data['directions'],
            entered_by_id = session.get('user_id')
        )

        if 'ingredients' in data:
            ingredients_data = data.get('dosages', [])
            ingredients = [Ingredient(**ingredient_data) for ingredient_data in ingredients_data]
            new_recipe.ingredients = ingredients
        

        db.session.add(new_recipe)
        db.session.commit()

        response = new_recipe.to_dict(), 200
        return response

class RecipesByID(Resource):
    def get(self, id):
        recipe = Recipe.query.filter_by(id=id).all()

        if not recipe:
            return {'error': 'Recipe not found'}, 404
        
        return recipe.to_dict(), 200

    def patch(self,id):
        recipe = Recipe.query.filter_by(id=id).first()
        data = request.get_json()

        if not recipe:
            return {'error': 'Recipe not found'}, 404

        if recipe:

            if 'ingredients' in data:
                ingredients_data = data['dosages']
                recipe.ingredients = [Ingredient(**ingredient_data) for ingredient_data in ingredients_data]

            else:
                for attr, value in data.items():
                    setattr(recipe, attr, value)
        
            db.session.commit()

            response = recipe.to_dict(), 201
            return response
    
    def delete(self, id):
        recipe = Recipe.query.filter_by(id=id).first()

        if not recipe:
            return {'error':'Recipe not found'}, 404
        
        db.session.delete(recipe)
        db.session.commit()

        response = 'Recipe deleted', 204
        return response

    
api.add_resource(Recipes, '/recipes')
api.add_resource(RecipesByID, '/recipes/<int:id>')