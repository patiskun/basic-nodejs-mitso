export interface TComment {
    text: string;
    createdAt: number;
    userId: string|null;
    postId: string|null;
}

export interface TCommentModel extends TComment{
    id: string;
}