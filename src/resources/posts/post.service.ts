import postsRepo from './post.memory.repository';
import usersRepo from '../users/user.memory.repository';
import commentsRepo from '../comments/comment.memory.repository'

import {TPost, TPostModel} from './post.type';
import {TUserModel} from '../users/user.type';
import {TCommentModel} from '../comments/comment.type';

const getAll = async (): Promise<TPostModel[]> => postsRepo.getAll();
const getById = async(id: string): Promise<TPostModel | null> => postsRepo.getById(id);
const createPost = ({title, text, createdAt, userId, commentsId }: TPost): Promise<TPostModel> => postsRepo.createPost({title, text, createdAt, userId, commentsId })
const deleteById = async (id: string): Promise<TPostModel| null> =>{
    const postDeletable = await getById(id);
    postsRepo.deleteById(id);
    commentsRepo.removePostById(id);
    return postDeletable;
} 
const updateById = async(post: TPostModel): Promise<TPostModel| null> => postsRepo.updateById(post);

const getUserByPostId = (id: string): Promise<TUserModel| null>=> {
    const user = usersRepo.getByPostId(id);
    return user;
}

const getByCommentId = async (id: string): Promise<TCommentModel| null> => {
    const comment = await commentsRepo.getByPostId(id);
    return comment;
}

export default { getAll, getById, createPost, deleteById, updateById, getUserByPostId, getByCommentId}