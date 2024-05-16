"""empty message

Revision ID: 9501e8eb0bf8
Revises: c3ae743e9e4c
Create Date: 2024-05-16 14:08:55.661281

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9501e8eb0bf8'
down_revision = 'c3ae743e9e4c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_constraint('user_active_membership_id_fkey', type_='foreignkey')
        batch_op.drop_column('active_membership_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('active_membership_id', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.create_foreign_key('user_active_membership_id_fkey', 'user_membership_history', ['active_membership_id'], ['id'])

    # ### end Alembic commands ###