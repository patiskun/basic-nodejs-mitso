import { StatusCodes } from 'http-status-codes';
import { Request, Response, Router} from 'express';

import Post from './post.model';
import User from '../users/user.model';
import Comment from '../comments/comment.model';

import postService from './post.service';

const router = Router({mergeParams: true});

router.route('/').get(
    async (_req: Request, res: Response) => {
        const posts = await postService.getAll();

        res.json(posts.map(Post.toResponse));
    }
)

router.route('/').post( 
    async (req: Request, res: Response) => {
        // const {userId} = req.params;
        const {title, text, createdAt, userId, commentsId} = req.body;
        const post = await postService.createPost({title, text, createdAt, userId, commentsId})
        if(post){
            res.status(StatusCodes.CREATED).json(Post.toResponse(post));
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({code: 'BAD_REQUEST', msg: 'Bad request'});
        }
})

router.route('/:id').get(
    async (req: Request, res: Response) => {
        const {id} = req.params;

        const post = await postService.getById(id||'');

        if(post){
            res.json(Post.toResponse(post));
        } else {
            res.status(StatusCodes.NOT_FOUND).json({code: 'NOT_FOUND', msg: 'Not found'});
        }
    }
)

router.route('/:id/user').get(
    async (req: Request, res: Response) => {
        const {id} = req.params;

        const user = await postService.getUserByPostId(id||'');
        if(user){
            res.json(User.toResponse(user));
        } else {
            res.status(StatusCodes.NOT_FOUND).json({code: 'NOT_FOUND', msg: 'Not found'});
        }
    }
)

router.route('/:id/comments').get(
    async (req: Request, res: Response) => {
        const {id} = req.params;

        const comments = await postService.getByCommentId(id||'');

        if(comments){
            res.json(Comment.toResponse(comments));
        } else {
            res.status(StatusCodes.NOT_FOUND).json({code: 'NOT_FOUND', msg: 'Not found'});
        }
    }
)

router.route('/:id').put(
    async(req: Request, res: Response) => {
        const {id} = req.params;
        const {title, text, createdAt, userId, commentsId} = req.body;

        const post = await postService.updateById({id:id||'', title, text, createdAt, userId, commentsId})

        if(post){
            res.status(StatusCodes.OK).json(Post.toResponse(post))
        } else {
            res.status(StatusCodes.NOT_FOUND).json({code: 'NOT_FOUND', msg: 'Not found'});
        }
    }
)

router.route('/:id').delete( 
    async (req: Request, res: Response) => {
        const {id} = req.params;
        const post = await postService.deleteById(id||'');

        if(post) {
            res.status(StatusCodes.NO_CONTENT).json({code: 'post deleted', msg: "post deleted"})
        } else {
            res.status(StatusCodes.NOT_FOUND).json({code: 'post not found', msg: "post not found"})
        }
})

export default router;