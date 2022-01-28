import { useState, useContext } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";
import img from "../../images/lg.png";
import AuthContext from "../../store/auth-request";
import "./Auth.css";
import Alert from "../../Components/UI/Alert";
import request from "../../request";
import useRequest from "../../hooks/auth-request";


// login page 
const Login = () => {
    const [seePassword, setSeePassword] = useState("password");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [type, setType] = useState('');
    const agent = useRequest();
    const auth = useContext(AuthContext);
    const location = useLocation();

    // toggle password visibility
    const togglePassword = () => {
        if (seePassword === "password") {
            setSeePassword("text");
        } else {
            setSeePassword("password");
        }
    };


    const onResponse = (response) => {
        if (response.detail) {
            console.log(response);
            setType('danger');
            setMessage('Please Enter Valid Credentials !!!!');
            return;
        } else {
            auth.onLogin(response.access);
            location.replace("/");
        }

    }

    // submit the form 
    const submitFormHandler = (e) => {
        e.preventDefault();
        if (email.trim().length === 0 || password.trim().length === 0) {
            setType('danger');
            setMessage('Please Enter Valid Credentials !!!!');
            return;
        }

        // api call to user login by checking whether the token comes or not 
        // if not means user have entered incorrect details 
        // else details are correct 
        agent.sendRequest({
            url: request.getToken,
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            })
        }, onResponse, (error) => console.log(error));
        setEmail('');
        setPassword('');
    }

    return (
        <Fragment>
            {message && <Alert type={type} message={message} />}
            <div className="container mt-5 mx-auto mb-5">
                <div className="row justify-content-evenly">
                    <div className="col-md-8 card my-card shadow-lg">
                        <div className="card-body">
                            <h1 className="text-center my-3 fw-bold text-warning py-3">
                                Login page
                            </h1>
                            <div className="row my-3 justify-content-evenly">
                                <div className="col-md-6 ">

                                    {/* form  */}
                                    <form onSubmit={submitFormHandler}>

                                        {/* email */}
                                        <div className="form-group my-2 py-2">
                                            <label className="text-dark">Email address</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter email"
                                            />
                                        </div>

                                        {/* password */}
                                        <div className="form-group my-2 py-2">
                                            <label className="text-dark">Password</label>
                                            <input
                                                type={seePassword}
                                                className="form-control"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Password"
                                            />
                                        </div>
                                        <div className="form-group form-check py-2">
                                            <input
                                                type="checkbox"
                                                class="form-check-input"
                                                onClick={togglePassword}
                                                id="exampleCheck1"
                                            />
                                            <label className="form-check-label text-warning" for="exampleCheck1">
                                                Check me out
                                            </label>
                                        </div>
                                        <button type="submit" className="btn btn-success">
                                            Login
                                        </button>
                                        <NavLink to="/signup" className="mx-5 fs-4 text-warning">
                                            register here?
                                        </NavLink>
                                    </form>
                                </div>

                                {/* side image */}
                                <div className="col-md-4 order-first">
                                    <img src={img} className="img-fluid my-img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
export default Login;
