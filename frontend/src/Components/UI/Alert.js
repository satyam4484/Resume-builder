const Alert = ({type,message}) => {
    const val = "danger";
    return (
        <div className={`alert alert-dismissible alert-${type}`}>
            <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
            <strong>{message}</strong>
        </div>
    )
}

export default Alert;