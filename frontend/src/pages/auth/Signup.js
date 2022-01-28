import { useState } from "react";
import { NavLink,Navigate } from "react-router-dom";
import img from "../../images/lg.png";
import "./Auth.css";
import request from "../../request.js";
import useRequest from "../../hooks/auth-request";
import Alert from "../../Components/UI/Alert";
import { Fragment } from "react";

// sign up component 
const Signup = () => {

    const agent = useRequest();
    const [seePassword, setSeePassword] = useState("password");
    const [firstname,setFirstName] = useState('');
    const [lastname,setlastName] = useState('');
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState("");
    const [validPassword, setValidPassword] = useState("");
    const [password, setPassword] = useState("");
    const [message,setMessage] = useState('');
    const [type,setType] = useState('');
    const togglePassword = () => {
        if (seePassword === "password") {
            setSeePassword("text");
        } else {
            setSeePassword("password");
        }
    };

    // validate email by checking the whether the email with the email already exists or not 
    const onEmailValidate = (response) => {
        if (response.error) {
            setValidEmail('is-invalid');

        } else {
            if (email.trim().length > 0 && email.includes('@')) {
                setValidEmail('is-valid');
            }
        }
    }

    // check password length at runtime 
    const passwordHandler = (e) => {
        setPassword(e.target.value);
        setTimeout(() => {
            if (password.trim().length < 8) {
                setValidPassword('is-invalid');
            } else {
                setValidPassword('is-valid');
            }
        }, 1500)
    }

    // check backend for the email already exists or not 
    const validEmailHandler = () => {
        agent.sendRequest({
            url: request.validateEmail,
            method: "POST",
            body: JSON.stringify({
                email: email
            })
        }, onEmailValidate, (error) => console.log(error));
    }

    const onResponse = (response) => {
        if (response.error === false) {
            setType('success');
            setMessage(response.msg + "You may Login Now!!!");

        }
    }

    // user sign up form 
    const submitFormHandler = (e) => {
        e.preventDefault();
        if (validEmail == 'is-invalid' || validPassword == 'is-invalid' || firstname.trim().length == 0 || lastname.trim().length == 0) {
            return;
        }
        agent.sendRequest({
            url: request.createAccount,
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password,
                first_name:firstname,
                last_name:lastname
            })
        }, onResponse, (error) => console.log(error));
        setEmail('');
        setFirstName('');
        setlastName('');
        setPassword('');
        setValidEmail('');
        setValidPassword('');
    }
    return (
        <Fragment>
            {message && <Alert type={type} message={message} />}
            <div className="container mt-5 mx-auto mb-5">
                <div className="row justify-content-evenly">
                    <div className="col-md-8 card my-card shadow-lg">
                        <div className="card-body">
                            <h1 className="text-center my-3 fw-bold text-warning py-3">
                                Signup page
                            </h1>
                            <div className="row my-3 justify-content-evenly">
                                <div className="col-md-6 ">

                                    {/* form  */}
                                    <form onSubmit={submitFormHandler}>
                                        <div className="form-group my-2 py-2">
                                            <label htmlFor="exampleInputEmail1" className="text-dark">Email address</label>
                                            <input
                                                type="email"
                                                className={`form-control ${validEmail}`}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                onBlur={validEmailHandler}
                                                placeholder="Enter email"
                                            />
                                            <div className="invalid-feedback text-warning">
                                                Sorry, that Email's taken. Try another?
                                            </div>
                                        </div>
                                        <div className="form-group my-2 py-2">
                                            <label className="text-dark">first Name <span className="text-warning">*</span></label>
                                            <input
                                                type="text"
                                                className={`form-control`}
                                                value={firstname}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                placeholder="Enter first Name"
                                            />
                                            
                                        </div>
                                        <div className="form-group my-2 py-2">
                                            <label  className="text-dark">Last Name <span className="text-warning">*</span></label>
                                            <input
                                                type="text"
                                                className={`form-control`}
                                                value={lastname}
                                                onChange={(e) => setlastName(e.target.value)}
                                                placeholder="Enter last name"
                                            />
                                            
                                        </div>
                                        <div className="form-group my-2 py-2">
                                            <label  className="text-dark">Password</label>
                                            <input
                                                type={seePassword}
                                                className={`form-control ${validPassword}`}
                                                value={password}
                                                onChange={passwordHandler}
                                                placeholder="Password"
                                            />
                                            <div className="invalid-feedback text-warning">
                                                Password length must be greater than 8?
                                            </div>
                                        </div>
                                        <div className="form-group form-check py-2">
                                            <input
                                                type="checkbox"
                                                class="form-check-input"
                                                onClick={togglePassword}
                                                id="exampleCheck1"
                                            />
                                            <label className="form-check-label text-warning" htmlFor="exampleCheck1">
                                                Check me out
                                            </label>
                                        </div>
                                        <button type="submit" className="btn btn-danger">
                                            Signup
                                        </button>
                                        <NavLink to="/login" className="mx-md-auto px-2 fs-4 text-warning">
                                            Login here
                                        </NavLink>
                                    </form>

                                    {/* form ends here */}
                                </div>
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

export default Signup;
