from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from datetime import datetime

from config import db

class Recipe(db.Model, SerializerMixin):
    __tablename__ = 'recipes'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    entered_on = db.Column(db.DateTime, default=datetime.utcnow)
    entered_by = db.Column(db.Integer, db.ForeignKey('user.id'))
    directions = db.Column(db.String)


    recipe_herbs = db.relationship('Herb', secondary='recipe_herbs', back_populates='recipes')
    properties = db.relationship('Property', secondary='recipe_herbs', viewonly=True)
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

    def combined_properties(self):
        recipe_properties = self.properties  

        for recipe_herb in self.recipe_herbs:
            herb_properties = recipe_herb.herb.properties
            recipe_properties.extend(herb_properties)

        deduplicated_properties = list(set(recipe_properties))

        return deduplicated_properties


    def __repr__(self):
        return f'Recipe: {self.name}, ID: {self.id}'        
