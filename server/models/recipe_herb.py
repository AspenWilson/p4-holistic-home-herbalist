from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates


from config import db

class RecipeHerb(db.Model):
    __tablename__ = 'recipe_herbs'

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.String)
    type = db.Column(db.String) 
    
    herb_id = db.Column(db.Integer, db.ForeignKey('herbs.id'))
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))
    
    herb = db.relationship('Herb', back_populates='recipe_herbs')
    recipe = db.relationship('Recipe', back_populates='recipe_herbs')

    types = ['Key Herb', 'Supporting Herb', 'Catalyst', 'Optional Catalyst', 'Balancing Herb', 'Optional Balancing Herb']