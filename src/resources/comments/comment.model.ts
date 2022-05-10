import {v4 as uuid} from "uuid";
import {TComment, TCommentModel} from './comment.type';

class Comment{
    id: string;

    text: string;

    createdAt: number;

    userId: string|null;

    postId: string|null;

    constructor({text='text', createdAt=0, userId= null, postId=null}:Partial<TComment>={}){
        this.id = uuid();
        this.text = text;
        this.createdAt = createdAt;
        this.userId = userId
        this.postId = postId;
    }

    static toResponse(comment:TCommentModel):TCommentModel{
        const {id, text, createdAt, userId, postId} = comment;
        return {id, text, createdAt, userId, postId};
    }
}

export default Comment