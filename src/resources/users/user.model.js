const uuid = require('uuid');

class User {
  constructor({ id = uuid.v4(), email = 'mail', name = 'patrego', password = 'P@55w0rd', salt = 'salt', posts = [], comments = []} = {}) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.password = password;
    this.salt = salt;
    this.posts = posts;
    this.comments = comments;
  }

  static toResponse(user) {
    const { id, email, name, password, salt, posts, comments} = user;
    return { id, email, name, password, salt, posts, comments};
  }
}

module.exports = User;
