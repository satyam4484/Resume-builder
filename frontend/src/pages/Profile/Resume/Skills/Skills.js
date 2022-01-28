import { useState, useEffect } from "react";
import useRequest from "../../../../hooks/auth-request";
import request from "../../../../request";
import SkillCard from "./SkillCard";

const intialSkill = { skillName: "" }

const Skills = () => {
    const [adskill, setadSkill] = useState(false);
    const [skills, setSkills] = useState([]);
    const [skillForm, setSkillForm] = useState(intialSkill)
    const agent = useRequest();
    useEffect(() => {
        agent.sendRequest({
            url: request.Skills
        }, response => setSkills(response.data), error => console.log(error));
    }, []);


    const addSkillToggler = () => {
        if (adskill) {
            setadSkill(false);
        } else {
            setSkillForm(intialSkill);
            setadSkill(true);
        }
    }
    const deleteExperienceHandler = (id) => {
        agent.sendRequest({
            url: `${request.Skills}${id}`,
            method: "DELETE"
        }, (response) => {
            if (!response.error) {
                const newExp = skills.filter(item => item.id != id);
                setSkills(newExp);
            }
        }, (error) => console.log(error));
    }

    const onFormSubmit = () => { 
        if(skillForm.skillName.trim().length === 0) {
            return;
        }
        agent.sendRequest({
            url: request.Skills,
            method: "POST",
            body:JSON.stringify(skillForm)
        }, (response) => {
            if (!response.error) {
                setSkills([...skills,response.data]);
            }
        }, (error) => console.log(error));
        setSkillForm(intialSkill);
        setadSkill(false);
    };

    const addformHandler = (e) => {
        setSkillForm({ ...skillForm, [e.target.name]: e.target.value });
    };

    const updatedSkills = skills;
    return (
        <div className="accordion mt-2" id="accordionExample">
            <div className="accordion-item acc-item">
                <h2 className="accordion-header text-center" id="skillsdetails">
                    <button className="accordion-button text-warning acc-btn border-warning" type="button" data-bs-toggle="collapse" data-bs-target="#skillsbody" aria-expanded="false" aria-controls="skillsbody">
                        skills Details
                    </button>
                </h2>

                <div id="skillsbody" className="accordion-collapse collapse" aria-labelledby="skillsdetails" data-bs-parent="#accordionExample">

                    <div className="accordion-body text-dark">
                        {!adskill && <button className="btn btn-sm btn-primary m-2" onClick={addSkillToggler}>Add Skills</button>}
                        {adskill && <button className="btn btn-sm btn-danger m-2 " onClick={addSkillToggler}>Cancel</button>}
                        {adskill && <button className="btn btn-sm btn-success m-2 " onClick={onFormSubmit}>Add</button>}

                        {/* add experience form */}
                        {adskill &&
                            <div className=" row justify-content-evenly  rounded p-2">

                                <div className="col-md-6 mb-2 d-flex form-group">
                                    <label className="form-label mx-2 fs-3">skill<span className="text-warning">*</span></label>
                                    <input type="text" class="form-control" name="skillName" onChange={addformHandler} value={skillForm.skillName} placeholder="skill" />
                                </div>

                            </div>
                        }
                        {skills.length > 0  &&<div className="row">
                            {skills.map(skill => <SkillCard skill={skill} remove={deleteExperienceHandler}/>)}
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Skills;