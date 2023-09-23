from flask_restful import Resource
from models.models import User, Comment, Recipe
from config import *
from flask import Flask, request, session

class Comments(Resource):
    def get(self):
        all_comments = [comment.to_dict() for comment in Comment.query.all()]
        return all_comments, 200
    

class CommentsByID(Resource):
    def get(self, id):
        comment = Comment.query.filter_by(id=id).first()
        return comment.to_dict(), 200

    def patch(self, id):
        comment = Comment.query.filter_by(id=id).first()
        data = request.get_json()
        
        if not comment:
            return {'error':'Comment not found'}, 404
        
        current_user = User.query.filter_by(id=session.get('user_id')).first()
        if comment:
            if comment.entered_by_id == session.get('user_id') or current_user.admin == 1:
                for attr, value in data.items():
                    setattr(comment, attr, value)

                db.session.commit() 
                response = comment.to_dict(), 201
                return response

            return {'error':'Unauthorized'}, 404  

    def delete(self, id):
        comment = Comment.query.filter_by(id=id).first()
        
        if not comment:
            return {'error':'Comment not found'}, 404
        
        current_user = User.query.filter_by(id=session.get('user_id')).first()
        if comment:
            if comment.entered_by_id == session.get('user_id') or current_user.admin == 1:
                db.session.delete(comment)
                return {'message':'Comment deleted'}, 204
            
            return {'error':'Unauthorized'}, 401 

class UserComments(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return {'error': 'User not found'}, 404
        
        current_user = User.query.filter_by(id=session.get('user_id')).first()
        if user:
            if user.id == session.get('user_id') or current_user.admin == 1:
                comments = [comment.to_dict() for comment in user.comments]
                return comments, 200
            
            return {'error':'Unauthorized'}, 401
        
    
class UserCommentsByID(Resource):
    def get(self, id, comment_id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return {'error': 'User not found'}, 404
        
        current_user = User.query.filter_by(id=session.get('user_id')).first()
        if user:
            if user.id == session.get('user_id') or current_user.admin == 1:
                comment = Comment.filter_by(id=comment_id).first()
                if not comment:
                    return {'error':'Comment not found.'}, 404
                
                if comment.entered_by_id is not user.id:
                    return {'error':'This comment was not posted by this user. '}, 409
                
                if comment:
                    response = comment.to_dict(), 200
                    return response
            
            return {'error':'Unauthorized'}, 401
    
    def patch(self, id, comment_id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return {'error': 'User not found'}, 404
        
        current_user = User.query.filter_by(id=session.get('user_id')).first()
        if user:
            if user.id == session.get('user_id') or current_user.admin == 1:
                comment = Comment.filter_by(id=comment_id).first()
                if not comment:
                    return {'error':'Comment not found.'}, 404
                
                if comment.entered_by_id is not current_user.id:
                    return {'error':'This comment was not posted by this user. '}, 409
                
                if comment.entered_by_id == current_user.id:
                    data = request.get_json()
                    for attr, value in data.items():
                        setattr(comment, attr, value)
                
                        db.session.commit()

                response= comment.to_dict(), 202
                return response

            return {'error':'Unauthorized'}, 401  

    def delete(self, id, comment_id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return {'error': 'User not found'}, 404
        
        comment = Comment.query.filter_by(id=comment_id).first()
        
        if not comment:
            return {'error': 'Comment not found.'}, 404
        
        current_user = User.query.filter_by(id=session.get('user_id')).first()
        if comment:
            if comment.entered_by_id == session.get('user_id') or current_user.admin == 1:
                db.session.delete(comment)
                db.session.commit()

                return {'message': 'Comment deleted.'}, 204
        
        return {'error': 'Unauthorized'}, 401 

class RecipeComments(Resource):
    def get(self, id):
        recipe = Recipe.query.filter_by(id=id).first()
        recipe_comments = [comment.to_dict() for comment in recipe.comments]

        return recipe_comments, 200

    def post(self, id):
        recipe = Recipe.query.filter_by(id=id).first()

        data = request.get_json()

        if not recipe:
            return {'error':'Recipe not found.'}, 404
        
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
        recipe = Recipe.query.filter_by(id=id).first()
        comment = Comment.query.filter_by(id=comment_id).first()
        if not recipe:
            return {'error':'Recipe not found.'}, 404
        
        if not comment:
            return {'error':'Comment not found'}, 404
        
        if recipe:
            if comment.recipe_id == id:
                return comment.to_dict(), 200
            
            else:
                return {'error':'Comment is not for this recipe.'}, 409
        

    def patch(self, id, comment_id):
        recipe = Recipe.query.filter_by(id=id).first()
        comment = Comment.query.filter_by(id=comment_id)
        current_user = User.query.filter_by(id=session.get('user_id')).first()
        if not recipe:
            return {'error':'Recipe not found.'}, 404
        
        if recipe:
            if not comment:
                return {'error':'Comment not found'}, 404
            
            if comment.recipe_id is not id:
                return {'error':'Comment is not for this recipe'}, 409
            
            if comment.entered_by_id == session.get('user_id') or current_user.admin == 1:
                data = request.get_json()
                for attr, value in data.items():
                    setattr(comment, attr, value)
                    db.session.commit()
                    return comment.to_dict(), 204
            
            else:
                return {'error':'Unauthorized'}, 401
            

    def delete(self, id, comment_id):
        recipe = Recipe.query.filter_by(id=id).first()
        comment = Comment.query.filter_by(id=comment_id)
        current_user = User.query.filter_by(id=session.get('user_id')).first()
        if not recipe:
            return {'error':'Recipe not found.'}, 404
        
        if recipe:
            if not comment:
                return {'error':'Comment not found'}, 404
            
            if comment.recipe_id is not id:
                return {'error':'Comment is not for this recipe'}, 409
            
            if comment.entered_by_id == session.get('user_id') or current_user.admin == 1:
                db.session.delete(comment)
                return {'message':'Comment deleted'}, 204
            
            else:
                return {'error':'Unauthorized'}, 401

api.add_resource(Comments, '/comments')
api.add_resource(CommentsByID, 'comments/<int:id>')
api.add_resource(UserComments, '/users/<int:id>/comments')
api.add_resource(UserCommentsByID, '/users/<int:id>/comments/<int:comment_id>')
api.add_resource(RecipeComments, '/recipes/<int:id>/comments')
api.add_resource(RecipeCommentsByID, '/recipes/<int:id>/comments/<int:comment_id>')