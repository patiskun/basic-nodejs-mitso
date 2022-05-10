import { StatusCodes } from 'http-status-codes';
import { Request, Response, Router} from 'express';

import User from './user.model';
import Post from '../posts/post.model';
import Comment from '../comments/comment.model';

import usersService from './user.service';

const router = Router();

router.route('/').get(async (_req: Request, res: Response) => {
  const users = await usersService.getAll();

  res.json(users.map(User.toResponse));
});

router.route('/').post( async (req: Request, res: Response) => {
  const {email, name, password, salt, posts, comments} = req.body;

  const user = await usersService.createUser({email, name, password, salt, posts, comments});

  if (user) {
    res.status(StatusCodes.CREATED).json(User.toResponse(user));
  } else {
    res.status(StatusCodes.BAD_REQUEST).json({code: 'USER_NOT_CREATE', msg: 'User not create'});
  }
})

router.route('/:id').get(async (req: Request, res: Response)=>{
  const {id} = req.params;
  const user = await usersService.getById(id||'');

  if(user){
    res.json(User.toResponse(user))
  } else {
    res.status(StatusCodes.NOT_FOUND).json({code: 'user_not_found', msg: 'user not found'})
  }
})

router.route('/:id/posts').get(async (req: Request, res: Response)=>{
  const {id} = req.params;
  
  const posts = await usersService.getAllPostsByUserId(id||'');

  if(posts){
    res.json(Post.toResponse(posts))
  } else {
    res.status(StatusCodes.NOT_FOUND).json({code: 'POST_NOT_FOUND', msg: 'post not found'})
  }
})

router.route('/:id/comments').get(async (req: Request, res: Response)=>{
  const {id} = req.params;

  const comments = await usersService.getAllCommentsByUserId(id||'');

  if(comments){
    res.json(Comment.toResponse(comments))
  } else {
    res.status(StatusCodes.NOT_FOUND).json({code: 'POST_NOT_FOUND', msg: 'post not found'})
  }
})



router.route('/:id').put( async (req: Request, res: Response) => {
  const {id} = req.params;
  const {email, name, password, salt, posts, comments} = req.body;

  const user = await usersService.updateById({id: id||'', email, name, password, salt, posts, comments})

  if (user) {
    res.status(StatusCodes.OK).json(User.toResponse(user));
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
  }
})

router.route('/:id').delete( async (req: Request, res: Response) => {
  const {id} = req.params;

  const user = await usersService.deleteById(id||'');

  if(!user){
    return res.status(StatusCodes.NOT_FOUND).json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
  }

  return res.status(StatusCodes.NO_CONTENT).json({ code: 'USER_DELETED', msg: 'User deleted' });
})


export default router;
