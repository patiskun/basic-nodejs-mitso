import Post from './post.model';
import {TPost, TPostModel} from './post.type';

const POSTS: TPostModel[]=[];

const getAll = async (): Promise<TPostModel[]>=> POSTS;
const getById = async (id:string):Promise<TPostModel | null>=> POSTS.find((post)=> post.id === id)|| null;

const getByUserId = async (id: string):Promise<TPostModel | null> => POSTS.find((post) => post.userId === id)|| null;
const getByCommentId = async (id:string):Promise<TPostModel | null> => POSTS.find((post)=>post.commentsId === id)|| null;

const createPost = async ({title, text, createdAt, userId, commentsId }:TPost): Promise<TPostModel>=> {
    const post = new Post({title, text, createdAt, userId, commentsId });
    POSTS.push(post);
    return post;
};

const deleteById = async (id:string): Promise<TPostModel| null> => {
    const postPosition = POSTS.findIndex(post => post.id === id);
    if(postPosition === -1) return null;

    const postDeleted = POSTS[postPosition]!;

    POSTS.splice(postPosition, 1);
    return postDeleted;
}

const updateById = async({ id, ...payload }: Partial<TPostModel>): Promise<TPostModel | null>=> {
    const postPosition = POSTS.findIndex(post => post.id === id);
    if(postPosition === -1) return null;

    const oldPost=POSTS[postPosition]!;
    const newPost = {...oldPost, payload};
    POSTS.splice(postPosition, 1, newPost);
    return newPost;
}

const removeUserById = async (id: string): Promise<void> => {
    const userPosts = POSTS.filter((post) => post.userId === id);

    await Promise.allSettled(
        userPosts.map(async (post) => updateById({id: post.id, userId: null}))
    )
}

const deleteByCommentId = async (commentsId: string): Promise<void> => {
    const commentsPost = POSTS.filter((post)=> post.commentsId === commentsId);

    await Promise.allSettled(commentsPost.map(async (post) => deleteById(post.id)));
}

export default{
    POSTS,
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