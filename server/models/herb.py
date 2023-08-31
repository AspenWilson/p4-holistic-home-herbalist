from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from datetime import datetime

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
    
    entered_by = db.Column(db.Integer, db.ForeignKey('user.id'))
    
    properties = db.relationship('Property', back_populates='herbs')
    recipe_herbs = db.relationship('RecipeHerb', back_populates='herb')
    dosages = db.relationship('HerbDosage', back_populates='herb')

