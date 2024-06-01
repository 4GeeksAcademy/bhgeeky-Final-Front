"""empty message

Revision ID: f7379489e257
Revises: a0aadd5cb108
Create Date: 2024-05-28 23:36:03.747376

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f7379489e257'
down_revision = 'a0aadd5cb108'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('discord', sa.String(), nullable=True))
        batch_op.drop_column('google_play')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('google_play', sa.VARCHAR(), autoincrement=False, nullable=True))
        batch_op.drop_column('discord')

    # ### end Alembic commands ###