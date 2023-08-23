from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from datetime import datetime

from config import db

class Property(db.Model, SerializerMixin):
    __tablename__ = 'properties'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    entered_on = db.Column(db.DateTime, default=datetime.utcnow)
    entered_by = db.Column(db.Integer, db.ForeignKey('user.id'))

    herbs = db.relationship('Herb', back_populates='properties')
    recipes = db.relationship('Recipe', back_populates='properties')