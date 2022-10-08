import Authorize from "../components/authorize/Authorize"
import { NavBar } from "../components/common/NavBar"
import './routes.css'

export const Landing = () => {
    return <>
    <NavBar isLoggedIn={false}/>
    <div className="text-container">
    <p className="landing-header">Start sharing your sewing projects with fashion designers</p>
    <p className="landing-text">Inspire other fashion designers by sharing your projects. Discover new self drafted designs or unqiue patterns.</p>
    <div className="img-box">
        <img className="landing-img" src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80"/>
        <img className="landing-img" src="https://images.unsplash.com/photo-1590343104492-972a3169bc98?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"/>
        <img className="landing-img" src="https://images.unsplash.com/photo-1532675432006-329c6fed7045?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"/>
        <img className="landing-img" src="https://images.unsplash.com/photo-1562151270-c7d22ceb586a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGZhc2hpb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"/>
    </div>
    <div className="outer-signup-box">
        <p className="sign-up-text">Sign up to share your ideas</p>
        <div className="shadow-img-box">
        <img className="shadow-img" src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80"/>
        <img className="shadow-img" src="https://images.unsplash.com/photo-1590343104492-972a3169bc98?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"/>
        <img className="shadow-img" src="https://images.unsplash.com/photo-1532675432006-329c6fed7045?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"/>
        <img className="shadow-img" src="https://images.unsplash.com/photo-1562151270-c7d22ceb586a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGZhc2hpb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"/>
        <img className="shadow-img" src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80"/>
        <img className="shadow-img" src="https://images.unsplash.com/photo-1590343104492-972a3169bc98?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"/>
        </div>
        <div className="signup-box">
            <Authorize isLogin={false}/>
        </div>
    </div>
    </div>
    </>
}