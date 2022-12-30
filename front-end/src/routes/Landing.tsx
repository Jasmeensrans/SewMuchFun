import Authorize from "../components/authorize/Authorize";
import { NavBar } from "../components/common/NavBar";
import { Post } from "../components/post/Post";
import { Post as PostModel} from "../models/post";
import "./routes.css";

export const Landing = () => {
  const templatePost: Partial<PostModel> = {
    title: "Crocheted Sweater Vest",
    description: "This vest  only took me 2 hours to crochet, and I designed the pattern myself",
    author: "jasmeen",
    photoUrl: "https://i.pinimg.com/474x/45/d5/9c/45d59c38d3a78ddfe18a57474996d4f3.jpg"
  }
  const templatePost2: Partial<PostModel> = {
    title: "Dream wedding dress sketch",
    description: "Just did this for fun, would probably take me ages to sew 😭",
    author: "jasmeen",
    photoUrl: "https://i.pinimg.com/474x/45/3c/52/453c52d09120237d387a83a5e042cb89.jpg"
  }
  const templatePost3: Partial<PostModel> = {
    title: "Vintage 80's dress pattern",
    description: "This dress is absolutely gorgoues, brb gonna go make this",
    author: "jasmeen",
    photoUrl: "https://i.pinimg.com/564x/83/24/e3/8324e365302a83a1179343879aa5ad48.jpg"
  }
  return (
    <div className="custom-grad-2" style={{ backgroundImage: "url(/grad.png)" }}>
      <NavBar isLoggedIn={false} />
      <div className="text-container">
        <p className="landing-text">Unlimited Ideas, One Place</p>
        <div className="header-div">
          <p className="landing-header">
            Find out what other designers are creating and share your story, all
            on one platform
          </p>
        </div>
        <div className="img-box">
          <img
            alt=""
            className="landing-img"
            src="https://i.pinimg.com/474x/a0/96/80/a0968068aeb8221ec2279a6ad81c527d.jpg"
          />
          <img
            alt=""
            className="landing-img"
            src="https://i.pinimg.com/474x/54/4c/e6/544ce60b748a6ac6676a35ca0ea35a80.jpg"
          />
          <img
            alt=""
            className="landing-img"
            src="https://i.pinimg.com/474x/b2/ed/8f/b2ed8fb582be5815d6361c0690cffa44.jpg"
          />
          <img
            alt=""
            className="landing-img"
            src="https://i.pinimg.com/474x/8c/18/10/8c1810f10d3349825009be8e4db40960.jpg"
          />
        </div>
        <div className="walkthrough-div">
          <div className="block">
            <div className="w-img-block left">
              <div className="w-img-block-img-l">
                <Post post={templatePost} username="123" token="123" isOwner={false}></Post>
              </div>
              <div className="color-div-blue">
              </div>
            </div>
            <div className="right w-text-div">
              <p className="w-title">How it works</p>
              <p className="w-text">A picture, a title, a description, that's all you need to create your first post. Clicking on the post will reveal all the juicy details</p>
            </div>
          </div>
          <div className="block">
            <div className="w-img-block right">
              <div className="w-img-block-img-r">
                <Post post={templatePost2} username="123" token="123" isOwner={false}></Post>
              </div>
              <div className="color-div-pink">
              </div>
            </div>
            <div className="left w-text-div l-text">
              <p className="w-title">Share you sketches too</p>
              <p className="w-text">After all, every sewsterpiece starts with a sketch, right?</p>
            </div>
          </div>
          <div className="block">
            <div className="w-img-block left">
              <div className="w-img-block-img-l">
                <Post post={templatePost3} username="123" token="123" isOwner={false}></Post>
              </div>
              <div className="color-div-green">
              </div>
            </div>
            <div className="right w-text-div">
              <p className="w-title">Share your favorite patterns</p>
              <p className="w-text">Make sure to include a link so everyone can find it!</p>
            </div>
          </div>
        </div>
        <div className="outer-signup-box">
          <p className="sign-up-text">Sign up to share your ideas</p>
          <div className="shadow-img-box">
          <img className="shadow-img"  alt="" src="https://i.pinimg.com/474x/6f/41/2b/6f412beef1c76aa553425521bed211bc.jpg"/>
          <img className="shadow-img"  alt="" src="https://i.pinimg.com/474x/60/9c/8e/609c8e0ef5f5daa55a658a1a56f70336.jpg"/>
          <img className="shadow-img"  alt="" src="https://i.pinimg.com/474x/13/57/a5/1357a58e809ef621117ff22f6a4887b4.jpg"/>
          <img className="shadow-img"  alt="" src="https://i.pinimg.com/474x/e4/f8/97/e4f897d2f38e8ab9518bbfd9d1dad5bc.jpg"/>
          <img className="shadow-img"  alt="" src="https://i.pinimg.com/474x/c0/6c/37/c06c37753bf7a73adf72fe6f1b5e12d6.jpg"/>
          <img className="shadow-img"  alt="" src="https://i.pinimg.com/474x/d2/fb/39/d2fb39da11a0e82798cff99df1e85608.jpg"/>
          </div>
          <div className="signup-box">
            <Authorize isLogin={false} />
          </div>
        </div>
      </div>
    </div>
  );
};
