from flask_restful import Resource
from config import api, db
from flask import request, session, abort
from models.models import Recipe, Ingredient, Herb
from .helpers import get_current_user, get_first, unauth_error, unfound_error, unrelated_err

class RecipeIngredients(Resource):
    def get(self, id):
        recipe = get_first(Recipe, 'id', id)
        if not recipe:
            return unfound_error('Recipe')

        ingredients = [ingredient.to_dict() for ingredient in recipe.ingredients]
        return ingredients, 200

    def post(self, id):
        recipe = get_first(Recipe, 'id', id)
        data = request.get_json()
        herb_id = data.get('herb_id') 
        herb = get_first(Herb, 'id', herb_id)
        
        if not recipe:
            return unfound_error('Item')

        if herb not in recipe.herbs:
            recipe.herbs.append(herb)

            for property in herb.properties:
                if property not in recipe.properties:
                    recipe.properties.append(property)
        
        for existing_ingredient in recipe.ingredients:
            if data['herb_id'] == existing_ingredient.herb_id:
                return {'message': 'There is already an ingredient entry with this herb. Please edit the current entry.'}, 409
        try: 
            new_ingredient = Ingredient(
                amount=data['amount'],
                amount_type=data['amount_type'],
                herb_type=data['herb_type'],
                recipe_id=id,
                herb_id=herb_id  
            )

            db.session.add(new_ingredient)
            db.session.commit()

            recipe.ingredients.append(new_ingredient)
            return new_ingredient.to_dict(), 201
        
        except ValueError as e:
            abort (409, e.args[0])

class RecipeIngredientsByID(Resource):
    def get(self, id, ingredient_id):
        recipe = get_first(Recipe, 'id', id)
        ingredient = get_first(Ingredient, 'id', ingredient_id)

        if not recipe or not ingredient:
            return unfound_error('Item')
            
        if ingredient.recipe_id != id:
            return unrelated_err('Ingredient', 'Recipe')
        
        return ingredient.to_dict(), 200

    def patch(self, id, ingredient_id):
        recipe = get_first(Recipe, 'id', id)
        data = request.get_json()
        current_user = get_current_user()
        ingredient = get_first(Ingredient, 'id', ingredient_id)
        
        if not recipe or not ingredient:
            return unfound_error('Item')
                    
        if ingredient not in recipe.ingredients:
            return unrelated_err('Ingredient', 'Recipe')
        
        if recipe.entered_by_id != session.get('user_id') and current_user.admin != "1":
            return unauth_error
        
        for existing_ingredient in recipe.ingredients:
            if data['herb_id'] == existing_ingredient.herb_id and ingredient_id != existing_ingredient.id:
                return {'message': 'There is already an ingredient entry with this herb. Please edit the current entry.'}, 409
                    
        for key, value in data.items():
            setattr(ingredient, key, value)

        db.session.commit()
        return ingredient.to_dict(), 202

    def delete(self, id, ingredient_id):
        recipe = get_first(Recipe, 'id', id)
        current_user = get_current_user()
        ingredient = get_first(Ingredient, 'id', ingredient_id)
        
        if not recipe or not ingredient:
            return unfound_error('Item')

        if ingredient not in recipe.ingredients:
            return unrelated_err('Ingredient', 'Recipe')
        
        if recipe.entered_by_id != session.get('user_id') and current_user.admin != "1":
            return unauth_error
            
        db.session.delete(ingredient)
        db.session.commit()
        return {'message':'Ingredient deleted'}, 204
        

api.add_resource(RecipeIngredients, '/api/recipes/<int:id>/ingredients')
api.add_resource(RecipeIngredientsByID, '/api/recipes/<int:id>/ingredients/<int:ingredient_id>')
