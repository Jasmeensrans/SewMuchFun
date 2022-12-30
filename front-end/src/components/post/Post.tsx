/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useMutation } from "react-query";
import agent from "../../api/agent";
import { history } from "../..";
import { Post as PostModel } from "../../models/post";

export const Post = (props: {
  token: string;
  post: Partial<PostModel>;
  username: string;
  isOwner: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const mutationFunction = (id: string) => agent.Post.delete(id, props.token);
  const deleteMutation = useMutation(mutationFunction);

  const deletePost = async () => {
    await deleteMutation.mutateAsync(props.post.id ?? "");
    history.go(0);
  };

  return (
    <>
      {open ? (
        <div className="closed-post-container">
          <div className="post">
            <div>
              <img
                className="post-img-open"
                src={props.post.photoUrl}
                alt=""
                onClick={() => setOpen(false)}
              />
              <div>
                <a
                  className="handle"
                  onClick={() => navigate(`/profile/${props.post.author}`)}
                >{`@${props.post.author}`}</a>
                <p className="post-title">
                  <strong>{props.post.title}</strong>
                </p>
                <p className="post-description">{props.post.description} </p>
                {props.isOwner ? (
                  <IconButton
                    size="small"
                    onClick={() => deletePost()}
                    className="post-delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                ): <></>}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="closed-post-container">
          <div className="post">
            <div onClick={() => setOpen(true)}>
              <img className="post-img" src={props.post.photoUrl} alt="" />
            </div>
          </div>
          <div>
            <a
              className="handle"
              onClick={() => navigate(`/profile/${props.post.author}`)}
            >{`@${props.post.author}`}</a>
          </div>
        </div>
      )}
    </>
  );
};
