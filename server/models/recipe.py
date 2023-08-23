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
    entered_on = db.Column(db.DateTiem, default=datetime.utcnow)
    entered_by = db.Column(db.Integer, db.ForeignKey('user.id'))
    directions = db.Column(db.String)
    type = db.Column(db.String) 

    herbs = db.relationship('Herb', back_populates='recipes')
    properties = db.relationship('Property', back_populates='recipes')
    comments = db.relationship('Comment', back_populates='recipe')