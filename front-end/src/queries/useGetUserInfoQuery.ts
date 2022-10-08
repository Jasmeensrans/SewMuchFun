import { useQuery } from "react-query";
import agent from "../api/agent";

export const useGetUserInfoQuery = (email: string) => {
  const response = useQuery("getUserInfo", () =>
    agent.Account.getUserInfo(email),
    {enabled: email !== undefined}
  );
  return response;
};
