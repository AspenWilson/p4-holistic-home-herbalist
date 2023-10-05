from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from datetime import datetime
from .association_tables import *

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    account_created_on = db.Column(db.DateTime, default=datetime.utcnow)
    _password_hash = db.Column(db.String)
    admin = db.Column(db.String, default=False)

    saved_herbs = db.relationship('Herb', secondary='user_saved_herbs', back_populates='saved_by')
    saved_recipes = db.relationship('Recipe', secondary='user_saved_recipes', back_populates='saved_by')

    entered_herbs = db.relationship('Herb', back_populates='entered_by')
    entered_recipes = db.relationship('Recipe', back_populates='entered_by')
    entered_properties = db.relationship('Property', back_populates='entered_by')
    comments = db.relationship('Comment', back_populates = 'user')

    # serialize_rules = ('-saved_herbs.entered_by', '-saved_recipes.ingredients', '-saved_recipes.comments', '-saved_recipes.properties', '-saved_recipes.directions', '-saved_recipes.herbs', '-saved_herbs.recipes', '-saved_herbs.ingredients', '-saved_recipes.entered_on', '-saved_herbs.entered_on', '-saved_herbs.entered_by_id', '-saved_recipes.entered_by_id', '-entered_herbs.entered_by', '-entered_recipes.entered_by', '-entered_herbs_entered_by_id', '-entered_recipes.entered_by_id')
    serialize_only = ('id', 'username', 'account_created_on', 'admin', 'saved_herbs.name', 'saved_herbs.id', 'saved_herbs.properties', 'saved_recipes.name', 'saved_recipes.id', 'saved_recipes.properties', 'entered_herbs.id', 'entered_herbs.name', 'entered_herbs.image_url', 'entered_herbs.latin_name', 'entered_herbs.properties', 'entered_recipes.name', 'entered_recipes.id', 'entered_recipes.properties', 'saved_herbs.image_url')

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    @validates('username')
    def validate_username(self, key, username):
        if not username:
            raise ValueError('Username is required.')
        
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            raise ValueError('Username is already taken.')
        return username

    def __repr__(self):
        return f"<Username={self.username}, ID: {self.id}>"