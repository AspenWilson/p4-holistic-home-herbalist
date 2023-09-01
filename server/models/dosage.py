from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from datetime import datetime

from config import db

class Dosage(db.Model, SerializerMixin):
    __tablename__ = 'dosages'

    id = db.Column(db.Integer, primary_key=True)
    dosage_form = db.Column(db.String)  
    dosage_description = db.Column(db.String)

    herb_id = db.Column(db.Integer, db.ForeignKey('herbs.id'))
    
    herb = db.relationship('Herb', back_populates='dosages')


    @validates('dosage_form')
    def validate_dosage_form(self, key, dosage_form):
        dosage_forms = ['Capsule', 'Capsule or Powder', 'Decoction - Southern','Decoction - Standard','Decoction - Weak', 'Dried', 'Dried Herb', 'Dried or Powdered', 'Dried Seed', 'Essential Oil', 'Extract - Fluid', 'Extract - Solid', 'Extract - Standardized', 'Fresh', 'Fresh Herb', 'Fresh Leaves', 'Fresh or Dried', 'Gycerite', 'Infusion - Cold', 'Infusion - Standard', 'Infusion - Strong', 'Infusion - Weak', 'Infusion - Wine', 'Juice', 'Oil', 'Oil & Salve', 'Powder', 'Syrup', 'Tea', 'Tincture', 'Topical Use']

        if not dosage_form:
            raise ValueError('Dosage form is required.')
        
        if not any(form in dosage_form for form in dosage_forms):
            raise ValueError('Dosage form must be selected from the existing list.')
        
        return dosage_form
    
    @validates('dosage_description')
    def validate_dosage_description(self, key, dosage_description):
        if not dosage_description:
            raise ValueError('Dosage description is required.')
        
        return dosage_description
    
    def __repr__(self):
        return f'Herb Dosage Form: {self.dosage_form}, ID: {self.id}'

