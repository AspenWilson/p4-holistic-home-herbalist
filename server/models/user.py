from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from datetime import datetime

from config import db

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    account_created_on = db.Column(db.DateTime, default=datetime.utcnow)
    password = db.Column(db.String)
    admin = db.Column(db.Boolean, default=False)

    saved_herbs = db.Column(db.ARRAY(db.Integer)) 
    saved_recipes = db.Column(db.ARRAY(db.Integer)) 

    entered_herbs = db.relationship('Herb', back_populates='entered_by')
    entered_properties = db.relationship('Property', back_populates='entered_by')
    entered_recipes = db.relationship('Recipe', back_populates='entered_by')
    entered_comments = db.relationship('Comment', back_populates='entered_by')