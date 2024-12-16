"""empty message

Revision ID: 9d064b3535cc
Revises: 
Create Date: 2024-12-13 21:33:22.807009

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9d064b3535cc'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=200), nullable=False),
    sa.Column('username', sa.String(length=200), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('funds', sa.Numeric(precision=10, scale=3), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('favorites',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('coin_id', sa.String(length=30), nullable=True),
    sa.Column('name', sa.String(length=20), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('symbol', sa.String(length=20), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('wallet',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=80), nullable=True),
    sa.Column('coin_id', sa.String(length=120), nullable=True),
    sa.Column('symbol', sa.String(length=20), nullable=True),
    sa.Column('purchase_price', sa.Numeric(precision=10, scale=3), nullable=True),
    sa.Column('purchase_quantity', sa.Numeric(precision=10, scale=3), nullable=True),
    sa.Column('purchase_date', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('wallet')
    op.drop_table('favorites')
    op.drop_table('user')
    # ### end Alembic commands ###