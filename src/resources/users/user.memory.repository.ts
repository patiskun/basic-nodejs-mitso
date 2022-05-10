import { TUserModel, TUser } from './user.type';
// import {TComment, TCommentModel} from '../comments/comment.type';
import User from './user.model';

const USERS: TUserModel[] = [];

const getAll = async (): Promise<TUserModel[]> => USERS;

const getById = async (id: string): Promise<TUserModel | null> => USERS.find((user) => user.id === id)||null;

const getByPostId = async (postId: string): Promise<TUserModel | null>=> USERS.find((user) => user.posts === postId)|| null;
const getByCommentId = async (commentId: string): Promise<TUserModel| null> => USERS.find((user)=> user.comments === commentId)|| null;

const createUser = async ({ email, name, password, salt, posts, comments }:TUser):Promise<TUserModel> => {
  const user = new User({ email, name, password, salt, posts, comments });
  USERS.push(user);
  return user;
};

const deleteById = async (id: string) => {
  const userPosition = USERS.findIndex((user) => user.id === id);

  if (userPosition === -1) return null;

  const userDeletable = USERS[userPosition];

  USERS.splice(userPosition, 1);
  return userDeletable;
};

const updateById = async ({ id, email, name, password, salt, posts, comments }:TUserModel): Promise<TUserModel | null>=> {
  const userPosition = USERS.findIndex((user) => user.id === id);

  if (userPosition === -1) return null;

  const oldUser = USERS[userPosition];
  const newUser = { ...oldUser, email, name, password, salt, posts, comments, id };

  USERS.splice(userPosition, 1, newUser);
  return newUser;
};

  export default {
    USERS,
    getAll,
    getById,
    createUser,
    deleteById,
    updateById,
    getByPostId,
    getByCommentId
  };
