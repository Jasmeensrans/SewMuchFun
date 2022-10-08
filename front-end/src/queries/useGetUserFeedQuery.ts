import { useQuery, UseQueryResult } from "react-query";
import agent from "../api/agent";
import { Post } from "../models/post";

/**
 * 
 * @param username 
 * @param token 
 * @returns posts on users feed
 */
export const useGetUserFeedQuery = (username: string, token: string): UseQueryResult<Partial<Post>[]> => {
    const response = useQuery('getUserFeed', ()=> agent.Account.getUserFeed(token, username), {enabled: username !== undefined});
    return response as any;
}