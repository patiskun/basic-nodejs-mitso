import express, { NextFunction, Request, Response } from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import morgan from 'morgan';
import { logger, errorHandling } from "./middleware";

import userRouter from './resources/users/user.router';
import postRouter from './resources/posts/post.router';
import commentRouter from './resources/comments/comment.router';


const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(morgan('[:date[Europe/Minsk]] :method :url :status :response-time ms :body', {
  stream: { write: message => logger.http(message) }
}));

app.use(errorHandling);

process.on('unhandledRejection', (error: Error) => logger.error(error));
process.on('uncaughtException', (error: Error) => logger.error(error));

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);

export default app;
