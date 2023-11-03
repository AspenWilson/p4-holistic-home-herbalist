from flask_restful import Resource
from models.models import User, Recipe, Herb
from config import api, db
from flask import request, session
from .helpers import get_current_user, get_first, unauth_error, unfound_error

class UserSavedRecipes(Resource):
    def get(self,id):
        user = get_first(User, 'id', id)
        current_user = get_current_user()
        if not user:
            return unfound_error('User')
        
        saved_recipes = [saved_recipe.to_dict() for saved_recipe in user.saved_recipes]

        return saved_recipes, 200
            
    def post(self, id):
        user = get_first(User, 'id', id)
        current_user = get_current_user()
        data = request.get_json()
        recipe_id = data.get('recipe_id')
        recipe = get_first(Recipe, 'id', recipe_id)
        
        if not user or not recipe:
            return unfound_error('Item')

        if not recipe_id:
            return {'error':'Missing recipe id.'}, 422

        if recipe in user.saved_recipes:
            return {'error': 'Recipe is already in your saved recipes.'}, 409
                
        user.saved_recipes.append(recipe)
        db.session.commit()
        return recipe.to_dict(), 202
        

class UserSavedRecipesByID(Resource):
    def get(self, id, recipe_id):
        user = get_first(User, 'id', id)
        current_user = get_current_user()
        recipe = get_first(Recipe, 'id', recipe_id)
        
        if not user or not recipe:
            return unfound_error('Item')
                
        if recipe in user.saved_recipes:
            return recipe.to_dict(), 200
                
        if recipe not in user.saved_recipes:
            return {'error':'Recipe not found in saved recipes.'}, 404
        

    def delete(self, id, recipe_id):
        user = get_first(User, 'id', id)
        current_user = get_current_user()
        recipe = get_first(Recipe, 'id', recipe_id)
        
        if not user or not recipe:
            return unfound_error('Item')
        
        user.saved_recipes.remove(recipe)
        db.session.commit()
        return {'message': 'Recipe removed from saved recipes.'}, 204
             

class UserSavedHerbs(Resource):
    def get(self, id):
        user = get_first(User, 'id', id)
        current_user = get_current_user()
        if not user:
            return unfound_error('User')
        
        saved_herbs = [saved_herb.to_dict() for saved_herb in user.saved_herbs]
        return saved_herbs, 200

    def post(self, id):
        user = get_first(User, 'id', id)
        data = request.get_json()
        herb_id = data.get('herb_id')
        herb = Herb.query.filter_by(id=herb_id).first()
        
        if not user or not herb:
            return unfound_error('Item')
        
        if not herb_id:
            return {'error':'Missing herb id.'}, 422
                
        if herb in user.saved_herbs:
            return {'error': 'Herb is already in your saved herbs.'}, 409
                
        user.saved_herbs.append(herb)
        db.session.commit()

        return herb.to_dict(), 202


class UserSavedHerbsByID(Resource):
    def get(self, id, herb_id):
        user = get_first(User, 'id', id)
        current_user = get_current_user()
        herb = get_first(Herb, 'id', herb_id)
        
        if not user or not herb:
            return unfound_error('Item')

        if herb not in user.saved_herbs:
            return {'error':'Herb not found in saved herbs.'}, 404
        
        return herb.to_dict()
           
    def delete(self, id, herb_id):
        user = get_first(User, 'id', id)
        current_user = get_current_user()
        herb = get_first(Herb, 'id', herb_id)
        
        if not user or not herb:
            return unfound_error('Item')
                
        if herb not in user.saved_herbs:
            return {'error':'Herb not found in saved herbs.'}, 404
        
        user.saved_herbs.remove(herb)
        db.session.commit()
        return {'message': 'Herb removed from saved herbs.'}, 204


api.add_resource(UserSavedRecipes, '/api/users/<int:id>/saved-recipes')
api.add_resource(UserSavedRecipesByID, '/api/users/<int:id>/saved-recipes/<int:recipe_id>')
api.add_resource(UserSavedHerbs, '/api/users/<int:id>/saved-herbs')
api.add_resource(UserSavedHerbsByID, '/api/users/<int:id>/saved-herbs/<int:herb_id>')