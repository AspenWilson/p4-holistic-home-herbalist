from flask_restful import Resource
from models.models import User, Comment, Recipe
from config import api, db
from flask import request, session
from .helpers import get_current_user, get_all, get_first, unauth_error, unfound_error, unrelated_err

class Comments(Resource):
    def get(self):
        return get_all(Comment), 200   
    

class CommentsByID(Resource):
    def get(self, id):
        comment = get_first(Comment, 'id', id)
        if not comment:
            return unfound_error('Comment')
        
        return comment.to_dict(), 200

    def patch(self, id):
        comment = get_first(Comment, 'id', id)
        current_user = get_current_user()
        data = request.get_json()
        
        if not comment:
            return unfound_error('Comment')
        
        if comment.user_id != session.get('user_id') and current_user.admin !="1":
            return unauth_error
        
        comment.comment = data['comment']

        db.session.commit()
        return comment.to_dict(), 202

    def delete(self, id):
        comment = get_first(Comment, 'id', id)
        current_user = get_current_user()
        
        if not comment:
            return unfound_error('Comment')
        
        if comment.user_id != session.get('user_id') and current_user.admin !="1":
            return unauth_error
         
        db.session.delete(comment)
        db.session.commit()
        return {'message':'Comment deleted'}, 204
            

class UserComments(Resource):
    def get(self, id):
        user = get_first(User, 'id', id)
        current_user = get_current_user()
        
        if not user:
            return unfound_error('User')
        
        if user.id != session.get('user_id') and current_user.admin != "1":
            return unauth_error
                
        comments = [comment.to_dict() for comment in user.comments]
        return comments, 200
            
        
class UserCommentsByID(Resource):
    def get(self, id, comment_id):
        user = get_first(User, 'id', id)
        current_user = get_current_user()
        comment = get_first(Comment, 'id', comment_id)
        
        if not user or not comment:
            return unfound_error('Item')
        
        if user.id != session.get('user_id') and current_user.admin != "1":
            return unauth_error
                
        if comment.user_id is not user.id:
            return {'message':'This comment was not posted by this user. '}, 409
                
        response = comment.to_dict(), 200
        return response
            
    def patch(self, id, comment_id):
        user = get_first(User, 'id', id)
        data = request.get_json()
        current_user = get_current_user()
        comment = get_first(Comment, 'id', comment_id)
        
        if not user or not comment:
            return unfound_error('Item')
        
        if user.id != session.get('user_id') and current_user.admin != "1":
            return unauth_error
                
        if comment.user_id is not user.id:
            return {'message':'This comment was not posted by this user. '}, 409
                
        comment.comment = data['comment']
        
        db.session.commit()
        return comment.to_dict(), 202

    def delete(self, id, comment_id):
        user = get_first(User, 'id', id)
        comment = get_first(Comment, 'id', comment_id)
        current_user = get_current_user()
        
        if not user or not comment:
            return unfound_error('Item')
        
        if user.id != session.get('user_id') or current_user.admin != "1":
            return unauth_error
        
        db.session.delete(comment)
        db.session.commit()

        return {'message': 'Comment deleted.'}, 204
        

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
        
        if not recipe or not comment:
            return unfound_error('Item')
        
        if comment.recipe_id != id:
                return unrelated_err('Comment', 'Recipe') 
        
        return comment.to_dict(), 200
            
    def patch(self, id, comment_id):
        recipe = get_first(Recipe, 'id', id)
        comment = get_first(Comment, 'id', comment_id)
        current_user = get_current_user()
        data = request.get_json()
        
        if not recipe or not comment:
            return unfound_error('Recipe')
            
        if comment.recipe_id is not id:
            return unrelated_err('Comment', 'Recipe')
        
        if comment.user_id != session.get('user_id') and current_user.admin != "1":
            return unauth_error
        
        comment.comment = data['comment']
                        
        db.session.commit()
        return comment.to_dict(), 202
            
    def delete(self, id, comment_id):
        recipe = get_first(Recipe, 'id', id)
        comment = get_first(Comment, 'id', comment_id)
        current_user = get_current_user()
        
        if not recipe or not comment:
            return unfound_error('Item')
            
        if comment.recipe_id is not id:
                return unrelated_err('Comment', 'Recipe') 
        
        if comment.user_id != session.get('user_id') and current_user.admin != "1":
            return unauth_error
                
        db.session.delete(comment)
        db.session.commit()
        return {'message':'Comment deleted'}, 204
            

api.add_resource(Comments, '/api/comments')
api.add_resource(CommentsByID, '/api/comments/<int:id>')
api.add_resource(UserComments, '/api/users/<int:id>/comments')
api.add_resource(UserCommentsByID, '/api/users/<int:id>/comments/<int:comment_id>')
api.add_resource(RecipeComments, '/api/recipes/<int:id>/comments')
api.add_resource(RecipeCommentsByID, '/api/recipes/<int:id>/comments/<int:comment_id>')