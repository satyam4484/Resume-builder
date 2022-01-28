const AchievementList = ({achievement,remove}) => {
    const removeSkill = () => {
        remove(achievement.id);
    }
    return (
        <div className="col-12 d-flex m-2">
            <span class="badge bg-light text-dark px-3 fs-5 text-wrap">{achievement.archieved} <span className="btn btn-sm btn-outline-secondary" onClick={removeSkill}><i class="bi bi-x"></i></span></span>
        </div>
    )
}

export default AchievementList;