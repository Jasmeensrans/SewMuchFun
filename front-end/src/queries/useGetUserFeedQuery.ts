import { useQuery, UseQueryResult } from "react-query";
import agent from "../api/agent";
import { Post } from "../models/post";

/**
 * 
 * @param username 
 * @param token 
 * @returns posts on users feed
 */
export const useGetUserFeedQuery = (username: any, token: string): UseQueryResult<Partial<Post>[]> => {
    const response = useQuery('getUserFeed', ()=> agent.UserInfo.getUserFeed({username: username}, token), {enabled: !!username});
    return response;
}