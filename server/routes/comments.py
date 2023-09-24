from flask_restful import Resource
from models.models import User, Comment, Recipe
from config import *
from flask import Flask, request, session
from .helpers import get_current_user, get_all, get_first, unauth_error, unfound_error, unrelated_err

class Comments(Resource):
    def get(self):
        return get_all(Comment), 200   
    

class CommentsByID(Resource):
    def get(self, id):
        comment = get_first(Comment, 'id', id)
        if comment:
            return comment.to_dict(), 200
        if not comment:
            return unfound_error('Comment')

    def patch(self, id):
        comment = get_first(Comment, 'id', id)
        data = request.get_json()
        
        if not comment:
            return unfound_error('Comment')
        
        current_user = get_current_user()
        if comment:
            if comment.user_id == session.get('user_id') or current_user.admin == '1':
                for key in data.keys():
                    if key not in ['id', 'user_id', 'recipe_id']:
                        setattr(comment, key, data[key])
                        db.session.commit() 
                        return comment.to_dict(), 201

            return unauth_error 

    def delete(self, id):
        comment = get_first(Comment, 'id', id)
        
        if not comment:
            return unfound_error('Comment')
        
        current_user = get_current_user()
        if comment:
            if comment.user_id == session.get('user_id') or current_user.admin == '1':
                db.session.delete(comment)
                db.session.commit()
                return {'message':'Comment deleted'}, 204
            
            return unauth_error 

class UserComments(Resource):
    def get(self, id):
        user = get_first(User, 'id', id)
        if not user:
            return unfound_error('User')
        
        current_user = get_current_user()
        if user:
            if user.id == session.get('user_id') or current_user.admin == '1':
                comments = [comment.to_dict() for comment in user.comments]
                return comments, 200
            
            return unauth_error
        
    
class UserCommentsByID(Resource):
    def get(self, id, comment_id):
        user = get_first(User, 'id', id)
        if not user:
            return unfound_error('User')
        
        current_user = get_current_user()
        if user:
            if user.id == session.get('user_id') or current_user.admin == '1':
                comment = get_first(Comment, 'id', comment_id)
                if not comment:
                    return unfound_error('Comment')
                
                if comment.user_id is not user.id:
                    return {'error':'This comment was not posted by this user. '}, 409
                
                if comment:
                    response = comment.to_dict(), 200
                    return response
            
            return unauth_error
    
    def patch(self, id, comment_id):
        user = get_first(User, 'id', id)
        if not user:
            return unfound_error('User')
        
        current_user = get_current_user()
        if user:
            if user.id == session.get('user_id') or current_user.admin == '1':
                comment = get_first(Comment, 'id', comment_id)
                if not comment:
                    return unfound_error('Comment')
                
                if comment.user_id is not user.id:
                    return {'error':'This comment was not posted by this user. '}, 409
                
                if comment.user_id == user.id :
                    data = request.get_json()
                    for key in data.keys():
                        if key not in ['id', 'user_id', 'recipe_id']:
                            setattr(comment, key, data[key])
                            db.session.commit()
                            return comment.to_dict(), 202

            return unauth_error  

    def delete(self, id, comment_id):
        user = get_first(User, 'id', id)
        if not user:
            return unfound_error('User')
        
        comment = get_first(Comment, 'id', comment_id)
        
        if not comment:
            return unfound_error('Comment')
        
        current_user = get_current_user()
        if comment:
            if comment.user_id == session.get('user_id') or current_user.admin == '1':
                db.session.delete(comment)
                db.session.commit()

                return {'message': 'Comment deleted.'}, 204
        
        return unauth_error 

class RecipeComments(Resource):
    def get(self, id):
        recipe = get_first(Recipe, 'id', id)
        recipe_comments = [comment.to_dict() for comment in recipe.comments]

        return recipe_comments, 200

    def post(self, id):
        recipe = get_first(Recipe, 'id', id)
        data = request.get_json()

        if not recipe:
            return unfound_error('Recipe')
        
        if recipe:
            new_comment = Comment(
                user_id = session.get('user_id'),
                comment = data['comment'],
                recipe_id = id
            )
            db.session.add(new_comment)
            db.session.commit()

            return new_comment.to_dict(), 202

class RecipeCommentsByID(Resource):
    def get(self, id, comment_id):
        recipe = get_first(Recipe, 'id', id)
        comment = get_first(Comment, 'id', comment_id)
        if not recipe:
            return unfound_error('Recipe')
        
        if not comment:
            return unfound_error('Comment')
        
        if recipe:
            if comment.recipe_id == id:
                return comment.to_dict(), 200
            
            else:
                return unrelated_err('Comment', 'Recipe') 
        

    def patch(self, id, comment_id):
        recipe = get_first(Recipe, 'id', id)
        comment = get_first(Comment, 'id', comment_id)
        current_user = get_current_user()
        if not recipe:
            return unfound_error('Recipe')
        
        if recipe:
            if not comment:
                return unfound_error('Comment')
            
            if comment.recipe_id is not id:
                return unrelated_err('Comment', 'Recipe') 
            
            if comment.user_id == session.get('user_id') or current_user.admin == '1':
                data = request.get_json()
                for key in data.keys():
                    if key not in ['id', 'user_id', 'recipe_id']:
                        setattr(comment, key, data[key])
                        db.session.commit()
                        return comment.to_dict(), 202
            
            return unauth_error
            

    def delete(self, id, comment_id):
        recipe = get_first(Recipe, 'id', id)
        comment = get_first(Comment, 'id', comment_id)
        current_user = get_current_user()
        if not recipe:
            return unfound_error('Recipe')
        
        if recipe:
            if not comment:
                return unfound_error('Comment')
            
            if comment.recipe_id is not id:
                return unrelated_err('Comment', 'Recipe') 
            
            if comment.user_id == session.get('user_id') or current_user.admin == '1':
                db.session.delete(comment)
                db.session.commit()
                return {'message':'Comment deleted'}, 204
            
            return unauth_error

api.add_resource(Comments, '/comments')
api.add_resource(CommentsByID, '/comments/<int:id>')
api.add_resource(UserComments, '/users/<int:id>/comments')
api.add_resource(UserCommentsByID, '/users/<int:id>/comments/<int:comment_id>')
api.add_resource(RecipeComments, '/recipes/<int:id>/comments')
api.add_resource(RecipeCommentsByID, '/recipes/<int:id>/comments/<int:comment_id>')