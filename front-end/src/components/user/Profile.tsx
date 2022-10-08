import { Button } from "@mui/material";
import { Post } from "../post/Post";
import "./user.css";

const posts = [
  {
    title: 'Cute white sweater',
    description: "Just a simple sweater, drafted this pattern from a sweater I own",
    likes: 40,
    author: 'jasmeensews',
    id: 1,
    photoUrl: 'https://images.unsplash.com/photo-1545205597-ad550b48864f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c3dlYXRlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    title: 'Cute white sweater',
    description: "Just a simple sweater, drafted this pattern from a sweater I own",
    likes: 40,
    author: 'jasmeensews',
    id: 1,
    photoUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZHJlc3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
  },
  {
    title: 'Cute white sweater',
    description: "Just a simple sweater, drafted this pattern from a sweater I own",
    likes: 40,
    author: 'jasmeensews',
    id: 1,
    photoUrl: 'https://images.unsplash.com/photo-1586693231040-e89840e7d805?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGRyZXNzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    title: 'Cute white sweater',
    description: "Just a simple sweater, drafted this pattern from a sweater I own",
    likes: 40,
    author: 'jasmeensews',
    id: 1,
    photoUrl: 'https://images.unsplash.com/photo-1545205597-ad550b48864f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c3dlYXRlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    title: 'Cute white sweater',
    description: "Just a simple sweater, drafted this pattern from a sweater I own",
    likes: 40,
    author: 'jasmeensews',
    id: 1,
    photoUrl: 'https://images.unsplash.com/photo-1545205597-ad550b48864f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c3dlYXRlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    title: 'Cute white sweater',
    description: "Just a simple sweater, drafted this pattern from a sweater I own",
    likes: 40,
    author: 'jasmeensews',
    id: 1,
    photoUrl: 'https://images.unsplash.com/photo-1545205597-ad550b48864f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c3dlYXRlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    title: 'Cute white sweater',
    description: "Just a simple sweater, drafted this pattern from a sweater I own",
    likes: 40,
    author: 'jasmeensews',
    id: 1,
    photoUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZHJlc3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
  },
  {
    title: 'Cute white sweater',
    description: "Just a simple sweater, drafted this pattern from a sweater I own",
    likes: 40,
    author: 'jasmeensews',
    id: 1,
    photoUrl: 'https://images.unsplash.com/photo-1586693231040-e89840e7d805?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGRyZXNzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    title: 'Cute white sweater',
    description: "Just a simple sweater, drafted this pattern from a sweater I own",
    likes: 40,
    author: 'jasmeensews',
    id: 1,
    photoUrl: 'https://images.unsplash.com/photo-1545205597-ad550b48864f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c3dlYXRlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    title: 'Cute white sweater',
    description: "Just a simple sweater, drafted this pattern from a sweater I own",
    likes: 40,
    author: 'jasmeensews',
    id: 1,
    photoUrl: 'https://images.unsplash.com/photo-1545205597-ad550b48864f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c3dlYXRlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    title: 'Cute white sweater',
    description: "Just a simple sweater, drafted this pattern from a sweater I own",
    likes: 40,
    author: 'jasmeensews',
    id: 1,
    photoUrl: 'https://images.unsplash.com/photo-1545205597-ad550b48864f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c3dlYXRlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    title: 'Cute white sweater',
    description: "Just a simple sweater, drafted this pattern from a sweater I own",
    likes: 40,
    author: 'jasmeensews',
    id: 1,
    photoUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZHJlc3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
  },
  {
    title: 'Cute white sweater',
    description: "Just a simple sweater, drafted this pattern from a sweater I own",
    likes: 40,
    author: 'jasmeensews',
    id: 1,
    photoUrl: 'https://images.unsplash.com/photo-1586693231040-e89840e7d805?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGRyZXNzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    title: 'Cute white sweater',
    description: "Just a simple sweater, drafted this pattern from a sweater I own",
    likes: 40,
    author: 'jasmeensews',
    id: 1,
    photoUrl: 'https://images.unsplash.com/photo-1545205597-ad550b48864f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c3dlYXRlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    title: 'Cute white sweater',
    description: "Just a simple sweater, drafted this pattern from a sweater I own",
    likes: 40,
    author: 'jasmeensews',
    id: 1,
    photoUrl: 'https://images.unsplash.com/photo-1545205597-ad550b48864f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c3dlYXRlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    title: 'Cute white sweater',
    description: "Just a simple sweater, drafted this pattern from a sweater I own",
    likes: 40,
    author: 'jasmeensews',
    id: 1,
    photoUrl: 'https://images.unsplash.com/photo-1545205597-ad550b48864f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c3dlYXRlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    title: 'Cute white sweater',
    description: "Just a simple sweater, drafted this pattern from a sweater I own",
    likes: 40,
    author: 'jasmeensews',
    id: 1,
    photoUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZHJlc3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
  },
  {
    title: 'Cute white sweater',
    description: "Just a simple sweater, drafted this pattern from a sweater I own",
    likes: 40,
    author: 'jasmeensews',
    id: 1,
    photoUrl: 'https://images.unsplash.com/photo-1586693231040-e89840e7d805?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGRyZXNzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    title: 'Cute white sweater',
    description: "Just a simple sweater, drafted this pattern from a sweater I own",
    likes: 40,
    author: 'jasmeensews',
    id: 1,
    photoUrl: 'https://images.unsplash.com/photo-1545205597-ad550b48864f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c3dlYXRlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    title: 'Cute white sweater',
    description: "Just a simple sweater, drafted this pattern from a sweater I own",
    likes: 40,
    author: 'jasmeensews',
    id: 1,
    photoUrl: 'https://images.unsplash.com/photo-1545205597-ad550b48864f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c3dlYXRlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  },
]

export const Profile = (props: {isLoggedInUser: boolean, }) => {
  // get username of user from query string
  
  return (
    <>
      <div className="user-container">
        <div className="profile-pic">
          <img
            className="ppic"
            src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
            alt=""
          />
          <p className="username">Jasmeen Sran</p>
        </div>
        <div className="user-info">
          <div className="following">
            <p>
              <strong>22</strong>
            </p>
            <p>followers</p>
          </div>
          <div className="following">
            <p>
              <strong>22</strong>
            </p>
            <p>followers</p>
          </div>
          <div className="button-div">
          {/* make sure to show settings button if user is viewing their own profile */}

            <Button className="follow-button">Follow</Button>
          </div>
        </div>
        <div className="bio-div">
            <p>Hey! I'm a self taught 'seamstress'(don't really think I'm a seamstress but whatever LOL). Most of my projects are 
              self drafted, I have a few that are from patterns. Most of the time, I just use my own clothing to create patterns! 
            </p>
          </div>
      </div>
      <div className="post-wrap">
        {posts.map((p) => {
          return (<div className='post-margin'>
            <Post post={p} token="123" />
          </div>)
        })}
      </div>
    </>
  );
};
