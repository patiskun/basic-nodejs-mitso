const postsRepo = require('./post.memory.repository')
const usersRepo = require('../users/user.memory.repository')
const commentsRepo = require('../comments/comment.memory.repository')

const getAll = () => postsRepo.getAll();
const getById = (id) => postsRepo.getById(id);
const createPost = ({title, text, createdAt, userId, commentsId }) => postsRepo.createPost({title, text, createdAt, userId, commentsId })
const deleteById = async (id) =>{
    const postDeletable = await getById(id);
    postsRepo.deleteById(id);
    commentsRepo.removePostById(id);
    return postDeletable;
} 
const updateById = ({ id, title, text, createdAt, userId, commentsId}) => postsRepo.updateById({ id, title, text, createdAt, userId, commentsId})

const getUserByPostId = async (id) => {
    const post = await postsRepo.getById(id);
    const user = await usersRepo.getByPostId(post.userId);
    return user;
}

const getByCommentId = async (id) => {
    const post = await postsRepo.getById(id);
    const comment = await commentsRepo.getByPostId(post.commentsId);
    return comment;
}
module.exports = { getAll, getById, createPost, deleteById, updateById, getUserByPostId, getByCommentId}