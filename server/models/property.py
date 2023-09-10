from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from datetime import datetime
from .association_tables import *

from config import db

class Property(db.Model, SerializerMixin):
    __tablename__ = 'properties'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    entered_on = db.Column(db.DateTime, default=datetime.utcnow)

    entered_by_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    entered_by = db.relationship('User', back_populates='entered_properties')   
    herbs = db.relationship('Herb', secondary='herb_property_association', back_populates='properties')
    
    recipes = db.relationship('Recipe', secondary='recipe_property_association', back_populates='properties')

    serialize_rules = ('-entered_by', '-herbs')


    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Property name is required.')
        
        existing_property = Property.query.filter_by(name=name).first()
        if existing_property:
            raise ValueError('Property exists.')

        return name
    
    @validates('description')
    def validate_description(self, key, description):
        if not description:
            raise ValueError('Property description is required.')
        
        return description
    
    def __repr__(self):
        return f'Property: {self.name}'