from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from config import db

class Dosage(db.Model, SerializerMixin):
    __tablename__ = 'dosages'

    id = db.Column(db.Integer, primary_key=True)
    dosage_form = db.Column(db.String)  
    dosage_description = db.Column(db.String)

    herb_id = db.Column(db.Integer, db.ForeignKey('herbs.id'))
    
    herb = db.relationship('Herb', back_populates='dosages')

    serialize_rules=('-herb',)


    @validates('dosage_form')
    def validate_dosage_form(self, key, dosage_form):
        dosage_forms = ['Capsule', 'Capsule or Powder', 'Decoction - Southern','Decoction - Standard','Decoction - Weak', 'Dried', 'Dried Herb', 'Dried or Powdered', 'Dried Seed', 'Essential Oil', 'Extract - Fluid', 'Extract - Solid', 'Extract - Standardized', 'Fresh', 'Fresh Herb', 'Fresh Leaves', 'Fresh or Dried', 'Glycerite', 'Infusion - Cold', 'Infusion - Standard', 'Infusion - Strong', 'Infusion - Weak', 'Infusion - Wine', 'Juice', 'Oil', 'Oil & Salve', 'Powder', 'Syrup', 'Tea', 'Tincture', 'Topical Use']
        
        if not any(form in dosage_form for form in dosage_forms):
            raise ValueError('Dosage form must be selected from the existing list.')
        
        return dosage_form
    
    def __repr__(self):
        return f'Herb Dosage Form: {self.dosage_form}, ID: {self.id}'

