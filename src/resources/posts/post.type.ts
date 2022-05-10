export interface TPost{
    title: string;
    text: string;
    createdAt: number;
    userId: string|null;
    commentsId: string|null;
}

export interface TPostModel extends TPost{
    id: string;
}