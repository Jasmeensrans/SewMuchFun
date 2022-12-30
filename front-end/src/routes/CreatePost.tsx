import { NavBar } from "../components/common/NavBar";
import { PostForm } from "../components/post/PostForm";
import { User } from "../models/user";
import { useGetUserQuery } from "../queries/useGetUserQuery";
import "./routes.css";

export function CreatePost() {
  const userData = useGetUserQuery();

  return (
    <>
      <div className="page-container blue-pink-white">
        <NavBar
          isLoggedIn={true}
          username={userData.data ? userData.data?.username : ""}
        ></NavBar>

        <div className="centered-form">
          <PostForm userInfo={userData.data ? userData.data : {} as User} />
        </div>
      </div>
    </>
  );
}
