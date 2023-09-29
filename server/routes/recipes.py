from flask_restful import Resource
from config import api, db
from flask import request, session
from models.models import Recipe, Ingredient, Herb
from .helpers import get_all, get_current_user, get_first, unauth_error, unfound_error

class Recipes(Resource):
    def get(self):
        return get_all(Recipe), 200
    
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

        return new_recipe.to_dict(), 200

class RecipesByID(Resource):
    def get(self, id):
        recipe = get_first(Recipe,'id', id)

        if not recipe:
            return unfound_error('Recipe')
        
        return recipe.to_dict(), 200

    def patch(self,id):
        recipe = get_first(Recipe,'id', id)

        if not recipe:
            return unfound_error('Recipe')

        if recipe:
            current_user = get_current_user()
            if recipe.entered_by_id == session.get('user_id') or current_user.admin == '1':
                data = request.get_json()

                if 'ingredients' in data:
                    ingredients_data = data['ingredients']
                    for ingredient_data in ingredients_data:
                        new_ingredient = Ingredient(
                            herb_id = ingredient_data['herb_id'],
                            amount = ingredient_data['amount'],
                            amount_type = ingredient_data['amount_type'],
                            herb_type = ingredient_data['herb_type'],
                            recipe_id = recipe.id
                        )
                        recipe.ingredients.append(new_ingredient)
                        herb = get_first(Herb, 'id', ingredient_data['herb_id'])
                        if herb not in recipe.herbs:
                            recipe.herbs.append(herb)

                        for property in herb.properties:
                            if property not in recipe.properties:
                                recipe.properties.append(property)

                else:
                    for key in data.keys():
                        if key not in ['id', 'entered_by_id']:
                            setattr(recipe, key, data[key])
                            db.session.commit()
                            return recipe.to_dict(), 202
                        return unauth_error
            
                db.session.commit()
                return recipe.to_dict(), 202
            
            return unauth_error
    
    def delete(self, id):
        recipe = get_first(Recipe,'id', id)

        if not recipe:
            return unfound_error('Recipe')

        if recipe:
            current_user = get_current_user()
            if recipe.entered_by_id == session.get('user_id') or current_user.admin == '1':
                for ingredient in recipe.ingredients:
                    db.session.delete(ingredient)
                
                for comment in recipe.comments:
                    db.session.delete(comment)

                db.session.delete(recipe)
                db.session.commit()

                return {'message':'Recipe deleted'}, 204

            return unauth_error

    
api.add_resource(Recipes, '/recipes')
api.add_resource(RecipesByID, '/recipes/<int:id>')
