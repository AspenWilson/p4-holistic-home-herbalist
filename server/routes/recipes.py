from flask_restful import Resource
from config import *
from flask import Flask, request, session
from models.models import Recipe, Ingredient, Herb, User

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
            ingredients_data = data.get('ingredients', [])
            ingredients = [Ingredient(**ingredient_data) for ingredient_data in ingredients_data]
            new_recipe.ingredients = ingredients

            herb_ids = [ingredient_data.get('herb_id') for ingredient_data in ingredients_data]

            if herb_ids:
                herbs = [Herb.query.get(herb_id) for herb_id in herb_ids]
                new_recipe.herbs = herbs

                properties = []
                for herb in herbs:
                    properties.extend(herb.properties)
                new_recipe.properties = list(set(properties))
        

        db.session.add(new_recipe)
        db.session.commit()

        response = new_recipe.to_dict(), 200
        return response

class RecipesByID(Resource):
    def get(self, id):
        recipe = Recipe.query.filter_by(id=id).first()

        if not recipe:
            return {'error': 'Recipe not found'}, 404
        
        return recipe.to_dict(), 200

    def patch(self,id):
        recipe = Recipe.query.filter_by(id=id).first()
        data = request.get_json()

        if not recipe:
            return {'error': 'Recipe not found'}, 404

        if recipe:
            current_user = User.query.filter_by(id=session.get('user_id')).first()
            if recipe.entered_by_id == session.get('user_id') or current_user.admin == 1:

                if 'ingredients' in data:
                    ingredients_data = data['dosages']
                    recipe.ingredients = [Ingredient(**ingredient_data) for ingredient_data in ingredients_data]

                else:
                    for attr, value in data.items():
                        setattr(recipe, attr, value)
            
                db.session.commit()

                response = recipe.to_dict(), 201
                return response
            
            else:
                return {'error':'Unauthorized'}, 401
    
    def delete(self, id):
        recipe = Recipe.query.filter_by(id=id).first()

        if not recipe:
            return {'error':'Recipe not found'}, 404

        if recipe:
            current_user = User.query.filter_by(id=session.get('user_id')).first()
            if recipe.entered_by_id == session.get('user_id') or current_user.admin == 1:
        
                db.session.delete(recipe)
                db.session.commit()

                return {'message':'Recipe deleted'}, 204
            
            else:
                return {'error':'Unauthorized'}, 401

    
api.add_resource(Recipes, '/recipes')
api.add_resource(RecipesByID, '/recipes/<int:id>')
