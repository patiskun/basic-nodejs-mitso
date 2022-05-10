import commentRepo from './comment.memory.repository';
import postRepo from '../posts/post.memory.repository';
import userRepo from '../users/user.memory.repository';

import {TComment, TCommentModel} from './comment.type';
import {TUserModel} from '../users/user.type';
import {TPostModel} from '../posts/post.type';

const getAll = async(): Promise<TCommentModel[]>=> commentRepo.getAll();
const getById = async(id: string):Promise<TCommentModel|null> => commentRepo.getById(id);
const createComment = ({text, createdAt, userId, postId}: TComment): Promise<TCommentModel>=> 
commentRepo.createComment({text, createdAt, userId, postId});
const deleteById = async(id:string): Promise<TCommentModel| null> => commentRepo.deleteById(id);
const updateById = async(comment:TCommentModel):Promise<TCommentModel | null>=> commentRepo.updateById(comment);

const getUserByCommentId = async(id: string):Promise<TUserModel| null> =>{
    // const comment = commentRepo.getById(id);
    // const user = userRepo.getByCommentId(comment.userId);
    const user = userRepo.getByCommentId(id);
    return user;
}

const getPostByCommentId = async(id:string): Promise<TPostModel| null> =>{
    // const comment = commentRepo.getById(id);
    // const post = postRepo.getByCommentId(comment.postId);
    const post = postRepo.getByCommentId(id);
    return post;
}

export default{ getAll, getById, createComment, deleteById, updateById,getUserByCommentId, getPostByCommentId };