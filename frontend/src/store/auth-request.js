import React,{useState,useEffect,createContext} from "react";
import { useNavigate } from "react-router-dom";
import useRequest from "../hooks/auth-request";
import request from "../request";

// context api for the user 
const AuthContext = React.createContext({
    isLoggedIn:false,
    onLogin:()=>{},
    onLogout:()=>{}
});

export const AuthContextProvider = (props) =>{
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const send = useRequest();
    useEffect(() =>{
        const isuser = localStorage.getItem("user");
        if(isuser){
            setIsLoggedIn(true);
        }
    },[]);

    const setUser = (response)=> {
        if(response.error === false) {
            localStorage.setItem("user",JSON.stringify(response.data));
        }
    }
    const loginHandler = (token) =>{
        localStorage.setItem("token",token);
        send.sendRequest({
            url:request.createAccount,
            headers:{
                "Content-Type": "application/json",
                "Authorization":`Bearer ${token}`
            }
        },setUser,(error)=>console.log(error));
        setIsLoggedIn(true);
        
    }

    const logoutHandler = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn:isLoggedIn,
            onLogin:loginHandler,
            onLogout:logoutHandler
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;