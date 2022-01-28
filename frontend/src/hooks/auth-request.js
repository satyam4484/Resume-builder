import { useContext } from "react";
import AuthContext from "../store/auth-request";
const url="http://127.0.0.1:8000/api/";

// this is the custom hook component which is used to make api calls 

const useRequest = ()=>{
    const auth = useContext(AuthContext);
    
    let header = {
        "Content-Type": "multipart/form-data",
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    if(auth.isLoggedIn) {
        header = {
            'Content-Type': 'application/json',
            "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
    }

    const sendRequest = async (requestConfig,successHandler,errorhandler)=> {
        try{
            const response = await fetch(`${url}${requestConfig.url}`,{
                method:requestConfig.method?requestConfig.method:"GET",
                headers:requestConfig.headers?requestConfig.headers:header,
                body:requestConfig.body?requestConfig.body:null
            });
            const data = await response.json();
            successHandler(data);

        }catch(error) {
            errorhandler(error);
        }
    };
    return {
        sendRequest
    };
};

export default useRequest;