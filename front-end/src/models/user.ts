import { Post } from "./post";

export interface User {
  username: string;
  displayName: string;
  token: string;
  bio: string;
  email: string;
  image: string;
}

export interface UserFormValues {
  email: string;
  password: string;
  username?: string;
}
export interface UserAuthInfo {
  token: string;
  username: string;
}
export interface PasswordDto {
  oldPassword: string;
  newPassword: string;
  username: string;
}
export interface FollowDto {
  follower: string;
  followee: string;
}
export interface UserInfo {
  username: string;
  bio: string;
  posts: Post[];
  followers: number;
  following: number;
  followed: boolean;
  image: string;
}
