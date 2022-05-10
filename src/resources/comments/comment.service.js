const commentRepo = require('./comment.memory.repository')
const postRepo = require('../posts/post.memory.repository')
const userRepo = require('../users/user.memory.repository')

const getAll = () => commentRepo.getAll();
const getById = (id) => commentRepo.getById(id);
const createComment = ({ id, text, createdAt, userId, postId}) => commentRepo.createComment({ id, text, createdAt, userId, postId});
const deleteById = (id) => commentRepo.deleteById(id);
const updateById = ({ id, text, createdAt, userId, postId}) => commentRepo.updateById({ id, text, createdAt, userId, postId });

const getUserByCommentId = async (id) =>{
    const comment = await commentRepo.getById(id);
    const user = await userRepo.getByCommentId(comment.userId);
    return user;
}

const getPostByCommentId = async (id) =>{
    const comment = await commentRepo.getById(id);
    const post = await postRepo.getByCommentId(comment.postId);
    return post;
}

module.exports = { getAll, getById, createComment, deleteById, updateById,getUserByCommentId, getPostByCommentId };