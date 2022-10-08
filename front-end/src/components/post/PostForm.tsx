import "./post.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, IconButton } from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation } from "react-query";
import agent from "../../api/agent";
import { Post } from "../../models/post";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../../queries/useGetUserQuery";
import { User } from "../../models/user";

export function PostForm(props: {userInfo: User}) {
  const [selectedFile, setSelectedFile] = useState<MediaSource | Blob>();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isError, setError] = useState(false);

  const navigate = useNavigate();

  const username = props.userInfo.username;
  const token = props.userInfo.token;
  const email = props.userInfo.email;

  const photoMutation = useMutation((photo: FormData):any =>
    agent.Photo.upload(photo, token)
  );
  const postMutation = useMutation((post: Post):any => agent.Post.create(post, token), {onSuccess: () => navigate('/home')});

  const handleUpload = (event: any): void => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const deleteFile = (): void => {
    setSelectedFile(undefined);
    setIsFilePicked(false);
  };

  const handleSubmit = async () => {
    if (!title || !description || title === "" || description === "" || !isFilePicked) {
      setError(true);
      return;
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
      likes: 0,
      email: email
    } as any;
    // @ts-ignore: Unreachable code error
    await postMutation.mutateAsync(post);
    if (postMutation.isSuccess) navigate("/login");
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
              <div
                style={{
                  textAlign: "center",
                  position: "absolute",
                  top: "130px",
                  left: "150px",
                }}
              >
                <CloudUploadIcon />
                <p
                  style={{
                    fontFamily: "Work Sans, sans-serif",
                    textAlign: "center",
                  }}
                >
                  Click to Upload
                </p>
              </div>
            )}
          </div>
          {isFilePicked && (
            <div style={{ position: "absolute", top: "400px", left: "175px" }}>
              <IconButton onClick={deleteFile}>
                <DeleteIcon />
              </IconButton>
            </div>
          )}
        </div>
        <div style={{ marginTop: "50px" }}>
          <p className="form-title">Add your title</p>
          <input
            type="text"
            className="upload-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              height: "40px",
              width: "500px",
              fontSize: "20px",
            }}
          ></input>
          <div style={{ marginTop: "30px" }}>
            <p className="form-title">Add your description</p>
            <textarea
              className="upload-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                height: "150px",
                width: "500px",
                fontSize: "18px",
                resize: "none",
              }}
            ></textarea>
            <Button
              component="button"
              className="post-button"
              onClick={handleSubmit}
            >
              Post
            </Button>
          </div>
        </div>
        {isError && <p className="error-message">you're missing some stuff!</p>}
      </div>
    </>
  );
}
