// id text createdAt userId postId
const uuid = require('uuid');

class Comment{
    constructor({id=uuid.v4(), text='text', createdAt=0, userId= null, postId=null}={}){
        this.id = id;
        this.text = text;
        this.createdAt = createdAt;
        this.userId = userId
        this.postId = postId;
    }

    static toResponse(comment){
        const {id, text, createdAt, userId, postId} = comment;
        return {id, text, createdAt, userId, postId};
    }
}

module.exports = Comment