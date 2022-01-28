import { useState, useEffect } from "react";
import useRequest from "../../../../hooks/auth-request";
import request from "../../../../request";
import EducationCard from "./EducationCard";

const initial = { collegeName: "", boardName: "", Courses: "", startDate: null,endDate:null }
const Education = () => {
    const [education, setEducation] = useState([]);
    const [addedu, setAddedu] = useState(false);
    const [eduForm, setEduForm] = useState(initial);
    const agent = useRequest();

    const onResponse = (response) => {
        setEducation(response.data);
    }

    useEffect(() => {
        agent.sendRequest({
            url: request.getEducation,
        }, onResponse, (error) => console.log(error))
    }, []);

    const deleteEducationHandler = (id) => {
        agent.sendRequest({
            url: `${request.getEducation}${id}`,
            method: "DELETE"
        }, (response) => {
            if (!response.error) {
                const newEdu = education.filter(item => item.id != id);
                setEducation(newEdu);
            }
        }, (error) => console.log(error));
    }

    const updateEducationHandler = (id, data) => {
        agent.sendRequest({
            url: `${request.getEducation}${id}`,
            method: "PATCH",
            body: JSON.stringify(data)
        }, (response) => {
            if (!response.error) {
                const update = education.filter((item) => item.id != id);
                update.push(data);
                setEducation(update);
            }
        }, (error) => console.log(error));
    }

    const addEducationToggler = () => {
        if (addedu === true) {
            setAddedu(false);
        } else {
            setAddedu(true);
        }
    }

    const addformHandler = (e)=> {
        setEduForm({...eduForm,[e.target.name]:e.target.value});
    }

    const onFormSubmit = () => {
        let val = false;
        Object.values(eduForm).map((item) => {
            if(item == null || item.trim().length === 0) {
                val = true;
                return ;
            }
        });
        if(val) {
            return;
        }
        agent.sendRequest({
            url:request.getEducation,
            method:"POST",
            body:JSON.stringify(eduForm)
        },(response) => {
            if(!response.error) {
                setEducation([...education,response.data]);
            }
        },(error)=>{
            console.log(error);
        });

        setEduForm(initial);
        setAddedu(false);

    }
    const updatededu = education;

    return (
        <div className="accordion mt-2" id="accordionExample">
            <div className="accordion-item acc-item">
                <h2 className="accordion-header text-center" id="educationdetails">
                    <button className="accordion-button text-warning acc-btn border-warning" type="button" data-bs-toggle="collapse" data-bs-target="#educationbody" aria-expanded="false" aria-controls="educationbody">
                        Education Details
                    </button>
                </h2>

                <div id="educationbody" className="accordion-collapse collapse" aria-labelledby="educationdetails" data-bs-parent="#accordionExample">

                    <div className="accordion-body text-dark">
                        {!addedu && <button className="btn btn-sm btn-primary m-2" onClick={addEducationToggler}>Add Education</button>}
                        {addedu && <button className="btn btn-sm btn-danger m-2 " onClick={addEducationToggler}>Cancel</button>}
                        {addedu && <button className="btn btn-sm btn-success m-2 " onClick={onFormSubmit}>Add</button>}

                        {/* add education form */}

                        {addedu &&
                            <div className=" row justify-content-evenly  rounded p-2">
                                
                                <div className="col-md-4 mb-2 form-group">
                                    <label className="form-label">College Name <span className="text-warning">*</span></label>
                                    <input type="text" class="form-control" name={Object.keys(eduForm)[0]} onChange={addformHandler} value={eduForm.collegeName} placeholder="Enter college name" />
                                </div>
                                <div className="col-md-4 mb-2 form-group">
                                    <label className="form-label">University, Board Name  <span className="text-warning">*</span></label>
                                    <input type="text" class="form-control" name={Object.keys(eduForm)[1]} onChange={addformHandler} value={eduForm.boardName} placeholder="Enter University / Board Name" />
                                </div>

                                <div className="col-md-4 mb-2 form-group">
                                    <label className="form-label">Courses , description <span className="text-warning">*</span></label>
                                    <input type="text" class="form-control" name={Object.keys(eduForm)[2]} onChange={addformHandler} value={eduForm.Courses} placeholder="Enter course name" />
                                </div>

                                <div className="col-md-5 mb-2 form-group">
                                    <label className="form-label">Start Date  <span className="text-warning">*</span></label>
                                    <input type="date" class="form-control" name={Object.keys(eduForm)[3]} onChange={addformHandler} value={eduForm.startDate} placeholder="Enter Start date" />
                                </div>
                                <div className="col-md-5 mb-2 form-group">
                                    <label className="form-label">End Date <span className="text-warning">*</span></label>
                                    <input type="date" class="form-control" name={Object.keys(eduForm)[4]} onChange={addformHandler} value={eduForm.endDate} placeholder="Enter Completion date " />
                                </div>
                            </div>
                        }

                        {/* education list */}
                        {updatededu.map((edu) => {
                            return (
                                <EducationCard edu={edu} update={updateEducationHandler} remove={deleteEducationHandler} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Education;