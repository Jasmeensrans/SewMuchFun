import { NavBar } from "../components/common/NavBar";
import { Profile } from "../components/user/Profile";
import { useGetUserQuery } from "../queries/useGetUserQuery";

export const Account = () => {
  const user = useGetUserQuery();

  if(!user.data) return <></>
  return (
    <div className="custom-grad page-container" style={{backgroundImage: "url(/grad.png)"}}>
      <NavBar isLoggedIn={true} username={user.data?.username} />
      <Profile token={user.data?.token} username={user.data?.username}/>
      <div style={{height: '2000px'}}></div>
    </div>
  );
};
