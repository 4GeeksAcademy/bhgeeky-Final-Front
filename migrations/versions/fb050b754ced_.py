"""empty message

Revision ID: fb050b754ced
Revises: 82d31c182180
Create Date: 2024-08-11 18:49:58.053705

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fb050b754ced'
down_revision = '82d31c182180'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('programador', schema=None) as batch_op:
        batch_op.alter_column('experiencia',
               existing_type=sa.VARCHAR(length=200),
               type_=sa.Enum('junior', 'mid-level', 'senior', name='experiencia_enum'),
               existing_nullable=False)
        batch_op.alter_column('rating',
               existing_type=sa.REAL(),
               type_=sa.Float(precision=2),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('programador', schema=None) as batch_op:
        batch_op.alter_column('rating',
               existing_type=sa.Float(precision=2),
               type_=sa.REAL(),
               existing_nullable=True)
        batch_op.alter_column('experiencia',
               existing_type=sa.Enum('junior', 'mid-level', 'senior', name='experiencia_enum'),
               type_=sa.VARCHAR(length=200),
               existing_nullable=False)

    # ### end Alembic commands ###
