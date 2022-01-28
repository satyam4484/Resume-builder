import { useState, Fragment,useEffect } from "react";
import { NavLink,useLocation} from "react-router-dom";
import Main from "./Main";
import request from "../../request";
import useRequest from "../../hooks/auth-request";

const Profile = () => {
    const [imageForm, setImageForm] = useState(false);
    const [profilePic,setProfilePic] = useState(null);
    const [user,setUser] = useState({});
    const location = useLocation();
    
    const agent = useRequest();
    const formdata = new FormData();
    const onResponse = (response) => {
        setUser(response.data);
    }

    const toggleImageFormHandler = () => {
        if(imageForm === true) {
            setImageForm(false);
        }else{
            setImageForm(true);
        }
    }
    useEffect(() => {
        agent.sendRequest({
            url:request.getUserProfile,
        },onResponse,(error) =>console.log(error))
    },[]);

    const changeProfilePicHandler = (e) =>{
        e.preventDefault();
        formdata.append("profilePic",profilePic);
        agent.sendRequest({
            url:request.getUserProfile,
            method:"PATCH",
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            },
            body:formdata
        },(response) => {
            console.log(response);
            setUser(response.data)
        }
            ,(error) => console.log(error));
        setImageForm(false);
    }
    return (
        <Fragment>
            <div className="container mb-5">
                <div className="row justify-content-evenly  mt-3 card-body border mb-5">
                    <div className="col-md-12">
                        <h1 className="text-center fw-bold mb-3">Profile page</h1>
                        <NavLink to={`${location.pathname}/resume`} className="float-end mb-3 btn btn-success">View resume</NavLink>
                    </div>
                    <div className="col-md-3">
                        <img src={user.profilePic} className="img-fluid border" alt="" />
                        {!imageForm &&<button className="btn btn-sm btn-warning text-dark mt-1" onClick={toggleImageFormHandler}>edit</button>}
                        {imageForm && 
                        <div class="form-group text-dark">
                            <label for="exampleFormControlFile1" className="">Choose Profile Pic </label>
                            <input type="file" class="form-control-file mt-2" onChange={(e)=> setProfilePic(e.target.files[0])} accept="image/png, image/gif, image/jpeg" id="exampleFormControlFile1" />
                            <button className="btn btn-sm mt-2 btn-warning mx-1" onClick={changeProfilePicHandler}>upload</button>
                            <button className="btn btn-sm mt-2 btn-danger mx-1" onClick={toggleImageFormHandler}>Cancel</button>
                        </div>
                        }
                    </div>
                    <div className="col-md-8">
                        <Main user={user}/>
                    </div>
                    <hr className="mt-2"/>
                </div>
            </div>
        </Fragment>
    )
}

export default Profile;