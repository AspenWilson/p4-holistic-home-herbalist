from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from datetime import datetime
from .association_tables import *

from config import db

class Herb(db.Model, SerializerMixin):
    __tablename__ = 'herbs'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    latin_name = db.Column(db.String)
    description = db.Column(db.String)
    warnings = db.Column(db.String)
    image_url = db.Column(db.String)
    entered_on = db.Column(db.DateTime, default=datetime.utcnow)

    entered_by = db.relationship('User', back_populates='entered_herbs')
    entered_by_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    properties = db.relationship('Property', secondary='herb_property_association', back_populates='herbs')
    
    recipes = db.relationship('Recipe', secondary='herb_recipe_association', back_populates='herbs')

    saved_by = db.relationship('User', secondary='user_saved_herbs', back_populates='saved_herbs')
    
    dosages = db.relationship('Dosage', back_populates='herb', cascade='all, delete-orphan')
    ingredients = db.relationship('Ingredient', back_populates='herb')

    serialize_rules = ('-recipes.herbs', '-saved_by', '-entered_by', '-properties.entered_on', '-properties.recipes', '-dosages.herb', '-dosages.herb_id','-recipes')

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Herb name is required')
        
        existing_herb = Herb.query.filter_by(name=name).first()
        if existing_herb:
            raise ValueError('Herb already exists.')
        
        return name
    
    @validates('latin_name', 'description', 'warnings')
    def validate_presence(self, key, value):
        if not value:
            raise ValueError('Herb {key} is required')
        
        return value

    @validates('image_url')
    def validate_image_url(self, key, image_url):
        if not image_url:
            image_url = 'https://www.nicepng.com/png/detail/265-2650267_organic-organic-herb-logo.png'

        return image_url

    def __repr__(self):
        return f'Herb: {self.name}, Herb ID: {self.id}'

