import Comment from './comment.model';
import {TComment, TCommentModel} from './comment.type';

const COMMENTS: TCommentModel[]=[];

const getAll = async (): Promise<TCommentModel[]>=> COMMENTS;
const getById = async (id: string):Promise<TCommentModel | null>=> COMMENTS.find((comment) => comment.id === id)|| null;
const getByUserId = async (userId: string): Promise<TCommentModel | null>=> COMMENTS.find((comment) => comment.userId === userId)|| null;
const getByPostId = async (postId: string): Promise<TCommentModel | null>=> COMMENTS.find((comment) => comment.postId === postId)|| null;

const createComment = async ({text, createdAt, userId, postId}:TComment): Promise<TCommentModel>=> {
    const comment = new Comment({text, createdAt, userId, postId})
    COMMENTS.push(comment)
    return comment
}
const deleteById = async (id: string):Promise<TCommentModel| null> => {
    const commentPosition = COMMENTS.findIndex((comment) => comment.id === id)
    if(commentPosition === -1) return null;

    const commentDeletable = COMMENTS[commentPosition]!;

    COMMENTS.splice(commentPosition, 1);
    return commentDeletable;
}
const updateById = async ({id, ...payload}:Partial<TCommentModel>): Promise<TCommentModel | null>=> {
    const commentPosition = COMMENTS.findIndex((comment) => comment.id === id)
    if(commentPosition === -1) return null;
    
    const oldComment = COMMENTS[commentPosition]!;
    const newComment = {...oldComment, payload};

    COMMENTS.splice(commentPosition, 1, newComment);
    return newComment;
}

const removeUserById = async (id: string): Promise<void> => {
    const userComment = COMMENTS.filter((comment) => comment.userId === id);

    await Promise.allSettled(
        userComment.map(async (comment) => updateById({id: comment.id, userId: null}))
    )
}


const removePostById = async (id: string): Promise<void> => {
    const postComment = COMMENTS.filter((comment)=> comment.postId === id);

    await Promise.allSettled(
        postComment.map(async (comment) => updateById({id: comment.id, postId: null}))
    )
}

export default{
    COMMENTS,
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