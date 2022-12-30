import "./post.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, CircularProgress, IconButton } from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation } from "react-query";
import agent from "../../api/agent";
import { Post } from "../../models/post";
import { useNavigate } from "react-router-dom";
import { User } from "../../models/user";

export function PostForm(props: { userInfo: User }) {
  const [selectedFile, setSelectedFile] = useState<MediaSource | Blob>();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("")

  const navigate = useNavigate();

  const username = props.userInfo.username;
  const token = props.userInfo.token;
  const email = props.userInfo.email;

  const photoMutation = useMutation<unknown, unknown, FormData, unknown>((photo: FormData) =>
    agent.Photo.upload(photo, token)
  );
  const postMutation = useMutation(
    (post: Partial<Post>) => agent.Post.create(post, token),
    { onSuccess: () => navigate(`/profile/${username}`) }
  );

  const handleUpload = (event: any): void => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const deleteFile = (): void => {
    setSelectedFile(undefined);
    setIsFilePicked(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (
      !title ||
      !description ||
      title === "" ||
      description === "" ||
      !isFilePicked
    ) {
      setError(true);
      setErrorText("You're missing some stuff !")
      setLoading(false)
      return;
    } else if(description.length > 250) {
      setError(true);
      setErrorText("You're description must be less than 250 characters")
      setLoading(false)
    } else if(title.length >35) {
      setError(true);
      setErrorText("You're title must be less than 35 characters")
      setLoading(false)
    }
    const photoData = new FormData();
    if (selectedFile) photoData.append("file", selectedFile as Blob);
    const data = (await photoMutation.mutateAsync(photoData)) as {
      id: string;
      url: string;
    };
    const post: Partial<Post> = {
      title: title,
      description: description,
      photoId: data.id,
      photoUrl: data.url,
      author: username,
      email: email,
    };
    await postMutation.mutateAsync(post);
    if (postMutation.isSuccess) navigate("/home");
    setLoading(false);
  };

  return (
    <>
      <div className="post-div">
        <div>
          <div className="upload-box">
            <input
              type="file"
              name="file"
              className="file-uploader"
              onChange={handleUpload}
            />
            {isFilePicked ? (
              <img
                src={URL.createObjectURL(selectedFile as MediaSource)}
                alt="post"
                className="post-image"
              ></img>
            ) : (
              <div className="uploader">
                <CloudUploadIcon />
                <p className="center-p">Click to Upload</p>
              </div>
            )}
          </div>
          {isFilePicked && (
            <div className="delete-div">
              <IconButton onClick={deleteFile}>
                <DeleteIcon />
              </IconButton>
            </div>
          )}
        </div>
        <div className="post-form-content-div">
          <p className="form-title">Add your title</p>
          <input
            type="text"
            className="upload-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <div className="description-div">
            <p className="form-title">Add your description</p>
            <textarea
              className="upload-input-area"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {isLoading ? (
              <div className="post-loader-container">
                <CircularProgress
                  className="post-loader"
                  color="inherit"
                ></CircularProgress>
              </div>
            ) : (
              <Button
                component="button"
                className="post-button"
                onClick={handleSubmit}
              >
                Post
              </Button>
            )}
          </div>
        </div>
        {isError && <p className="error-message">{errorText}</p>}
      </div>
    </>
  );
}
