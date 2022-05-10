const { StatusCodes } = require('http-status-codes');
const router = require('express').Router();
const Comment = require('./comment.model');
const User = require('../users/user.model')
const Post = require('../posts/post.model')

const commentService = require('./comment.service');

router.route('/').get(
    async (req, res) => {
        const comment = await commentService.getAll();

        res.json(comment.map(Comment.toResponse))
    }
)

router.route('/').post(
    async (req, res) => {
        // const {postId} = req.params;
        const {id, text, createdAt, userId, postId}= req.body;
        const comment = await commentService.createComment({id, text, createdAt, userId, postId});

        if(comment){
            res.status(StatusCodes.CREATED).json(Comment.toResponse(comment));
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({code:'Comment_not_create', msg: 'comment not create'})
        }
    }
)

router.route('/:id').get(
    async (req, res) => {
        const {id} = req.params;
        const comment = await commentService.getById(id);

        if(comment){
            res.json(Comment.toResponse(comment));
        } else {
            res.status(StatusCodes.NOT_FOUND).json({code:'Comment_not_found', msg: 'comment not found'})
        }
    }
)

router.route('/:id/user').get(
    async (req, res) => {
        const {id} = req.params;
        const user = await commentService.getUserByCommentId(id);

        if(user){
            res.json(User.toResponse(user));
        } else {
            res.status(StatusCodes.NOT_FOUND).json({code:'User_not_found', msg:'User not found'})
        }
    }
)

router.route('/:id/post').get(
    async (req, res) => {
        const {id} = req.params;
        const post = await commentService.getPostByCommentId(id);

        if(post){
            res.json(Post.toResponse(post));
        } else {
            res.status(StatusCodes.NOT_FOUND).json({code:'Post_not_found', msg:'Post not found'})
        }
    }
)


router.route('/:id').put(
    async (req, res) => {
        const {id} = req.params;
        const {text, createdAt, userId, postId} = req.body;

        const comment = await commentService.updateById({id, text, createdAt, userId, postId})

        if(comment){
            res.status(StatusCodes.OK).json(Comment.toResponse(comment))
        } else {
            res.status(StatusCodes.NOT_FOUND).json({code:'Comment_not_found', msg: 'Comment not found'})
        }
    }
)

router.route('/:id').delete(
    async (req, res) => {
        const {id} = req.params;

        const comment = await commentService.deleteById(id)

        if(comment){
            return res.status(StatusCodes.NO_CONTENT).json({code:"Comment_Deleted", msg:'comment deleted'})
        }
        return res.status(StatusCodes.NOT_FOUND).json({code:'Comment_not_found', msg: 'Comment not found'})
        
        
    }
)

module.exports = router