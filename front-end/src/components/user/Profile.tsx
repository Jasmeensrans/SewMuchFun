import { Button } from "@mui/material";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { history } from "../..";
import agent from "../../api/agent";
import { FollowDto } from "../../models/user";
import { useGetUserInfoQuery } from "../../queries/useGetUserInfoQuery";
import { Post } from "../post/Post";
import {Post as PostModel} from "../../models/post"
import "./user.css";
import { TextBox } from "../common/TextBox";

export const Profile = (props: { token: string; username: string }) => {
  let { username } = useParams();
  let user =  useGetUserInfoQuery(username ?? "", props.token);

  const navigate = useNavigate();

  if(user.isError) navigate('/error')

  let buttonText = user.data?.followed ? "unfollow" : "follow"
  if (username === props.username) buttonText = "settings"

  const followMutation = useMutation<unknown, unknown, FollowDto, unknown>((follow) => agent.UserInfo.followUser({follower: follow.follower, followee: follow.followee}, props.token),)
  const unfollowMutation = useMutation<unknown, unknown, FollowDto, unknown>((follow)=> agent.UserInfo.unfollowUser({follower: follow.follower, followee: follow.followee}, props.token),)

  const onClick = async () => {
    if (username === props.username) {
      navigate("/settings");
    } else if (buttonText === "unfollow") {
      // unfollow this user
      await unfollowMutation.mutateAsync({follower: props.username, followee: username ?? ""})
      history.go(0)
    } else {
      // follow this user
      await followMutation.mutateAsync({follower: props.username, followee: username ?? ""})
      history.go(0)
    }
  };

  if (!user.data) return <></>;
  return (
    <>
      <div className="user-container">
      <p className="username"><strong>{user.data?.username}</strong></p>
        <div className="profile-pic">
          <img
            className="ppic"
            src={(user.data?.image && user.data?.image !== "") ? user.data?.image : "data:image/png;base64,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"}
            alt=""
          />
        </div>
        <div className="user-info">
          <div className="following">
            <p>
              <strong>{user.data?.followers}</strong>
            </p>
            <p>followers</p>
          </div>
          <div className="following">
            <p>
              <strong>{user.data?.following}</strong>
            </p>
            <p>following</p>
          </div>
          <div className="button-div">
            <Button className="follow-button" onClick={() => onClick()}>{buttonText}</Button>
          </div>
        </div>
        <div className="bio-div">
          <p>{user.data?.bio}</p>
        </div>
      </div>
      <div className="post-wrap">
        {user.data?.posts.map((p: PostModel) => {
          return (
            <>
              <Post post={p} token={props.token} username={props.username} isOwner={props.username === p.author}/>
            </>
          );
        })}
      </div>
      <TextBox text="Oh No! There's no more posts :("></TextBox>
    </>
  );
};
