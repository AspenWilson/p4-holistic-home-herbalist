"""Added email, image_url to User model

Revision ID: 1491b5675118
Revises: 27afb0b3f94c
Create Date: 2023-12-01 11:59:51.177426

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1491b5675118'
down_revision = '27afb0b3f94c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('email', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('image_url', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('image_url')
        batch_op.drop_column('email')

    # ### end Alembic commands ###