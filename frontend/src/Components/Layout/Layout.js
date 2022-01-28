import { Fragment } from "react";
import Header from "./Header";
import Footer from "./Footer";

// the layout component which contains the layout the website according to the routing mechanism
const Layout = (props) => {
    return (
        <Fragment>
            <Header />
            {props.children}
            <Footer />
        </Fragment>
    )
}
export default Layout;