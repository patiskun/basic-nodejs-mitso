export interface TUser {
    email: string;
    name: string;
    password: string;
    salt: string;
    posts: string|null;
    comments: string|null;
}

export interface TUserModel extends TUser {
    id: string;
}

export interface TUserResponse extends Omit<TUser, 'password'>{
    id: string;
}