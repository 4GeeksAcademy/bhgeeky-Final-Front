from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    first_name = db.Column(db.String(), unique=False, nullable=False)
    phone = db.Column(db.String(), unique=True, nullable=False)

    def __repr__(self):
        return f'<User: {self.email} - {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "is_active": self.is_active,
            "phone": self.phone}
    

class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(), unique=False, nullable=False)
    description = db.Column(db.String(), unique=False, nullable=False)
    body = db.Column(db.String(), unique=False, nullable=False)
    date = db.Column(db.String(), unique=False, nullable=False)
    image_url = db.Column(db.String(), unique=False, nullable=False)
    user_id = db.Column(db.Interger, db.Foreign_Key('user.id'))
    user_to = db.relationship('Users', foreign_keys=[user.id], backref=db.backref('posts_to', lazy='select'))

    def __repr__(self):
        return f'<Post: {self.id} - {self.title}>'


class Medias(db.Model):
    id = db.Column(db.Interger, primary_key=True)
    media_type = db.Column(db.Enum('image', 'video', 'podcas', name='media_type'), unique=False, nullable= False)
    url = db.Column(db.Column(db.String(), unique=False, nullable=False))
    post_id = db.Column(db.Interger, db.Foreign_Key('post.id'))
    post_to = db.relationship('Posts', foreign_keys=[post.id], backref=db.backref('media_to', lazy='select'))


class Followers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    follower_to = db.relationship('Users', foreign_keys=[follower_id], backref=db.backref('followers_to', lazy='select'))
    following_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    following_to = db.relationship('Users', foreign_keys=[following_id], backref=db.backref('followings_to', lazy='select'))

    def __repr__(self):
        return f'<Follower: {self.follower_id} - Following {self.following_id}>'