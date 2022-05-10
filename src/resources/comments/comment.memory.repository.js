const Comment = require('./comment.model')

const Comments = [new Comment()];

const getAll = async () => Comments;
const getById = async (id) => Comments.find((comment) => comment.id === id)
const getByUserId = async (userId) => Comments.find((comment) => comment.userId === userId);
const getByPostId = async (postId) => Comments.find((comment) => comment.id === postId);

const createComment = async ({id, text, createdAt, userId, postId}) => {
    const comment = new Comment({id, text, createdAt, userId, postId})
    Comments.push(comment)
    return comment
}
const deleteById = async (id) => {
    const commentPosition = Comments.findIndex((comment) => comment.id === id)
    if(commentPosition === -1) return null;

    const commentDeletable = Comments[commentPosition]

    Comments.splice(commentPosition, 1);
    return commentDeletable
}
const updateById = async ({id, text, createdAt, userId, postId}) => {
    const commentPosition = Comments.findIndex((comment) => comment.id === id)
    if(commentPosition === -1) return null;
    
    const oldComment = Comments[commentPosition];
    const newComment = {...oldComment, text, createdAt, userId, postId};

    Comments.splice(commentPosition, 1, newComment);
    return newComment;
}

const removeUserById = async (id) => {
    const userComment = Comments.filter((comment) => comment.userId === id);

    await Promise.allSettled(
        userComment.map(async (comment) => updateById({id: comment.id, userId: null}))
    )
}


const removePostById = async (id) => {
    const postComment = Comments.filter((comment)=> comment.postId === id);

    await Promise.allSettled(
        postComment.map(async (comment) => updateById({id: comment.id, postId: null}))
    )
}

module.exports = {
    Comments,
    getAll,
    getById,
    createComment,
    deleteById,
    updateById,
    getByUserId,
    getByPostId,
    removeUserById,
    removePostById
  };