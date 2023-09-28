from flask_restful import Resource
from models.models import User, Recipe, Herb
from app import api, db
from flask import Flask, request, session
from .helpers import get_current_user, get_first, unauth_error, unfound_error

class UserSavedRecipes(Resource):
    def get(self,id):
        user = get_first(User, 'id', id)
        if not user:
            return unfound_error('User')
        
        current_user = get_current_user()
        if user:
            if user.id == session.get('user_id') or current_user.admin == '1':
        
                saved_recipes = [saved_recipe.to_dict() for saved_recipe in user.saved_recipes]

                return saved_recipes, 200
            
            return unauth_error

    def post(self, id):
        user = get_first(User, 'id', id)
        if not user:
            return unfound_error('User')
        
        current_user = get_current_user()
        if user:
            if user.id == session.get('user_id') or current_user.admin == '1':
                data = request.get_json()
                recipe_id = data.get('recipe_id')

                if not recipe_id:
                    return {'error':'Missing recipe id.'}, 422
                
                recipe = get_first(Recipe, 'id', recipe_id)

                if not recipe:
                    return unfound_error('Recipe')

                if recipe in user.saved_recipes:
                    return {'error': 'Recipe is already in your saved recipes.'}, 409
                
                user.saved_recipes.append(recipe)
                db.session.commit()

                response = recipe.to_dict(), 202
                return response
        
        return unauth_error


class UserSavedRecipesByID(Resource):
    def get(self, id, recipe_id):
        user = get_first(User, 'id', id)
        if not user:
            return unfound_error('User')
        
        current_user = get_current_user()
        if user:
            if user.id == session.get('user_id') or current_user.admin == '1':
                recipe = get_first(Recipe, 'id', recipe_id)

                if not recipe:
                    return unfound_error('Recipe')
                
                if recipe in user.saved_recipes:
                    return recipe.to_dict(), 200
                
                if recipe not in user.saved_recipes:
                    return {'error':'Recipe not found in saved recipes.'}, 404
        
        return unauth_error

    def delete(self, id, recipe_id):
        user = get_first(User, 'id', id)
        if not user:
            return unfound_error('User')
        
        current_user = get_current_user()
        if user:
            if user.id == session.get('user_id') or current_user.admin == '1':
                recipe = get_first(Recipe, 'id', recipe_id)

                if recipe:
                    user.saved_recipes.remove(recipe)
                    db.session.commit()
                    return {'message': 'Recipe removed from saved recipes.'}, 204

                else:
                    return {'error': 'Herb is not a saved herb.'}, 404
        
            return unauth_error

                

class UserSavedHerbs(Resource):
    def get(self, id):
        user = get_first(User, 'id', id)
        if not user:
            return unfound_error('User')
        
        current_user = get_current_user()
        if user:
            if user.id == session.get('user_id') or current_user.admin == '1':
                saved_herbs = [saved_herb.to_dict() for saved_herb in user.saved_herbs]
                return saved_herbs, 200
            
            else:
                return unauth_error

    def post(self, id):
        user = get_first(User, 'id', id)
        if not user:
            return unfound_error('User')
        
        current_user = get_current_user()
        if user:
            if user.id == session.get('user_id') or current_user.admin == '1':
                data = request.get_json()
                herb_id = data.get('herb_id')

                if not herb_id:
                    return {'error':'Missing herb id.'}, 422
                
                herb = Herb.query.filter_by(id=herb_id).first()

                if not herb:
                    return unfound_error('Herb')

                if herb in user.saved_herbs:
                    return {'error': 'Herb is already in your saved herbs.'}, 409
                
                user.saved_herbs.append(herb)
                db.session.commit()

                response = herb.to_dict(), 202
                return response
            else:
                return unauth_error

class UserSavedHerbsByID(Resource):
    def get(self, id, herb_id):
        user = get_first(User, 'id', id)
        if not user:
            return unfound_error('User')
        
        current_user = get_current_user()
        if user:
            if user.id == session.get('user_id') or current_user.admin == '1':
                herb = get_first(Herb, 'id', herb_id)
                if not herb:
                    return unfound_error('Herb')
                if herb:
                    if herb in user.saved_herbs:
                        return herb.to_dict()

                    if herb not in user.saved_herbs:
                        return {'error':'Herb not found in saved herbs.'}, 404
            
            return unauth_error

    def delete(self, id, herb_id):
        user = get_first(User, 'id', id)
        if not user:
            return unfound_error('User')
        
        current_user = get_current_user()
        if user:
            if user.id == session.get('user_id') or current_user.admin == '1':
                herb = get_first(Herb, 'id', herb_id)
                if not herb:
                    return unfound_error('Herb')
                
                if herb:
                    if herb in user.saved_herbs:
                        user.saved_herbs.remove(herb)
                        db.session.commit()
                        return {'message': 'Herb removed from saved herbs.'}, 204

                    if herb not in user.saved_herbs:
                        return {'error':'Herb not found in saved herbs.'}, 404
        
            return unauth_error

api.add_resource(UserSavedRecipes, '/users/<int:id>/saved-recipes')
api.add_resource(UserSavedRecipesByID, '/users/<int:id>/saved-recipes/<int:recipe_id>')
api.add_resource(UserSavedHerbs, '/users/<int:id>/saved-herbs')
api.add_resource(UserSavedHerbsByID, '/users/<int:id>/saved-herbs/<int:herb_id>')