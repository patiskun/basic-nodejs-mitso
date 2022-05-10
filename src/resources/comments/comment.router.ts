import { StatusCodes } from 'http-status-codes';
import { Request, Response, Router} from 'express';

import Comment from './comment.model';
import User from '../users/user.model'
import Post from '../posts/post.model'

import commentService from './comment.service';

const router = Router();

router.route('/').get(
    async (_req: Request, res: Response) => {
        const comment = await commentService.getAll();

        res.json(comment.map(Comment.toResponse))
    }
)

router.route('/').post(
    async (req: Request, res: Response) => {
        // const {postId} = req.params;
        const {text, createdAt, userId, postId}= req.body;
        const comment = await commentService.createComment({text, createdAt, userId, postId});

        if(comment){
            res.status(StatusCodes.CREATED).json(Comment.toResponse(comment));
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({code:'Comment_not_create', msg: 'comment not create'})
        }
    }
)

router.route('/:id').get(
    async (req: Request, res: Response) => {
        const {id} = req.params;
        const comment = await commentService.getById(id||'');

        if(comment){
            res.json(Comment.toResponse(comment));
        } else {
            res.status(StatusCodes.NOT_FOUND).json({code:'Comment_not_found', msg: 'comment not found'})
        }
    }
)

router.route('/:id/user').get(
    async (req: Request, res: Response) => {
        const {id} = req.params;
        const user = await commentService.getUserByCommentId(id||'');

        if(user){
            res.json(User.toResponse(user));
        } else {
            res.status(StatusCodes.NOT_FOUND).json({code:'User_not_found', msg:'User not found'})
        }
    }
)

router.route('/:id/post').get(
    async (req: Request, res: Response) => {
        const {id} = req.params;
        const post = await commentService.getPostByCommentId(id||'');

        if(post){
            res.json(Post.toResponse(post));
        } else {
            res.status(StatusCodes.NOT_FOUND).json({code:'Post_not_found', msg:'Post not found'})
        }
    }
)


router.route('/:id').put(
    async (req:Request, res:Response) => {
        const {id} = req.params;
        const {text, createdAt, userId, postId} = req.body;

        const comment = await commentService.updateById({id: id||'', text, createdAt, userId, postId})

        if(comment){
            res.status(StatusCodes.OK).json(Comment.toResponse(comment))
        } else {
            res.status(StatusCodes.NOT_FOUND).json({code:'Comment_not_found', msg: 'Comment not found'})
        }
    }
)

router.route('/:id').delete(
    async (req: Request, res: Response) => {
        const {id} = req.params;

        const comment = await commentService.deleteById(id||'')

        if(comment){
            return res.status(StatusCodes.NO_CONTENT).json({code:"Comment_Deleted", msg:'comment deleted'})
        }
        return res.status(StatusCodes.NOT_FOUND).json({code:'Comment_not_found', msg: 'Comment not found'})
        
        
    }
)

export default router;