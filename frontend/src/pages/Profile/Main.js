import { Fragment } from "react";
import Basic from "./Basic";
import Education from "./Resume/Education/Education";
import Experience from "./Resume/Experience/Experience";
import Project from "./Resume/Projects/Project";
import Skills from "./Resume/Skills/Skills";
import Achievement from "./Resume/Achievement/Achievement";

// it shows all different components for the user 

const Main = ({user}) => {
    return (
        <Fragment>
            <Basic users={user}/>
            <Education/>
            <Experience/>
            <Project/>
            <Skills/>
            <Achievement/>
        </Fragment>
    )
}

export default Main;