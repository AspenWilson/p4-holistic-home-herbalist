from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from datetime import datetime

from config import db

class Recipe(db.Model, SerializerMixin):
    __tablename__ = 'recipes'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    entered_on = db.Column(db.DateTime, default=datetime.utcnow)
    entered_by = db.Column(db.Integer, db.ForeignKey('user.id'))
    directions = db.Column(db.String)
    type = db.Column(db.String) 

    recipe_herbs = db.relationship('RecipeHerb', back_populates='recipe')
    properties = db.relationship('Property', back_populates='recipes')
    comments = db.relationship('Comment', back_populates='recipe')

    @validates('name')
    def validate_title(self, key, name):
        if not name:
            raise ValueError('Recipe name is required.')
        
        return name
    
    @validates('directions')
    def validate_instructions(self,key, directions):
        if not directions:
            raise ValueError("Directions are required.")
        if len(directions) < 50: 
            raise ValueError("Directions must be at least 50 characters long.")
        
        return directions

    @validates('type')
    def validate_type(self, key, type):
        types = ['Bulk Herb', 'Capsule', 'Capsule & Powder', 'Decoction - Standard','Decoction - Weak', 'Dried Seed', 'Essential Oil', 'Fresh Herb', 'Fresh Juice', 'Gycerite', 'Infusion - Cold', 'Infusion - Strong', 'Infusion - Weak', 'Oil & Salve', 'Powder', 'Standardized Extract', 'Tea', 'Tincture', 'Topical Use']
        
        if not type:
            raise ValueError('Recipe must have a type.')
        
