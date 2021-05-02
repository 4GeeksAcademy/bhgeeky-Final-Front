"""empty message

Revision ID: 841fca382b44
Revises: 01004f40f1dc
Create Date: 2021-05-02 02:11:14.948638

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '841fca382b44'
down_revision = '01004f40f1dc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('pyme', sa.Column('id_tiposServicio', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'pyme', 'tiposServicio', ['id_tiposServicio'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'pyme', type_='foreignkey')
    op.drop_column('pyme', 'id_tiposServicio')
    # ### end Alembic commands ###
