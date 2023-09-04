"""Updated all models, created association_tables.py file with 5 tables

Revision ID: f8efb88fc479
Revises: e71f83323bb5
Create Date: 2023-09-01 15:54:10.107020

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f8efb88fc479'
down_revision = 'e71f83323bb5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('dosages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('dosage_form', sa.String(), nullable=True),
    sa.Column('dosage_description', sa.String(), nullable=True),
    sa.Column('herb_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['herb_id'], ['herbs.id'], name=op.f('fk_dosages_herb_id_herbs')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('herb_recipe_association',
    sa.Column('herb_id', sa.Integer(), nullable=True),
    sa.Column('recipe_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['herb_id'], ['herbs.id'], name=op.f('fk_herb_recipe_association_herb_id_herbs')),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipes.id'], name=op.f('fk_herb_recipe_association_recipe_id_recipes'))
    )
    op.create_table('ingredients',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('amount', sa.Integer(), nullable=True),
    sa.Column('amount_type', sa.String(), nullable=True),
    sa.Column('herb_type', sa.String(), nullable=True),
    sa.Column('recipe_id', sa.Integer(), nullable=False),
    sa.Column('herb_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['herb_id'], ['herbs.id'], name=op.f('fk_ingredients_herb_id_herbs')),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipes.id'], name=op.f('fk_ingredients_recipe_id_recipes')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('recipe_property_association',
    sa.Column('recipe_id', sa.Integer(), nullable=True),
    sa.Column('property_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['property_id'], ['properties.id'], name=op.f('fk_recipe_property_association_property_id_properties')),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipes.id'], name=op.f('fk_recipe_property_association_recipe_id_recipes'))
    )
    op.create_table('user_saved_herbs',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('herb_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['herb_id'], ['herbs.id'], name=op.f('fk_user_saved_herbs_herb_id_herbs')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_user_saved_herbs_user_id_users'))
    )
    op.create_table('user_saved_recipes',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('recipe_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipes.id'], name=op.f('fk_user_saved_recipes_recipe_id_recipes')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_user_saved_recipes_user_id_users'))
    )
    op.drop_table('recipe_herbs')
    op.drop_table('herb_dosages')
    with op.batch_alter_table('comments', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=True))
        batch_op.drop_constraint('fk_comments_entered_by_id_users', type_='foreignkey')
        batch_op.create_foreign_key(batch_op.f('fk_comments_user_id_users'), 'users', ['user_id'], ['id'])
        batch_op.drop_column('entered_by_id')

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('saved_recipes')
        batch_op.drop_column('saved_herbs')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('saved_herbs', sa.VARCHAR(), nullable=True))
        batch_op.add_column(sa.Column('saved_recipes', sa.VARCHAR(), nullable=True))

    with op.batch_alter_table('comments', schema=None) as batch_op:
        batch_op.add_column(sa.Column('entered_by_id', sa.INTEGER(), nullable=True))
        batch_op.drop_constraint(batch_op.f('fk_comments_user_id_users'), type_='foreignkey')
        batch_op.create_foreign_key('fk_comments_entered_by_id_users', 'users', ['entered_by_id'], ['id'])
        batch_op.drop_column('user_id')

    op.create_table('herb_dosages',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('dosage_form', sa.VARCHAR(), nullable=True),
    sa.Column('dosage_description', sa.VARCHAR(), nullable=True),
    sa.Column('herb_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['herb_id'], ['herbs.id'], name='fk_herb_dosages_herb_id_herbs'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('recipe_herbs',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('amount', sa.INTEGER(), nullable=True),
    sa.Column('amount_type', sa.VARCHAR(), nullable=True),
    sa.Column('herb_type', sa.VARCHAR(), nullable=True),
    sa.Column('herb_id', sa.INTEGER(), nullable=True),
    sa.Column('recipe_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['herb_id'], ['herbs.id'], name='fk_recipe_herbs_herb_id_herbs'),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipes.id'], name='fk_recipe_herbs_recipe_id_recipes'),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('user_saved_recipes')
    op.drop_table('user_saved_herbs')
    op.drop_table('recipe_property_association')
    op.drop_table('ingredients')
    op.drop_table('herb_recipe_association')
    op.drop_table('dosages')
    # ### end Alembic commands ###