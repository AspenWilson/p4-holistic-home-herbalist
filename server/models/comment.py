from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from datetime import datetime

from config import db

class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'
    
    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String)
    entered_on = db.Column(db.DateTime, defaut=datetime.utcnow)
    
    entered_by = db.Column(db.Integer, db.ForeignKey('user.id'))
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'))

    @validates('comment')
    def validate_comment(self, key, comment):
        if not comment:
            raise ValueError('Comment is required.')
        
        return comment
        
    def __repr__(self):
        return f'Comment: {self.comment}'