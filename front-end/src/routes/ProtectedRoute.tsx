import { Navigate } from "react-router-dom"
import {ReactElement} from "react"

export const ProtectedRoute = (props: {children: ReactElement}):ReactElement => {
    if(!window.localStorage.getItem("jwt")){
        return <Navigate to="/"/>
    }
    return props.children;
}