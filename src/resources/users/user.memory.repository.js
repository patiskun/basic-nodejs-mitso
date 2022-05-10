const User = require('./user.model')

const Users = [
  new User({email: 'mail', name: 'patrego', password: 'P@55w0rd', salt: 'salt', posts:null, comments:null }),
];
// id = uuid.v4(), email = 'mail', name = 'patrego', password = 'P@55w0rd', salt = 'salt', posts = [], comments = []
const getAll = async () => Users

const getById = async (id) => Users.find((user) => user.id === id);

const getByPostId = async (postId) => Users.find((user) => user.id === postId);
const getByCommentId = async (commentId) => Users.find((user)=> user.id === commentId);

const createUser = async ({ email, name, password, salt, posts, comments }) => {
  const user = new User({ email, name, password, salt, posts, comments });
  Users.push(user);
  return user;
};

const deleteById = async (id) => {
  const userPosition = Users.findIndex((user) => user.id === id);

  if (userPosition === -1) return null;

  const userDeletable = Users[userPosition];

  Users.splice(userPosition, 1);
  return userDeletable;
};

const updateById = async ({ id, email, name, password, salt, posts, comments }) => {
  const userPosition = Users.findIndex((user) => user.id === id);

  if (userPosition === -1) return null;

  const oldUser = Users[userPosition];
  const newUser = { ...oldUser, email, name, password, salt, posts, comments };

  Users.splice(userPosition, 1, newUser);
  return newUser;
};

  module.exports = {
    Users,
    getAll,
    getById,
    createUser,
    deleteById,
    updateById,
    getByPostId,
    getByCommentId
  };
