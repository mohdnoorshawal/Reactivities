import { JSXElementConstructor, ReactElement, ReactNodeArray, ReactPortal } from "react";
import { User } from "./user";
export interface Profile {
  username: string;
  displayName: string;
  image?: string;
  bio?: string;
  followersCount: number;
  followingCount: number;
  following: boolean;
  photos?: Photo[];
}

export class Profile implements Profile {
  FollowersCount: string | number | boolean | {} | ReactElement<any, string | JSXElementConstructor<any>> | ReactNodeArray | ReactPortal | null | undefined;
  constructor(user: User) {
    this.username = user.username;
    this.displayName = user.displayName;
    this.image = user.image;
  }
}
export interface Photo {
  id: string;
  url: string;
  isMain: boolean;
}
export interface UserActivity {
  id: string;
  title: string;
  category: string;
  date: Date;
}