// it holds the pdf content which is to be displayed when the user wants to see his / her resume

const ResumeLay = ({ user }) => {
    console.log(user);
    return (
        
        <div className="wrapper">
            <div className="sidebar-wrapper">
                <div className="profile-container">
                    <img className="profile" src={user.userprofile.profilePic} className="img-fluid" alt="" />
                    <h1 className="name">{user.userdata.name}</h1>
                    <h3 className="tagline">{user.userprofile.professionalTitle}</h3>
                </div>

                <div className="contact-container container-block">
                    <ul className="list-unstyled contact-list">
                        <li className="email"><i className="bi bi-envelope-fill"></i><a href={`mailto: ` + user.userdata.email} className="mx-1" target="_blank">{user.userdata.email}</a></li>
                        <li className="phone"><i className="bi bi-telephone-fill"></i><a href="tel:0123 456 789" className="mx-1">{user.userprofile.contactNo}</a></li>
                        {/* <li className="website"><i className="fas fa-globe"></i><a href="https://themes.3rdwavemedia.com/bootstrap-templates/resume/orbit-free-resume-cv-bootstrap-theme-for-developers/" target="_blank">portfoliosite.com</a></li> */}
                        <li className="linkedin"><i className="bi bi-linkedin"></i><a href={user.userprofile.linkedin} className="mx-1" target="_blank">Linkedin</a></li>
                        <li className="github"><i className="bi bi-github"></i><a href={user.userprofile.github}className="mx-1" target="_blank">Github</a></li>
                        {/* <li className="twitter"><i className="fab fa-twitter"></i><a href="https://twitter.com/3rdwave_themes" className="mx-1" target="_blank">@twittername</a></li> */}
                    </ul>
                </div>

                {/* education details */}
                <div className="education-container container-block">
                    <h2 className="container-block-title">Education</h2>
                    {user.education.map(edu =>
                        <div className="item" key={edu.id}>
                            <h4 className="degree">{edu.Courses}</h4>
                            <h5 className="meta">{edu.collegeName}</h5>
                            <h5 className="meta">{edu.boardName}</h5>
                            <div className="time">{edu.startDate.slice(0, 4)} - {edu.endDate.slice(0, 4)}</div>
                        </div>)
                    }
                </div>

                {/* skills */}
                <div className="languages-container container-block">
                    <h2 className="container-block-title">SKILLS</h2>
                    <ul className="list-unstyled interests-list">
                        {user.skill.map(skill => <li key={skill.id}>{skill.skillName}</li>)}


                    </ul>
                </div>

                {/* <div className="interests-container container-block">
                    <h2 className="container-block-title">Interests</h2>
                    <ul className="list-unstyled interests-list">
                        <li>Climbing</li>
                        <li>Snowboarding</li>
                        <li>Cooking</li>
                    </ul>
                </div> */}

            </div>

            <div className="main-wrapper">

                {/* headline  */}
                <section className="section summary-section">
                    <h2 className="section-title"><span className="icon-holder fs-5"><i className="bi bi-person"></i></span>Career Profile</h2>
                    <div className="summary">
                        <p>{user.userprofile.headline}</p>
                    </div>
                </section>


                {/* experiences */}
                <section className="section experiences-section">
                    <h2 className="section-title"><span className="icon-holder fs-5"><i className="bi bi-briefcase"></i></span>Experiences</h2>
                    {user.experience.map(item =>
                        <div className="item" key={item.id}>
                            <div className="meta">
                                <div className="upper-row">
                                    <h3 className="job-title">{item.role}</h3>
                                    <div className="time">{item.startDate.replaceAll("-", "/")} --  {item.endDate.replaceAll("-", "/")}</div>
                                </div>
                                <div className="company">{item.organisationName}</div>
                            </div>
                            <div className="details">
                                {item.description.split(".").map(it => <p className="mb-1">{it}</p>)}
                            </div>
                        </div>

                    )}




                </section>
                
                {/* projects  */}
                <section className="section projects-section">
                    <h2 className="section-title"><span className="icon-holder fs-5 p-1"><i className="bi bi-archive"></i></span>Projects</h2>
                    {user.project.map(item =>
                        <div className="item">
                            <span className="project-title"><a href={item.projectLink} target="_blank">{item.projectTitle}</a></span> - <span className="project-tagline">{item.projectDescription} </span>

                        </div>
                    )}

                    {/* <div className="item">
                        <span className="project-title"><a href="https://themes.3rdwavemedia.com/bootstrap-templates/startup/launch-bootstrap-5-template-for-saas-businesses/" target="_blank">Launch</a></span> - <span className="project-tagline">A responsive website template designed to help startups promote their products or services.</span>
                    </div>
                    <div className="item">
                        <span className="project-title"><a href="https://themes.3rdwavemedia.com/bootstrap-templates/resume/devcard-bootstrap-5-vcard-portfolio-template-for-software-developers/" target="_blank">DevCard</a></span> - <span className="project-tagline">A portfolio website template designed for software developers.</span>
                    </div>
                    <div className="item">
                        <span className="project-title"><a href="https://themes.3rdwavemedia.com/bootstrap-templates/startup/bootstrap-template-for-mobile-apps-nova-pro/" target="_blank">Nova Pro</a></span> - <span className="project-tagline">A responsive Bootstrap theme designed to help app developers promote their mobile apps</span>
                    </div>
                    <div className="item">
                        <span className="project-title"><a href="http://themes.3rdwavemedia.com/website-templates/responsive-bootstrap-theme-web-development-agencies-devstudio/" target="_blank">DevStudio</a></span> -
                        <span className="project-tagline">A responsive website template designed to help web developers/designers market their services. </span>
                    </div> */}
                </section>

                {/* achievements */}
                <section className="skills-section section">
                    <h2 className="section-title"><span className="icon-holder fs-5 p-1"><i class="bi bi-trophy"></i></span>Achievements</h2>
                    {user.achievement.map(item =><p className="mb-1">{item.archieved}</p>)}
                </section>

            </div>
        </div>
    )
}

export default ResumeLay;