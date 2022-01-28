const SkillCard = ({ skill,remove}) => {
    const removeSkill = () => {
        remove(skill.id);
    }
    return (
        <div className="col-auto d-flex fs-4 m-2">
            <span class="badge bg-light text-dark px-3">{skill.skillName} <span className="btn btn-sm btn-outline-secondary" onClick={removeSkill}><i class="bi bi-x"></i></span></span>
        </div>
    )
}

export default SkillCard;