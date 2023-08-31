from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from datetime import datetime

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    account_created_on = db.Column(db.DateTime, default=datetime.utcnow)
    _password_hash = db.Column(db.String)
    admin = db.Column(db.String, default=False)

    saved_herbs = db.Column(db.ARRAY(db.Integer), defualt=None) 
    saved_recipes = db.Column(db.ARRAY(db.Integer), default=None) 

    entered_herbs = db.relationship('Herb', back_populates='entered_by')
    entered_properties = db.relationship('Property', back_populates='entered_by')
    entered_recipes = db.relationship('Recipe', back_populates='entered_by')
    entered_comments = db.relationship('Comment', back_populates='entered_by')

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