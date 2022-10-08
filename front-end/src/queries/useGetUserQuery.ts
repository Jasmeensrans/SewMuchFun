import { useQuery, UseQueryResult } from "react-query";
import agent from "../api/agent";

/**
 * 
 * @returns user object
 */
export const useGetUserQuery = (): UseQueryResult<any> => {
    const token = window.localStorage.getItem('jwt') as string;
    const response = useQuery('getUser', () => agent.Account.getUser(token));
    return response;
}
    