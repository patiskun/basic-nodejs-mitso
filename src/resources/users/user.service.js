const usersRepo = require('./user.memory.repository');
const postsRepo = require('../posts/post.memory.repository');
const commentsRepo = require('../comments/comment.memory.repository')

const getAll = () => usersRepo.getAll();
const getById = (id) => usersRepo.getById(id);
const createUser = ({ email, name, password, salt, posts, comments }) =>
  usersRepo.createUser({ email, name, password, salt, posts, comments });
const deleteById = async (id) => {
  const userDeletable = await getById(id);
  usersRepo.deleteById(id);
  postsRepo.removeUserById(id);
  commentsRepo.removeUserById(id);
  return userDeletable;
};

const getAllPostsByUserId = (id) => postsRepo.getByUserId(id);
const getAllCommentsByUserId = (id) => commentsRepo.getByUserId(id);

const updateById = ({ id, email, name, password, salt, posts, comments }) =>
  usersRepo.updateById({ id, email, name, password, salt, posts, comments });

module.exports = { getAll, getById, createUser, deleteById, updateById, getAllCommentsByUserId, getAllPostsByUserId };
