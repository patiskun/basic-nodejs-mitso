import usersRepo from './user.memory.repository';
import postsRepo from '../posts/post.memory.repository';
import commentsRepo from '../comments/comment.memory.repository';
import {TUserModel, TUser} from './user.type';

const getAll = async (): Promise<TUserModel[]> => usersRepo.getAll();
const getById = async(id: string): Promise<TUserModel | null> => usersRepo.getById(id);
const createUser = async(user:TUser): Promise<TUserModel> => usersRepo.createUser(user);
const deleteById = async (id: string):Promise<TUserModel | null> => {
  const userDeletable = await getById(id);
  usersRepo.deleteById(id);
  postsRepo.removeUserById(id);
  commentsRepo.removeUserById(id);
  return userDeletable;
};

const getAllPostsByUserId = (id: string) => postsRepo.getByUserId(id);
const getAllCommentsByUserId = (id: string) => commentsRepo.getByUserId(id);

const updateById = async(user:TUserModel): Promise<TUserModel | null> => usersRepo.updateById(user);

export default { getAll, getById, createUser, deleteById, updateById, getAllCommentsByUserId, getAllPostsByUserId };
