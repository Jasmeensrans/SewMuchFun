/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";
import { useMutation } from "react-query";
import agent from "../../api/agent";
import { history } from "../..";

export const Post = (props: any) => {
  const [liked, setLiked] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const mutationFunction = (id: string) => agent.Post.delete(id, props.token);
  const deleteMutation = useMutation(mutationFunction);

  const deletePost = async () => {
    await deleteMutation.mutateAsync(props.post.id);
    history.go(0);
  }


  return (
    <>
      {open ? (
        <>
          <div className="open-post">
            <div className="open-post-img-div">
              <img className="open-post-img" src={props.post.photoUrl} alt="" />
            </div>
            <div className="open-post-context-div">
              <a
                className="open-handle"
                onClick={() =>
                  navigate(`/profilePage?user=${props.post.author}`)
                }
              >{`@${props.post.author}`}</a>
              <p className="open-post-title">{props.post.title}</p>
              <p className="post-description">{props.post.description}</p>
            </div>
            {props.post.author === props.username ? (
              <>
                <div className="open-delete-button">
                  <IconButton onClick={()=> deletePost()} className="delete-icon">
                    <DeleteIcon />
                  </IconButton>
                </div>
              </>
            ) : (
              <div className="open-likes-div">
                <p className="likes">
                  {liked ? props.post.likes + 1 : props.post.likes}
                </p>
                <IconButton
                  className="likes-button"
                  onClick={() => setLiked((prev) => !prev)}
                >
                  {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </div>
            )}

            <div className="collapse-div">
              <IconButton
                className="close-button"
                onClick={() => setOpen(false)}
              >
                <CloseFullscreenIcon />
              </IconButton>
            </div>
          </div>
        </>
      ) : (
        <div className="post">
          <div onClick={() => setOpen(true)}>
            <img className="post-img" src={props.post.photoUrl} alt="" />
          </div>
          <div>
            <p className="post-title">{props.post.title}</p>
            <a
              className="handle"
              onClick={() => navigate(`/profilePage?user=${props.post.author}`)}
            >{`@${props.post.author}`}</a>
            {props.username === props.post.author ? (
              <div className="delete-button">
                <IconButton onClick={()=> deletePost()} className="delete-icon">
                  <DeleteIcon />
                </IconButton>
              </div>
            ) : (
              <div className="likes-div">
                <p className="likes">
                  {liked ? props.post.likes + 1 : props.post.likes}
                </p>
                <IconButton
                  className="likes-button"
                  onClick={() => setLiked((prev) => !prev)}
                >
                  {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
