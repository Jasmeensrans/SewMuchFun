import { useQuery, UseQueryResult } from "react-query";
import agent from "../api/agent";
import { NavBar } from "../components/common/NavBar";
import { Post as PostModel } from "../models/post";
import { Post } from "../components/post/Post";
import { useGetUserQuery } from "../queries/useGetUserQuery";

export const Discover = () => {
  const templatePost = {
    title: "Crocheted Sweater Vest",
    description:
      "This vest  only took me 2 hours to crochet, and I designed the pattern myself",
    author: "jasmeen",
    photoUrl:
      "https://i.pinimg.com/474x/45/d5/9c/45d59c38d3a78ddfe18a57474996d4f3.jpg",
  };

  const userData = useGetUserQuery();
  const post: UseQueryResult<PostModel[]> = useQuery(
    "getPosts",
    () => agent.Post.get(userData.data?.token ?? ""),
    { enabled: userData.data?.token !== undefined }
  );
  return (
    <div className="blue-pink-white">
      <NavBar isLoggedIn={true} username={userData.data?.username ?? ""} />
      <div>
        <div className="block">
          <div className="w-img-block left">
            <div className="w-img-block-img-l">
              <Post
                post={templatePost}
                username="123"
                token="123"
                isOwner={false}
              ></Post>
            </div>
            <div className="color-div-blue"></div>
          </div>
          <div className="right w-text-div">
            <p className="w-title">This weeks top post</p>
            <p className="w-text">
              Inspire other fashion designers by sharing your projects. Discover
              new self drafted designs or unqiue patterns below.
            </p>
          </div>
        </div>
      </div>
      <div className="discover-posts">
        <p className="landing-header">
          Check out what other people are posting here
        </p>
        {post.data?.map((p) => {
          return (
            <Post
              post={p}
              username={userData.data?.username ?? ""}
              token={userData.data?.token ?? ""}
              isOwner={p.author === userData.data?.username}
            />
          );
        })}
      </div>
    </div>
  );
};
