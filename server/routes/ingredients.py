from flask_restful import Resource, Api
from config import *
from flask import Flask, request, session, abort
from models.models import Recipe, Ingredient, Herb, User

class RecipeIngredients(Resource):
    def get(self, id):
        recipe = Recipe.query.filter_by(id=id).first()
        if not recipe:
            return {'error':'Recipe not found.'}, 404

        if recipe:
            ingredients = [ingredient.to_dict() for ingredient in recipe.ingredients]

            return ingredients, 200

    def post(self, id):
        recipe = Recipe.query.filter_by(id=id).first()
        data = request.get_json()
        
        if not recipe:
            return {'error':'Recipe not found.'}, 404

        if recipe:
            ingredients = Ingredient(
                amount = data['amount'],
                amount_type = data['amount_type'],
                herb_type = data['herb_type'],
                recipe_id = id,
                herb_id = data['herb_id']
            )

            herb_ids = data.get('herb_id')

            if herb_ids:
                herbs = [Herb.query.get(herb_id) for herb_id in herb_ids]
                recipe.herbs = herbs

                properties = []
                for herb in herbs:
                        properties.extend(herb.properties)
                recipe.properties = list(set(properties))
            
            db.session.commit()

        ingredients = [ingredient.to_dict() for ingredient in recipe.ingredients]

        return ingredients, 204

class RecipeIngredientsByID(Resource):
    def get(self, id, ingredient_id):
        recipe = Recipe.query.filter_by(id=id).first()

        if not recipe:
            return {'error':'Recipe not found'}, 404
        
        if recipe:
            ingredient = Ingredient.query.filter_by(id=ingredient_id).first()

            if not ingredient:
                return {'error':'Ingreident not found'}, 404
            
            if ingredient.recipe_id == id:
                return ingredient.to_dict(), 200

            else:
                return {'error':'Ingredient is not for this recipe.'}, 409
            
    def patch(self, id, ingredient_id):
        recipe = Recipe.query.filter_by(id=id).first()
        data = request.get_json()
        
        if not recipe:
            return {'error':'Recipe not found'}, 404
        
        current_user = User.query.filter_by(id=session.get('user_id')).first()
        if recipe.entered_by_id == session.get('user_id') or current_user.admin == 1:   
            ingredient = Ingredient.query.filter_by(id=ingredient_id).first()

            if not ingredient:
                return {'error':'Ingredient not found'}, 404
                    
            if ingredient not in recipe.ingredients:
                return {'error':'This ingredient is not part of this recipe.'}, 409
                    
            else:
                for attr, value in data.items():
                    setattr(ingredient, attr, value)
                    db.session.commit()
                    return ingredient.to_dict(), 204

    def delete(self, id, ingredient_id):
        recipe = Recipe.query.filter_by(id=id).first()
        
        if not recipe:
            return {'error':'Recipe not found'}, 404
        
        current_user = User.query.filter_by(id=session.get('user_id')).first()
        if recipe.entered_by_id == session.get('user_id') or current_user.admin == 1:   
            ingredient = Ingredient.query.filter_by(id=ingredient_id).first()

            if not ingredient:
                return {'error':'Ingredient not found'}, 404
            
            if ingredient not in recipe.ingredients:
                return {'error':'This ingredient is not part of this recipe.'}, 409
            
            else:
                db.session.delete(ingredient)
                return {'message':'Ingredient deleted'}, 204
        
        else:
            return{'error':'Unathorized'}, 401


api.add_resource(RecipeIngredients, '/recipes/<int:id>/ingredients')
api.add_resource(RecipeIngredientsByID, '/recipes/<int:id>/ingredients/<int:ingredient_id>')
