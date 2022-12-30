import { useQuery, UseQueryResult } from "react-query";
import agent from "../api/agent";
import { UserInfo } from "../models/user";

export const useGetUserInfoQuery = (username: string, token: string):UseQueryResult<UserInfo> => {
  const response = useQuery("getUserInfo", () =>
    agent.UserInfo.getUserInfo(username, token),
    {enabled: username !== undefined}
  );
  return response;
};
