from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from datetime import datetime
from .association_tables import *

from app import db

class Recipe(db.Model, SerializerMixin):
    __tablename__ = 'recipes'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    entered_on = db.Column(db.DateTime, default=datetime.utcnow)
    directions = db.Column(db.String)

    entered_by_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    entered_by = db.relationship('User', back_populates='entered_recipes')
    
    ingredients = db.relationship('Ingredient',back_populates='recipe', cascade='all, delete-orphan')
    
    saved_by = db.relationship('User', secondary='user_saved_recipes', back_populates='saved_recipes')

    properties = db.relationship('Property', secondary='recipe_property_association', back_populates='recipes')

    herbs = db.relationship('Herb', secondary='herb_recipe_association', back_populates='recipes')
    
    comments = db.relationship('Comment', back_populates='recipe', cascade='all, delete-orphan')

    serialize_rules=('-herbs.recipes','-properties.recipes', '-comments.recipes', '-saved_by', '-entered_by', '-ingredients.recipe', '-ingredients.herb', '-herbs.entered_on', '-herbs.dosages', '-herbs.ingredients', '-herbs.image_url', '-herbs.properties', '-herbs.description', '-properties.entered_on', '-properties.description')
    
    @property
    def unique_properties(self):
        unique_property_ids = set()
        for herb in self.herbs:
            unique_property_ids.update(herb.properties)
        return list(unique_property_ids)


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
