from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from datetime import datetime
from .association_tables import *

from config import db

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

    serialize_rules=('-herbs.recipes','-properties.recipes', '-comments.recipes', '-saved_by', '-entered_by.entered_recipes', '-entered_by.entered_herbs', '-entered_by.saved_recipes', '-entered_by.saved_herbs', '-ingredients.recipe', '-herbs.entered_on', '-herbs.dosages', '-herbs.ingredients', '-herbs.image_url', '-herbs.properties', '-herbs.description', '-properties.entered_on', '-comments.recipe', '-comments.user.entered_recipes', '-comments.user.saved_recipes', '-comments.user.saved_herbs', '-comments.user.entered_herbs', '-ingredients.herb.recipes', '-ingredients.herb.dosages', '-ingredients.herb.entered_by', '-ingredients.herb.properties', '-ingredients.herb.latin_name', '-ingredients.herb.description', '-ingredients.herb.entered_on', '-ingredients.herb.ingredients' )
    
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
