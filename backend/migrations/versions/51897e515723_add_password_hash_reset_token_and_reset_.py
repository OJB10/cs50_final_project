"""Add password_hash, reset_token, and reset_token_expiry to User model

Revision ID: 51897e515723
Revises: 9f6436fcf79f
Create Date: 2024-12-27 09:26:13.253965

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '51897e515723'
down_revision = '9f6436fcf79f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password_hash', sa.String(length=255), nullable=False))
        batch_op.add_column(sa.Column('reset_token', sa.String(length=100), nullable=True))
        batch_op.add_column(sa.Column('reset_token_expiry', sa.DateTime(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('reset_token_expiry')
        batch_op.drop_column('reset_token')
        batch_op.drop_column('password_hash')

    # ### end Alembic commands ###