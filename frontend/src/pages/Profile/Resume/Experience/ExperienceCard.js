import { useState } from "react";

const ExperienceCard = ({exp,update,remove}) => {
    const [experience,setExperience] = useState(exp);
    const [edit,setEdit] = useState("true");
    const toggleEditButton = (e) => {
        if(edit === "true") {
            setEdit("");
        }else{
            setExperience(exp);
            setEdit("true");
        }
    }
    const valueChangeHandler = (e) => {
        setExperience({...experience,[e.target.name]:e.target.value});
    }
    const deleteItem = () => {
        remove(experience.id)
    }

    const updateItem = () => {
        update(experience.id,experience);
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
                <label className="form-label">College Name</label>
                <input type="text" class="form-control" onChange={valueChangeHandler} value={experience.organisationName} name={Object.keys(experience)[2]} disabled={`${edit}`} placeholder="Enter college name" />
            </div>
            <div className="col-md-4 mb-2 form-group">
                <label className="form-label">University, Board Name</label>
                <input type="text" class="form-control" onChange={valueChangeHandler} value={experience.role} name={Object.keys(experience)[3]} disabled={`${edit}`} placeholder="Enter University / Board Name" />
            </div>

            <div className="col-md-4 mb-2 form-group">
                <label className="form-label">Courses , description</label>
                <input type="text" class="form-control" onChange={valueChangeHandler} value={experience.loaction} name={Object.keys(experience)[6]} disabled={`${edit}`} placeholder="Enter email" />
            </div>
            <div className="col-md-12 mb-2 form-group">
                <label className="form-label">Courses , description</label>
                <textarea  class="form-control" onChange={valueChangeHandler} value={experience.description} name={Object.keys(experience)[7]} disabled={`${edit}`} placeholder="Enter email" />
            </div>

            <div className="col-md-5 mb-2 form-group">
                <label className="form-label">Start Date </label>
                <input type="date" class="form-control" onChange={valueChangeHandler} value={experience.startDate} name={Object.keys(experience)[4]} disabled={`${edit}`} placeholder="Enter email" />
            </div>
            <div className="col-md-5 mb-2 form-group">
                <label className="form-label">End Date</label>
                <input type="date" class="form-control" onChange={valueChangeHandler} value={experience.endDate} name={Object.keys(experience)[5]} disabled={`${edit}`} placeholder="Enter email" />
            </div>
        </div>
    )
}

export default ExperienceCard;