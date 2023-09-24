from flask_restful import Resource
from config import *
from flask import Flask, request, session
from models.models import Recipe, Ingredient, Herb, User
from .helpers import get_all, get_current_user, get_first, unauth_error, unfound_error, unrelated_err

class RecipeIngredients(Resource):
    def get(self, id):
        recipe = get_first(Recipe, 'id', id)
        if not recipe:
            return unfound_error('Recipe')

        if recipe:
            ingredients = [ingredient.to_dict() for ingredient in recipe.ingredients]

            return ingredients, 200

    def post(self, id):
        recipe = get_first(Recipe, 'id', id)
        data = request.get_json()
        
        if not recipe:
            return unfound_error('Recipe')

        if recipe:
            new_ingredient = Ingredient(
                amount = data['amount'],
                amount_type = data['amount_type'],
                herb_type = data['herb_type'],
                recipe_id = id,
                herb_id = data['herb_id']
            )

            herb_id = data.get('herb_id')

            if herb_id:
                herb = Herb.query.get(herb_id) 
                recipe.herbs.append = herb

                properties = []

                properties.extend(herb.properties)
                recipe.properties.append = list(set(properties))
            
            db.session.add(new_ingredient)
            db.session.commit()

        recipe.ingredients.append(new_ingredient)

        return new_ingredient.to_dict(), 201

class RecipeIngredientsByID(Resource):
    def get(self, id, ingredient_id):
        recipe = get_first(Recipe, 'id', id)

        if not recipe:
            return unfound_error('Recipe')
        
        if recipe:
            ingredient = get_first(Ingredient, 'id', ingredient_id)

            if not ingredient:
                return unfound_error('Ingredient')
            
            if ingredient.recipe_id == id:
                return ingredient.to_dict(), 200

            else:
                return unrelated_err('Ingredient', 'Recipe')
            
    def patch(self, id, ingredient_id):
        recipe = get_first(Recipe, 'id', id)
        data = request.get_json()
        
        if not recipe:
            return unfound_error('Recipe')
        
        current_user = get_current_user()
        if recipe.entered_by_id == session.get('user_id') or current_user.admin == '1':   
            ingredient = get_first(Ingredient, 'id', ingredient_id)

            if not ingredient:
                return unfound_error('Ingredient')
                    
            if ingredient not in recipe.ingredients:
                return unrelated_err('Ingredient', 'Recipe')
                    
            else:
                for attr, value in data.items():
                    setattr(ingredient, attr, value)
                    db.session.commit()
                    return ingredient.to_dict(), 204
        
        else:
            return unauth_error

    def delete(self, id, ingredient_id):
        recipe = get_first(Recipe, 'id', id)
        
        if not recipe:
            return unfound_error('Recipe')
        
        current_user = get_current_user()
        if recipe.entered_by_id == session.get('user_id') or current_user.admin == '1':   
            ingredient = get_first(Ingredient, 'id', ingredient_id)

            if not ingredient:
                return unfound_error('Ingredient')
            
            if ingredient not in recipe.ingredients:
                return unrelated_err('Ingredient', 'Recipe')
            
            else:
                db.session.delete(ingredient)
                db.session.commit()
                return {'message':'Ingredient deleted'}, 204
        
        else:
            return unauth_error


api.add_resource(RecipeIngredients, '/recipes/<int:id>/ingredients')
api.add_resource(RecipeIngredientsByID, '/recipes/<int:id>/ingredients/<int:ingredient_id>')
