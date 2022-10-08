import { NavBar } from "../components/common/NavBar";
import { PostForm } from "../components/post/PostForm";
import { useGetUserQuery } from "../queries/useGetUserQuery";

export function CreatePost() {
  const userData = useGetUserQuery()
  const username = ""

  return (
    <>
    <div style={{ height: "100vh" }}>
    <NavBar isLoggedIn={username !== undefined}></NavBar>

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <PostForm userInfo={userData.data ? userData.data : {}}/>
      </div>
    </div>
    </>
  );
}
