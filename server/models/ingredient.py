from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates

from app import db

class Ingredient(db.Model, SerializerMixin):
    __tablename__ = 'ingredients'

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Integer)
    amount_type = db.Column(db.String)
    herb_type = db.Column(db.String) 
    
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)
    herb_id = db.Column(db.Integer, db.ForeignKey('herbs.id'), nullable=False)

    herb = db.relationship('Herb', back_populates='ingredients')
    recipe = db.relationship('Recipe', back_populates='ingredients')

    serialize_rules = ('-herb.recipes', '-herb.dosages', '-herb.entered_by', '-herb.properties', '-recipe', '-herb.latin_name', '-herb.description', '-herb.image_url', '-herb.entered_on', '-herb.ingredients', '-herb.warnings', '-herb.id')


    @validates('amount')
    def validate_amount(self, key, amount):
        if not amount:
            raise ValueError('Amount is required.')
        return amount
    
    @validates('amount_type')
    def validate_amount_type(self, key, amount_type):
        if not amount_type:
            raise ValueError('Amount type is required.')
        
        amount_types = ['Part(s)', 'Cup']
        if not any(type_option in amount_type for type_option in amount_types):
            raise ValueError('Amount type must be one from the list.')
        return amount_type
    
    @validates('herb_type')
    def validate_herb_type(self, key, herb_type):
        if not herb_type:
            raise ValueError('Herb type is required.')
        
        herb_types = ['Key Herb', 'Supporting Herb', 'Catalyst', 'Optional Catalyst', 'Balancing Herb', 'Optional Balancing Herb']
        if not any(type_option in herb_type for type_option in herb_types):
            raise ValueError('Herb type must be from the list.')
        
        return herb_type
        

    def __repr__(self):
        return f'{self.herb} for {self.recipe}: {self.amount} {self.amount_type}'