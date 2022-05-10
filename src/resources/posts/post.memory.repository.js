const Post = require('./post.model')

const Posts = [new Post()];

const getAll = async () => Posts;
const getById = async (id) => Posts.find((post)=> post.id === id);

const getByUserId = async (id) => Posts.find((post) => post.userId === id);
const getByCommentId = async (id) => Posts.find((post)=>post.id === id)

// const getByCommentId = async (id) => Posts.filter((post) => post.commentsId === id)

const createPost = async ({title, text, createdAt, userId, commentsId }) => {
    const post = new Post({title, text, createdAt, userId, commentsId });
    Posts.push(post);
    return post;
};

const deleteById = async (id) => {
    const postPosition = Posts.findIndex(post => post.id === id);
    if(postPosition === -1) return null;

    const postDeleted = Posts[postPosition];

    Posts.splice(postPosition, 1);
    return postDeleted;
}

const updateById = async({
    id,
    title,
    text,
    createdAt,
    userId,
    commentsId,
}) => {
    const postPosition = Posts.findIndex(post => post.id === id);
    if(postPosition === -1) return null;

    const oldPost=Posts[postPosition];
    const newPost = {
        ...oldPost,
        title,
        text,
        createdAt,
        userId,
        commentsId,
    }
    Posts.splice(postPosition, 1, newPost);
    return newPost;
}

const removeUserById = async (id) => {
    const userPosts = Posts.filter((post) => post.userId === id);

    await Promise.allSettled(
        userPosts.map(async (post) => updateById({id: post.id, userId: null}))
    )
}

const deleteByCommentId = async (commentsId) => {
    const commentsPost = Posts.filter((post)=> post.commentsId === commentsId);

    await Promise.allSettled(commentsPost.map(async (post) => deleteById(post.id)));
}

module.exports = {
    Posts,
    getAll,
    getById,
    createPost,
    deleteById,
    updateById,
    removeUserById,
    deleteByCommentId,
    getByUserId,
    getByCommentId
  };