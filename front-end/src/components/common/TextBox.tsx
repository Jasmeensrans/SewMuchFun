import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import "./common.css"
export const TextBox = (props: {text: string}) => {
    const navigate = useNavigate()
    return <div className="text-box">
        <p className="text-box-title">{props.text}</p>
        <p className="text-box-text">Check out the discover page for some inspiration</p>
        <Button className="discover-button" onClick={()=> navigate('/discover')}>Discover</Button>
    </div>
}