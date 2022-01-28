import { useState, useEffect } from "react";
import useRequest from "../../../../hooks/auth-request";
import request from "../../../../request";
import AchievementList from "./AchievementList";

const intial= { archieved: "" }

const Achievement = () => {
    const [adachiev, setadachiev] = useState(false);
    const [achivement, setAchivement] = useState([]);
    const [achivementForm, setAchivementForm] = useState(intial);

    const agent = useRequest();
    useEffect(() => {
        agent.sendRequest({
            url: request.Achievement
        }, response => setAchivement(response.data), error => console.log(error));
    }, []);

    // console.log(achivement);

    const addSkillToggler = () => {
        if (adachiev) {
            setadachiev(false);
        } else {
            setadachiev(true);
        }
    }
    const deleteExperienceHandler = (id) => {
        agent.sendRequest({
            url: `${request.Achievement}${id}`,
            method: "DELETE"
        }, (response) => {
            if (!response.error) {
                const newExp = achivement.filter(item => item.id != id);
                setAchivement(newExp);
            }
        }, (error) => console.log(error));
    }

    const onFormSubmit = () => { 
        if(achivementForm.archieved.trim().length === 0) {
            return;
        }
        agent.sendRequest({
            url: request.Achievement,
            method: "POST",
            body:JSON.stringify(achivementForm)
        }, (response) => {
            if (!response.error) {
                setAchivement([...achivement,response.data]);
            }
        }, (error) => console.log(error));
        setAchivementForm(intial);
        setadachiev(false);
    };

    const addformHandler = (e) => {
        setAchivementForm({ ...achivementForm, [e.target.name]: e.target.value });
    };

    const updatedAchievemnt = achivement;
    return (
        <div className="accordion mt-2" id="accordionExample">
            <div className="accordion-item acc-item">
                <h2 className="accordion-header text-center" id="achievementdetails">
                    <button className="accordion-button text-warning acc-btn border-warning" type="button" data-bs-toggle="collapse" data-bs-target="#achievementbody" aria-expanded="false" aria-controls="achievementbody">
                        Achievements Details
                    </button>
                </h2>

                <div id="achievementbody" className="accordion-collapse collapse" aria-labelledby="achievementdetails" data-bs-parent="#accordionExample">

                    <div className="accordion-body text-dark">
                        {!adachiev && <button className="btn btn-sm btn-primary m-2" onClick={addSkillToggler}>Add Achievements</button>}
                        {adachiev && <button className="btn btn-sm btn-danger m-2 " onClick={addSkillToggler}>Cancel</button>}
                        {adachiev && <button className="btn btn-sm btn-success m-2 " onClick={onFormSubmit}>Add</button>}

                        {/* add experience form */}
                        {adachiev &&
                            <div className=" row justify-content-evenly  rounded p-2">

                                <div className="col-md-6 mb-2 d-flex form-group">
                                    <label className="form-label mx-2 fs-3">Achievement<span className="text-warning">*</span></label>
                                    <input type="text" class="form-control" name="archieved" onChange={addformHandler} value={achivementForm.skillName} placeholder="Achievements" />
                                </div>

                            </div>
                        }
                        
                        {updatedAchievemnt.length > 0  &&<div className="row ">
                            {updatedAchievemnt.map(achieved => <AchievementList achievement={achieved} remove={deleteExperienceHandler}/>)}
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Achievement;