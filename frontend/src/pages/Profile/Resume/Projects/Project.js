import { useState,useEffect } from "react";
import useRequest from "../../../../hooks/auth-request";
import request from "../../../../request";
import ProjectCard from "./ProjectCard";


const initialProject = {projectTitle:"",projectSubTitle:"",projectDescription:"",projectLink:""};

const Project = ()=>{
    const [addPro,setAddPro] = useState(false);
    const [projects,setProjects] = useState([]);
    const [projectForm,setProjectForm] = useState(initialProject);
    const agent = useRequest();

    useEffect(() => {
        agent.sendRequest({
            url:request.Projects
        },response => setProjects(response.data) , error => console.log(error));
    },[]);


    const addProjectToggler = () => {
        if(addPro) {
            setAddPro(false);
        }else{
            setProjectForm(initialProject);
            setAddPro(true);
        }
    }

    const updateExperienceHandler = (id, data) => {
        agent.sendRequest({
            url: `${request.Projects}${id}`,
            method: "PATCH",
            body: JSON.stringify(data)
        }, (response) => {
            if (!response.error) {
                const update = projects.filter((item) => item.id != id);
                update.push(data);
                setProjects(update);
            }
        }, (error) => console.log(error));
    }

    const deleteExperienceHandler = (id) => {
        agent.sendRequest({
            url: `${request.Projects}${id}`,
            method: "DELETE"
        }, (response) => {
            if (!response.error) {
                const newExp = projects.filter(item => item.id != id);
                setProjects(newExp);
            }
        }, (error) => console.log(error));
    }

    const onFormSubmit = () => {
        let val = false;
        Object.values(projectForm).map((item) => {
            if(item == null || item.trim().length === 0) {
                val = true;
                return ;
            }
        });
        if(val) {
            return;
        }
        agent.sendRequest({
            url:request.Projects,
            method:"POST",
            body:JSON.stringify(projectForm)
        },(response) => {
            if(!response.error) {
                setProjects([...projects,response.data]);
            }
        },(error)=>{
            console.log(error);
        });
        setProjectForm(initialProject);
        setAddPro(false);
    }

    const addformHandler = (e)=> {
        setProjectForm({...projectForm,[e.target.name]:e.target.value});
    }
    
    const updatedProject = projects;
    return (
        <div className="accordion mt-2" id="accordionExample">
            <div className="accordion-item acc-item">
                <h2 className="accordion-header text-center" id="Projectsdetails">
                    <button className="accordion-button text-warning acc-btn border-warning" type="button" data-bs-toggle="collapse" data-bs-target="#Projectsbody" aria-expanded="false" aria-controls="Projectsbody">
                        Projects Details
                    </button>
                </h2>

                <div id="Projectsbody" className="accordion-collapse collapse" aria-labelledby="Projectsdetails" data-bs-parent="#accordionExample">

                    <div className="accordion-body text-dark">
                        {!addPro && <button className="btn btn-sm btn-primary m-2" onClick={addProjectToggler}>Add Projects</button>}
                        {addPro && <button className="btn btn-sm btn-danger m-2 " onClick={addProjectToggler}>Cancel</button>}
                        {addPro && <button className="btn btn-sm btn-success m-2 " onClick={onFormSubmit}>Add</button>}

                        {/* add experience form */}
                        {addPro &&
                            <div className=" row justify-content-evenly  rounded p-2">

                                <div className="col-md-4 mb-2 form-group">
                                    <label className="form-label">Project Title <span className="text-warning">*</span></label>
                                    <input type="text" class="form-control" name={Object.keys(projectForm)[0]} onChange={addformHandler} value={projectForm.projectTitle} placeholder="Project Title " />
                                </div>
                                <div className="col-md-4 mb-2 form-group">
                                    <label className="form-label">project sub Title <span className="text-warning">*</span></label>
                                    <input type="text" class="form-control" name={Object.keys(projectForm)[1]} onChange={addformHandler} value={projectForm.projectSubTitle} placeholder="Project Sub Title" />
                                </div>

                                <div className="col-md-4 mb-2 form-group">
                                    <label className="form-label">project Link <span className="text-warning">*</span></label>
                                    <input type="text" class="form-control" name={Object.keys(projectForm)[3]} onChange={addformHandler} value={projectForm.projectLink} placeholder="link ...." />
                                </div>

                                <div className="col-md-12 mb-2 form-group">
                                    <label className="form-label">project Description</label>
                                    <textarea class="form-control" onChange={addformHandler} value={projectForm.projectDescription} name={Object.keys(projectForm)[2]} placeholder="Description about 200-300 words" />
                                </div>

                            </div>
                        }

                        {/* projects list */}
                        {updatedProject.map((proj) => {
                            return (
                                <ProjectCard proj={proj} update={updateExperienceHandler} remove={deleteExperienceHandler} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default Project;