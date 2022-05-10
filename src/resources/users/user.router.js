const { StatusCodes } = require('http-status-codes');
const router = require('express').Router();
const User = require('./user.model');
const Post = require('../posts/post.model');
const Comment = require('../comments/comment.model');

const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/').post( async (req, res) => {
  const {email, name, password, salt, posts, comments} = req.body;

  const user = await usersService.createUser({email, name, password, salt, posts, comments});

  if (user) {
    res.status(StatusCodes.CREATED).json(User.toResponse(user));
  } else {
    res.status(StatusCodes.BAD_REQUEST).json({code: 'USER_NOT_CREATE', msg: 'User not create'});
  }
})

router.route('/:id').get(async (req, res)=>{
  const {id} = req.params;
  const user = await usersService.getById(id);

  if(user){
    res.json(User.toResponse(user))
  } else {
    res.status(StatusCodes.NOT_FOUND).json({code: 'user_not_found', msg: 'user not found'})
  }
})

router.route('/:id/posts').get(async (req, res)=>{
  const {id} = req.params;
  
  const posts = await usersService.getAllPostsByUserId(id);

  if(posts){
    res.json(Post.toResponse(posts))
  } else {
    res.status(StatusCodes.NOT_FOUND).json({code: 'POST_NOT_FOUND', msg: 'post not found'})
  }
})

router.route('/:id/comments').get(async (req, res)=>{
  const {id} = req.params;

  const comments = await usersService.getAllCommentsByUserId(id);

  if(comments){
    res.json(Comment.toResponse(comments))
  } else {
    res.status(StatusCodes.NOT_FOUND).json({code: 'POST_NOT_FOUND', msg: 'post not found'})
  }
})



router.route('/:id').put( async (req, res) => {
  const {id} = req.params;
  const {email, name, password, salt, posts, comments} = req.body;

  const user = await usersService.updateById({id, email, name, password, salt, posts, comments})

  if (user) {
    res.status(StatusCodes.OK).json(User.toResponse(user));
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
  }
})

router.route('/:id').delete( async (req, res) => {
  const {id} = req.params;

  const user = await usersService.deleteById(id);

  if(!user){
    return res.status(StatusCodes.NOT_FOUND).json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
  }

  return res.status(StatusCodes.NO_CONTENT).json({ code: 'USER_DELETED', msg: 'User deleted' });
})


module.exports = router;
