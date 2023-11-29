from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from datetime import datetime

from config import db

class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'
    
    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String)
    entered_on = db.Column(db.DateTime, default=datetime.utcnow)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', back_populates='comments')

    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))
    recipe = db.relationship('Recipe', back_populates='comments')

    serialize_rules = ('-recipe.comments', '-recipe_id.recipe', '-recipe.herbs', '-recipe.directions', '-recipe.properties', '-recipe.ingredients', '-recipe.entered_on', '-recipe.id', '-user.saved_herbs', '-user.entered_herbs', '-user.entered_recipes', '-user.saved_recipes')

    @validates('comment')
    def validate_comment(self, key, comment):
        if not comment:
            raise ValueError('Comment is required.')
        
        return comment
        
    def __repr__(self):
        return f'Comment: {self.comment}'
    
    