import {v4 as uuid} from "uuid";
import {TPostModel, TPost} from './post.type';

class Post {
    id: string;

    title: string;

    text: string;

    createdAt: number;

    userId: string|null;

    commentsId: string|null;

    constructor({ title = "some title", text = "some text", createdAt = 0, userId =  null, commentsId = null}:Partial<TPost>={}) {
        this.id = uuid();
        this.title = title;
        this.text = text;
        this.createdAt = createdAt;
        this.userId = userId;
        this.commentsId = commentsId;
    }

    static toResponse(post:TPostModel):TPostModel{
        const {id, title, text, createdAt, userId, commentsId} = post;
        return {id, title, text, createdAt, userId, commentsId};
    }
}

export default Post;