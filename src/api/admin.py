import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from .models import db, Users, Posts, Medias, Followers


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')
    admin.add_view(ModelView(Users, db.session))  
    admin.add_view(ModelView(Posts, db.session))
    admin.add_view(ModelView(Medias, db.session))
    admin.add_view(ModelView(Followers, db.session))
    # admin.add_view(ModelView(YourModelName, db.session))