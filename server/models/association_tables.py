from config import db


user_saved_herbs = db.Table('user_saved_herbs',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('herb_id', db.Integer, db.ForeignKey('herbs.id')),
)

user_saved_recipes = db.Table('user_saved_recipes',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('recipe_id', db.Integer, db.ForeignKey('recipes.id')),
)

herb_property_association = db.Table('herb_property_association',
    db.Column('herb_id', db.Integer, db.ForeignKey('herbs.id')),
    db.Column('property_id', db.Integer, db.ForeignKey('properties.id')),
)

herb_recipe_association = db.Table('herb_recipe_association',
    db.Column('herb_id', db.Integer, db.ForeignKey('herbs.id')),
    db.Column('recipe_id', db.Integer, db.ForeignKey('recipes.id')),
)

recipe_property_association = db.Table('recipe_property_association',
    db.Column('recipe_id', db.Integer, db.ForeignKey('recipes.id')),
    db.Column('property_id', db.Integer, db.ForeignKey('properties.id')),
)