import "./Header.css";
import { useContext } from "react";
import AuthContext from "../../store/auth-request";
import { NavLink } from "react-router-dom";
// this is the navbar component which uses AuthContect for different routing actions

const Header = () => {
    const auth = useContext(AuthContext);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark py-3 cust-nav">
            <div className="container-fluid">
                <NavLink className="navbar-brand mx-auto fs-2" to="/">Resume Builder</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0 fs-3 nav-li">
                        <li className="nav-item">
                            <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                        </li>
                        {!auth.isLoggedIn && <li className="nav-item ">
                            <NavLink className="nav-link active" aria-current="page" to="/login">Login</NavLink>
                        </li>
                        }
                        {auth.isLoggedIn && <li className="nav-item ">
                            <NavLink className="nav-link active" aria-current="page" to={`/profile/${JSON.parse(localStorage.getItem("user")).email}`}>Profile</NavLink>
                        </li>
                        }
                    </ul>
                    {auth.isLoggedIn && <div className="d-flex">
                        <ul className="navbar-nav mb-2 mb-lg-0  nav-li">
                            <li>
                                <h5 className="mt-3 fs-3">{JSON.parse(localStorage.getItem("user")).first_name + " " + JSON.parse(localStorage.getItem("user")).last_name}</h5>

                            </li>
                            <li>
                                <button
                                    onClick={auth.onLogout}
                                    className="btn-link btn nav-link fs-3 mx-2">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>}

                </div>
            </div>
        </nav>
    )
}
export default Header;