import { Button, LinearProgress } from "@mui/material";
import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import agent from "../api/agent";
import { NavBar } from "../components/common/NavBar";
import { PasswordDto } from "../models/user";
import { useGetUserQuery } from "../queries/useGetUserQuery";

export const Settings = () => {
  const userData = useGetUserQuery();

  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState(userData.data?.bio ?? "");

  const [selectedFile, setSelectedFile] = useState<MediaSource | Blob>();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [remove, setRemove] = useState(false);

  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const photoMutation = useMutation((photo: FormData) =>
    agent.Photo.upload(photo, userData.data?.token ?? "")
  );

  const updateProfilePicMutation = useMutation(
    (body: { imageUrl: string; bio: string }) =>
      agent.UserInfo.updateProfilePic(
        body,
        userData.data?.token ?? "",
        userData.data?.username ?? ""
      )
  );

  const changePasswordMutation = useMutation(
    (body: PasswordDto) =>
      agent.Account.changePassword(
        body,
        userData.data?.username ?? "",
        userData.data?.token ?? ""
      ),
    {
      onError: () =>
        setErrorText(
          "Your old password was entered incorrectly, please try again"
        ),
      onSuccess: () => setErrorText(""),
    }
  );

  const editButtonText = editMode ? "Cancel" : "Edit";

  const handleLogout = () => {
    window.localStorage.setItem("jwt", "");
    navigate("/login");
  };

  const handleUpload = async (event: any) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSave = async () => {
    // check if bio is being changed,if so then check character count 
    if(editMode && bio.length > 150) {
      setErrorText("You're bio must be less than 150 characters")
      return
    }
    setLoading(true);
    const photoData = new FormData();
    if (selectedFile) photoData.append("file", selectedFile as Blob);

    if (userData.data && isFilePicked && editMode) {
      // add a profile picture and change the bio
      const data = (await photoMutation.mutateAsync(photoData)) as {
        id: string;
        url: string;
      };
      await updateProfilePicMutation.mutateAsync({
        imageUrl: data.url,
        bio: bio,
      });
      setEditMode(false);
      setBio("");
      setIsFilePicked(false);
    } else if (isFilePicked) {
      // add a profile picture only
      const data = (await photoMutation.mutateAsync(photoData)) as {
        id: string;
        url: string;
      };
      await updateProfilePicMutation.mutateAsync({
        imageUrl: data.url,
        bio: "",
      });
      setIsFilePicked(false);
      setSelectedFile(undefined);
    } else if (editMode && remove) {
      // add bio and remove profile pic
      await updateProfilePicMutation.mutateAsync({ imageUrl: "", bio: bio });
      setEditMode(false);
      setBio("");
    } else if (editMode) {
      // add bio only
      await updateProfilePicMutation.mutateAsync({
        imageUrl: "null",
        bio: bio,
      });
      setEditMode(false);
      setBio("");
    } else if (remove) {
      // remove profile pic only
      await updateProfilePicMutation.mutateAsync({ imageUrl: "", bio: "" });
    }

    // change password
    if (oldPassword !== "" && newPassword !== "") {
      await changePasswordMutation.mutateAsync({
        oldPassword: oldPassword,
        newPassword: newPassword,
        username: userData.data?.username ?? "",
      });
      setOldPassword("");
      setNewPassword("");
    }
    setLoading(false);
  };

  const removeImage = (): void => {
    setIsFilePicked(false);
    setSelectedFile(undefined);
    setRemove(true);
  };

  return (
    <div className="page-container blue-pink-white">
      <NavBar isLoggedIn={true} username={userData.data?.username ?? ""} />
      <div className="settings-div">
        <p className="settings-title">Account Info</p>
        <div className="picture-div">
          {isFilePicked ? (
            <img
              alt=""
              className="settings-profile-pic"
              src={URL.createObjectURL(selectedFile as MediaSource)}
            />
          ) : userData.data?.image && userData.data?.image !== "" && !remove ? (
            <img
              alt=""
              className="settings-profile-pic"
              src={userData.data?.image}
            />
          ) : (
            <img
              alt=""
              className="settings-profile-pic"
              src="data:image/png;base64,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"
            />
          )}
          <Button className="settings-change" component="label">
            Change{" "}
            <input type="file" name="file" hidden onChange={handleUpload} />
          </Button>
          {(isFilePicked ||
            (userData.data?.image && userData.data?.image !== "")) && (
            <Button
              className="settings-remove"
              component="label"
              onClick={() => removeImage()}
            >
              Remove
            </Button>
          )}
        </div>
        <div className="info-div">
          <div className="settings-userinfo">
            <p>
              <strong>Username</strong>
            </p>
            <p>{userData.data?.username}</p>
          </div>
          <div className="settings-userinfo">
            <p>
              <strong>Email</strong>
            </p>
            <p>{userData.data?.email}</p>
          </div>
          <div className="settings-bio-div">
            <p>
              <strong>Bio</strong>
            </p>
            {editMode ? (
              <>
                <textarea
                  className="settings-bio-input"
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                ></textarea>
              </>
            ) : (
              <p className="settings-bio-div-p">{userData.data?.bio}</p>
            )}
            <Button
              onClick={() => setEditMode((prev) => !prev)}
              className="settings-edit-button"
            >
              {editButtonText}
            </Button>
          </div>
          <div className="settings-password-div">
            <p>
              <strong>Change Password</strong>
            </p>
            <p>Old password</p>
            <input
              type="password"
              value={oldPassword}
              onChange={(event) => setOldPassword(event.target.value)}
            ></input>
            <p className="password-error">{errorText}</p>
            <p>New password</p>
            <input
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            ></input>
          </div>
          {loading ? (
            <>
              <LinearProgress color="inherit" className="settings-loading"></LinearProgress>
            </>
          ) : (
            <>
              <Button className="settings-save-button" onClick={handleSave}>
                Save
              </Button>
              <Button
                className="settings-logout-button"
                onClick={() => handleLogout()}
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
