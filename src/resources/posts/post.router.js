const { StatusCodes } = require('http-status-codes');
const router = require('express').Router({ mergeParams: true });
const Post = require('./post.model');
const User = require('../users/user.model')
const Comment = require('../comments/comment.model')

const postService = require('./post.service');

router.route('/').get(
    async (req, res) => {
        const posts = await postService.getAll();

        res.json(posts.map(Post.toResponse));
    }
)

router.route('/').post( 
    async (req, res) => {
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
    async (req, res) => {
        const {id} = req.params;

        const post = await postService.getById(id);

        if(post){
            res.json(Post.toResponse(post));
        } else {
            res.status(StatusCodes.NOT_FOUND).json({code: 'NOT_FOUND', msg: 'Not found'});
        }
    }
)

router.route('/:id/user').get(
    async (req, res) => {
        const {id} = req.params;

        const user = await postService.getUserByPostId(id);
        if(user){
            res.json(User.toResponse(user));
        } else {
            res.status(StatusCodes.NOT_FOUND).json({code: 'NOT_FOUND', msg: 'Not found'});
        }
    }
)

router.route('/:id/comments').get(
    async (req, res) => {
        const {id} = req.params;

        const comments = await postService.getByCommentId(id);

        if(comments){
            res.json(Comment.toResponse(comments));
        } else {
            res.status(StatusCodes.NOT_FOUND).json({code: 'NOT_FOUND', msg: 'Not found'});
        }
    }
)

router.route('/:id').put(
    async(req, res) => {
        const {id} = req.params;
        const {title, text, createdAt, userId, commentsId} = req.body;

        const post = await postService.updateById({id, title, text, createdAt, userId, commentsId})

        if(post){
            res.status(StatusCodes.OK).json(Post.toResponse(post))
        } else {
            res.status(StatusCodes.NOT_FOUND).json({code: 'NOT_FOUND', msg: 'Not found'});
        }
    }
)

router.route('/:id').delete( 
    async (req, res) => {
        const {id} = req.params;
        const post = await postService.deleteById(id);

        if(post) {
            res.status(StatusCodes.NO_CONTENT).json({code: 'post deleted', msg: "post deleted"})
        } else {
            res.status(StatusCodes.NOT_FOUND).json({code: 'post not found', msg: "post not found"})
        }
})

module.exports = router;