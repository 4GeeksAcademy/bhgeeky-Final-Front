"""empty message

Revision ID: 01be9a3281bb
Revises: e35f5aede88f
Create Date: 2024-12-04 16:32:54.867018

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '01be9a3281bb'
down_revision = 'e35f5aede88f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('favorites',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('coin_id', sa.String(length=10), nullable=True),
    sa.Column('name', sa.String(length=20), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('symbol', sa.String(length=20), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('wallet',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('coin_id', sa.String(length=10), nullable=True),
    sa.Column('name', sa.String(length=100), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('symbol', sa.String(length=20), nullable=True),
    sa.Column('purchase_price', sa.String(length=20), nullable=True),
    sa.Column('purchase_quantity', sa.String(length=20), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('wallet')
    op.drop_table('favorites')
    # ### end Alembic commands ###