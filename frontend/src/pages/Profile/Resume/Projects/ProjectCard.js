import { useState } from "react";

const ProjectCard = ({proj,update,remove}) => {
    const [edit,setEdit] = useState("true");
    const [project,setProject] = useState(proj)
    const toggleEditButton = (e) => {
        if(edit === "true") {
            setEdit("");
        }else{
            setProject(proj);
            setEdit("true");
        }
    }
    const valueChangeHandler = (e) => {
        setProject({...project,[e.target.name]:e.target.value});
    }
    const deleteItem = () => {
        remove(project.id)
    }

    const updateItem = () => {
        update(project.id,project);
        setEdit("true");
    }

    return (
        <div className="row justify-content-center border rounded p-2 mt-2">
            <div className="d-flex justify-content-end mt-2">
                {edit === "true" && <button className="btn btn-outline-warning mx-2 px-1 py-0" onClick={toggleEditButton}><i class="bi bi-pencil-square"></i></button>}
                {edit === "true" && <button className="btn btn-outline-danger mx-2 px-1 py-0" onClick={deleteItem}><i class="bi bi-trash"></i></button>}
                {edit === "" && <button className="btn btn-outline-danger mx-2  px-1 py-0 " onClick={toggleEditButton}><i class="bi bi-x-lg"></i></button>}
                {edit === "" && <button className="btn btn-outline-success mx-2  px-1 py-0 " onClick={updateItem}><i class="bi bi-cloud-arrow-up"></i></button>}
            </div>

            {/* card data  */}
            <div className="col-md-4 mb-2 form-group">
                <label className="form-label">Project Title</label>
                <input type="text" class="form-control" onChange={valueChangeHandler} value={project.projectTitle} name={Object.keys(project)[1]} disabled={`${edit}`} placeholder="Enter college name" />
            </div>
            <div className="col-md-4 mb-2 form-group">
                <label className="form-label">project sub Title</label>
                <input type="text" class="form-control" onChange={valueChangeHandler} value={project.projectSubTitle} name={Object.keys(project)[2]} disabled={`${edit}`} placeholder="Enter University / Board Name" />
            </div>

            <div className="col-md-4 mb-2 form-group">
                <label className="form-label">project Link</label>
                <input type="text" class="form-control" onChange={valueChangeHandler} value={project.projectLink} name={Object.keys(project)[5]} disabled={`${edit}`} placeholder="Enter University / Board Name" />
            </div>

            <div className="col-md-12 mb-2 form-group">
                <label className="form-label">project Description</label>
                <textarea  class="form-control" onChange={valueChangeHandler} value={project.projectDescription} name={Object.keys(project)[3]} disabled={`${edit}`} placeholder="Enter email" />
            </div>
        </div>
    )
}

export default ProjectCard;