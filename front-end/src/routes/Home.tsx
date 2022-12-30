import { NavBar } from "../components/common/NavBar";
import { Post } from "../components/post/Post";
import { useGetUserFeedQuery } from "../queries/useGetUserFeedQuery";
import { useGetUserQuery } from "../queries/useGetUserQuery";
import { Post as PostModel } from "../models/post";
import { TextBox } from "../components/common/TextBox";

export const Home = () => {

  const userData = useGetUserQuery();
  const username = userData.data?.username;
  const token = userData.data?.token;

  const feedInfo = useGetUserFeedQuery(username, token ?? "");
  const feed = feedInfo.data;

  if (!feedInfo.data) return <></>;
  return (
    <>
      <div
        className="page-container custom-grad"
        style={{ backgroundImage: "url(/grad.png)" }}
      >
        <NavBar isLoggedIn={true} username={userData.data?.username ?? ""} />
        <div className="posts-feed-div">
        {feed &&
          username &&
          feed.map((post: Partial<PostModel>) => (
            <div className="post-container">
              <Post post={post} username={username ?? ""} token={token ?? ""} isOwner={username === post.author}/>
            </div>
          ))}
          </div>
        <TextBox
          text={`Looks like you don't have any posts ${
            feed?.length !== 0 ? "left" : ""
          }:(`}
        ></TextBox>
        <div style={{height: '10px'}}></div>
      </div>
    </>
  );
};
