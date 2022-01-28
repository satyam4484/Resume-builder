import { useState, useEffect } from "react";
import useRequest from "../../../../hooks/auth-request";
import request from "../../../../request";
import ExperienceCard from "./ExperienceCard";

const initialExp = { organisationName: "", role: "", loaction: "", description: "", startDate: null, endDate: null };


const Experience = () => {
    const [addexp, setAddExp] = useState(false);
    const [experience, setExperience] = useState([]);
    const [expForm, setExpForm] = useState(initialExp);

    const agent = useRequest();

    const addexperienceToggler = () => {
        if (addexp) {
            setAddExp(false);
        } else {
            setAddExp(true);
        }
    }

    useEffect(() => {
        agent.sendRequest({
            url: request.Experiences
        }, (response) => {
            if (!response.error) {
                setExperience(response.data);
            }
        }, error => console.log(error));

    }, []);

    const addformHandler = (e) => {
        setExpForm({ ...expForm, [e.target.name]: e.target.value });
    }

    const updateExperienceHandler = (id, data) => {
        agent.sendRequest({
            url: `${request.Experiences}${id}`,
            method: "PATCH",
            body: JSON.stringify(data)
        }, (response) => {
            if (!response.error) {
                const update = experience.filter((item) => item.id != id);
                update.push(data);
                setExperience(update);
            }
        }, (error) => console.log(error));
    }
    const deleteExperienceHandler = (id) => {
        agent.sendRequest({
            url: `${request.Experiences}${id}`,
            method: "DELETE"
        }, (response) => {
            if (!response.error) {
                const newExp = experience.filter(item => item.id != id);
                setExperience(newExp);
            }
        }, (error) => console.log(error));
    }

    const onFormSubmit = () => {
        let val = false;
        Object.values(expForm).map((item) => {
            if(item == null || item.trim().length === 0) {
                val = true;
                return ;
            }
        });
        if(val) {
            return;
        }
        agent.sendRequest({
            url:request.Experiences,
            method:"POST",
            body:JSON.stringify(expForm)
        },(response) => {
            if(!response.error) {
                setExperience([...experience,response.data]);
            }
        },(error)=>{
            console.log(error);
        });

        setExpForm(initialExp);
        setAddExp(false);
    }

    const updateExp = experience;
    return (
        <div className="accordion mt-2" id="accordionExample">
            <div className="accordion-item acc-item">
                <h2 className="accordion-header text-center" id="experiencesdetails">
                    <button className="accordion-button text-warning acc-btn border-warning" type="button" data-bs-toggle="collapse" data-bs-target="#experiencesbody" aria-expanded="false" aria-controls="experiencesbody">
                        Experiences Details
                    </button>
                </h2>

                <div id="experiencesbody" className="accordion-collapse collapse" aria-labelledby="experiencesdetails" data-bs-parent="#accordionExample">

                    <div className="accordion-body text-dark">
                        {!addexp && <button className="btn btn-sm btn-primary m-2" onClick={addexperienceToggler}>Add Experiences</button>}
                        {addexp && <button className="btn btn-sm btn-danger m-2 " onClick={addexperienceToggler}>Cancel</button>}
                        {addexp && <button className="btn btn-sm btn-success m-2 " onClick={onFormSubmit}>Add</button>}

                        {/* add experience form */}

                        {addexp &&
                            <div className=" row justify-content-evenly  rounded p-2">

                                <div className="col-md-4 mb-2 form-group">
                                    <label className="form-label">Organization name <span className="text-warning">*</span></label>
                                    <input type="text" class="form-control" name={Object.keys(expForm)[0]} onChange={addformHandler} value={expForm.organisationName} placeholder="Enter Organization " />
                                </div>
                                <div className="col-md-4 mb-2 form-group">
                                    <label className="form-label">Role <span className="text-warning">*</span></label>
                                    <input type="text" class="form-control" name={Object.keys(expForm)[1]} onChange={addformHandler} value={expForm.role} placeholder="Role / Positon" />
                                </div>

                                <div className="col-md-4 mb-2 form-group">
                                    <label className="form-label">Location <span className="text-warning">*</span></label>
                                    <input type="text" class="form-control" name={Object.keys(expForm)[2]} onChange={addformHandler} value={expForm.loaction} placeholder="Location" />
                                </div>

                                <div className="col-md-12 mb-2 form-group">
                                    <label className="form-label">Description</label>
                                    <textarea class="form-control" onChange={addformHandler} value={expForm.description} name={Object.keys(expForm)[3]} placeholder="Your Work / Description" />
                                </div>

                                <div className="col-md-5 mb-2 form-group">
                                    <label className="form-label">Start Date  <span className="text-warning">*</span></label>
                                    <input type="date" class="form-control" name={Object.keys(expForm)[4]} onChange={addformHandler} value={expForm.startDate} placeholder="Start date" />
                                </div>
                                <div className="col-md-5 mb-2 form-group">
                                    <label className="form-label">End Date <span className="text-warning">*</span></label>
                                    <input type="date" class="form-control" name={Object.keys(expForm)[5]} onChange={addformHandler} value={expForm.endDate} placeholder="Completion date" />
                                </div>
                            </div>
                        }

                        {/* education list */}
                        {updateExp.map((exp) => {
                            return (
                                <ExperienceCard exp={exp} update={updateExperienceHandler} remove={deleteExperienceHandler} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Experience;