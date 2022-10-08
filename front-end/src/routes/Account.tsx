import { NavBar } from "../components/common/NavBar";
import { Profile } from "../components/user/Profile";
import { useGetUserInfoQuery } from "../queries/useGetUserInfoQuery";
import { useGetUserQuery } from "../queries/useGetUserQuery";

export const Account = () => {
  const user = useGetUserQuery();
  const userInfo = useGetUserInfoQuery(user.data?.email);

  return (
    <>
      <NavBar isLoggedIn={true} />
      <Profile isLoggedInUser={true}/>
    </>
  );
};
