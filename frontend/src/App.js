import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Layout from "./Components/Layout/Layout";
import Body from "./Components/Layout/Body";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AuthContext from "./store/auth-request";
import Profile from "./pages/Profile/Profile";
import Layout1 from "./Components/ReumeContent/Layout1";

const App = () => {
    const auth = useContext(AuthContext);
    return (
        // contains the layout of the website 
        <Layout>
            <Routes>
                {/* all different routes for the project */}
                <Route path="/" exact element={<Body />} />
                {!auth.isLoggedIn && <Route path="/login" element={<Login />} />}
                {!auth.isLoggedIn && <Route path="/signup" element={<Signup />} />}
                {auth.isLoggedIn && <Route path="/profile/:user" element={<Profile />} />}
                {auth.isLoggedIn && <Route path="/profile/:user/resume" element={<Layout1 />} />}
                <Route path="*" element={<Navigate replace to="/"/>} />
            </Routes>
        </Layout>
    )
}

export default App;