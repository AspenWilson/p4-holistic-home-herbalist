from flask_restful import Resource
from models.models import User, Recipe, Herb
from config import api, db
from flask import Flask, request, session, abort

class UserSavedRecipes(Resource):
    def get(self,id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return {'error': 'User not found'}, 404
        
        current_user = User.query.filter_by(id=session.get('user_id')).first()
        if user:
            if user.id == session.get('user_id') or current_user.admin == 1:
        
                saved_recipes = [saved_recipe.to_dict() for saved_recipe in user.saved_recipes]

                return saved_recipes, 200
            
            return {'error':'Unauthorized'}, 401

    def post(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return {'error': 'User not found'}, 404
        
        current_user = User.query.filter_by(id=session.get('user_id')).first()
        if user:
            if user.id == session.get('user_id') or current_user.admin == 1:
                data = request.get_json()
                recipe_id = data.get('recipe_id')

                if not recipe_id:
                    return {'error':'Missing recipe id.'}, 422
                
                recipe = Recipe.query.filter_by(id=recipe_id).first()

                if not recipe:
                    return {'error':'Recipe not found.'}, 404

                if recipe in user.saved_recipes:
                    return {'error': 'Recipe is already in your saved recipes.'}, 409
                
                user.saved_recipes.append(recipe)
                db.session.commit()

                response = recipe.to_dict(), 202
                return response
        
        return {'error':'Unauthorized'}, 401


class UserSavedRecipesByID(Resource):
    def get(self, id, recipe_id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return {'error': 'User not found'}, 404
        
        current_user = User.query.filter_by(id=session.get('user_id')).first()
        if user:
            if user.id == session.get('user_id') or current_user.admin == 1:
                saved_recipes = [saved_recipe.to_dict() for saved_recipe in user.saved_recipes]
                
                for recipe in saved_recipes:
                    if recipe['id'] ==recipe_id:
                        return recipe, 200

                    else:
                        return {'error':'Recipe not found in saved recipes.'}, 404
        
        return {'error':'Unauthorized'}, 401

    def delete(self, id, recipe_id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return {'error': 'User not found'}, 404
        
        current_user = User.query.filter_by(id=session.get('user_id')).first()
        if user:
            if user.id == session.get('user_id') or current_user.admin == 1:
                recipe = Recipe.query.filter_by(id=recipe_id).first()

                if recipe:
                    user.saved_recipes.remove(recipe)
                    db.session.commit()
                    return {'message': 'Recipe removed from saved recipes.'}, 204

                else:
                    return {'error': 'Herb is not a saved herb.'}, 404
        
            return {'error': 'Unauthorized'}, 401

                

class UserSavedHerbs(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return {'error': 'User not found'}, 404
        
        current_user = User.query.filter_by(id=session.get('user_id')).first()
        if user:
            if user.id == session.get('user_id') or current_user.admin == 1:
                saved_herbs = [saved_herb.to_dict() for saved_herb in user.saved_herbs]
                return saved_herbs, 200
            
            else:
                return {'error':'Unauthorized'}, 401

    def post(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return {'error': 'User not found'}, 404
        
        current_user = User.query.filter_by(id=session.get('user_id')).first()
        if user:
            if user.id == session.get('user_id') or current_user.admin == 1:
                data = request.get_json()
                herb_id = data.get('herb_id')

                if not herb_id:
                    return {'error':'Missing herb id.'}, 422
                
                herb = Herb.query.filter_by(id=herb_id).first()

                if not herb:
                    return {'error':'Herb not found.'}, 404

                if herb in user.saved_herbs:
                    return {'error': 'Herb is already in your saved herbs.'}, 409
                
                user.saved_herbs.append(herb)
                db.session.commit()

                response = herb.to_dict(), 202
                return response
            else:
                return {'error':'Unauthorized'}, 401

class UserSavedHerbsByID(Resource):
    def get(self, id, herb_id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return {'error': 'User not found'}, 404
        
        current_user = User.query.filter_by(id=session.get('user_id')).first()
        if user:
            if user.id == session.get('user_id') or current_user.admin == 1:
                saved_herbs = [saved_herb.to_dict() for saved_herb in user.saved_herbs]

                for herb in saved_herbs:
                    if herb['id'] == herb_id:
                        return herb, 200

                    else:
                        return {'error':'Herb not found in saved herbs.'}, 404
            
            return {'error': 'Unauthorized'}, 401

    def delete(self, id, herb_id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return {'error': 'User not found'}, 404
        
        current_user = User.query.filter_by(id=session.get('user_id')).first()
        if user:
            if user.id == session.get('user_id') or current_user.admin == 1:
                herb = Herb.query.get(herb_id)

                if herb:
                    user.saved_herbs.remove(herb)
                    db.session.commit()
                    return {'message': 'Herb removed from saved herbs.'}, 204

                else:
                    return {'error': 'Herb is not a saved herb.'}, 404
        
            return {'error': 'Unauthorized'}, 401

api.add_resource(UserSavedRecipes, '/users/<int:id>/saved-recipes')
api.add_resource(UserSavedRecipesByID, '/users/<int:id>/saved-recipes/<int:recipe_id>')
api.add_resource(UserSavedHerbs, '/users/<int:id>/saved-herbs')
api.add_resource(UserSavedHerbsByID, '/users/<int:id>/saved-herbs/<int:herb_id>')