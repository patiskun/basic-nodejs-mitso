import {v4 as uuid} from "uuid";
import {TUserModel, TUserResponse} from './user.type';

class User {
  id: string;

  name: string;

  email: string;

  password: string;

  salt: string;

  posts: string|null;

  comments: string|null;

  constructor({ id = uuid(), email = 'mail', name = 'patrego', password = 'P@55w0rd', salt = 'salt', posts = null, comments = null}:Partial<TUserModel> = {}) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.password = password;
    this.salt = salt;
    this.posts = posts;
    this.comments = comments;
  }

  static toResponse(user: TUserModel):TUserResponse {
    const { id, email, name, salt, posts, comments} = user;
    return { id, email, name, salt, posts, comments};
  }
}

export default User;
