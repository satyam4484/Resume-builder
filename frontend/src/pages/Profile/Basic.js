import { useState,useEffect } from "react";
import request from "../../request";
import useRequest from "../../hooks/auth-request";


const Basic = ({ users }) => {
    
    const [edit,setEdit] = useState("true");
    const [user,setUser] = useState(users);
    const agent = useRequest();
    var formdata = new FormData();
    const userdata = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        setUser(users);
    },[users]);

    const toggleEditButton = () => {
        if(edit === "true") {
            setEdit("");
        }else{
            setUser(users);
            setEdit("true");
        }
    }
    
    const valueChangeHandler = (e) => {
        setUser({...user,[e.target.name]:e.target.value});
    }

    const onUpdate = (response) => {
        setUser(response.data);
        setEdit("true");
    }
    
    const updateProfileHandler = (e) => {
        for(let item in user) {
            if(item != "profilePic"){
                formdata.append(item,user[item]);
            }
        }
        
        agent.sendRequest({
            url:request.getUserProfile,
            method:"PATCH",
            body:formdata
            
        },onUpdate,(error) => console.log(error));
        
    }
    return (
        <div className="accordion mt-2" id="accordionExample">
            <div className="accordion-item acc-item">
                <h2 className="accordion-header text-center" id="basicdetails">
                    <button className="accordion-button text-warning acc-btn border-warning" type="button" data-bs-toggle="collapse" data-bs-target="#detailsbody" aria-expanded="false" aria-controls="detailsbody">
                        Basic Details
                    </button>
                </h2>
                <div id="detailsbody" className="accordion-collapse collapse show" aria-labelledby="basicdetails" data-bs-parent="#accordionExample">
                    <div className="accordion-body text-dark">
                        <div className="row justify-content-center border rounded p-2">
                            <div className="d-flex justify-content-end mt-2">
                                {edit ==="true" && <button className="btn btn-outline-warning mx-2 px-1 py-0" onClick={toggleEditButton}><i class="bi bi-pencil-square"></i></button>}
                                {edit ==="" && <button className="btn btn-outline-danger mx-2  px-1 py-0 " onClick={toggleEditButton}><i class="bi bi-x-lg"></i></button>}
                                {edit ==="" && <button className="btn btn-outline-success mx-2  px-1 py-0 " onClick={updateProfileHandler}><i class="bi bi-cloud-arrow-up"></i></button>}
                            </div>
                            <div className="col-md-4 mb-2 form-group">
                                <label className="form-label">First Name</label>
                                <input type="text" class="form-control" value={userdata.first_name} disabled="true" placeholder="Your First name" />
                            </div>
                            <div className="col-md-4 mb-2 form-group">
                                <label className="form-label">Last Name</label>
                                <input type="text" class="form-control" value={userdata.last_name} disabled="true" placeholder="your last name" />
                            </div>
                            <div className="col-md-4 mb-2 form-group">
                                <label className="form-label">Email</label>
                                <input type="text" class="form-control" value={userdata.email} disabled="true" placeholder="Enter email" />
                            </div>

                            <div className="col-md-4 mb-2 form-group">
                                <label className="form-label">Contact No</label>
                                <input type="number" class="form-control" onChange={valueChangeHandler} value={user.contactNo} name={Object.keys(user)[6]} disabled={`${edit}`} placeholder="Contact details" />
                            </div>
                            <div className="col-md-4 mb-2 form-group">
                                <label className="form-label">github</label>
                                <input type="text" class="form-control" onChange={valueChangeHandler} value={user.github} disabled={`${edit}`} name={Object.keys(user)[4]} placeholder="github profile link" />
                            </div>
                            <div className="col-md-4 mb-2 form-group">
                                <label className="form-label">Linkedin</label>
                                <input type="text" class="form-control" onChange={valueChangeHandler} value={user.linkedin} disabled={`${edit}`}  name={Object.keys(user)[5]} placeholder="linkedin profile link" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Basic;