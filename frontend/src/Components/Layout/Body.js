import img from "../../images/content.png";
// this is main body when the user first comes to the site
const Body = () => {
    return (
        <div className="container-fluid">
            <div className="row mt-5">
                <div className="col-lg-8  col-md-12 col-12">
                    <img src={img} alt="image" className="img-fluid" />
                </div>
                <div className="col-lg-4 col-12 mb-2 text-center">
                    <h3 className="mt-3 pt-5 fs-2 mb-3 text-warning">Welcome to Resume Builder</h3>
                    <h1 className="mt-5 pt-5 text-dark" style={{fontSize:"50px"}}>Make Your Resume more powerfull and impress Recruiters</h1>
                    {/* <button className="btn btn-success mt-5 px-4 fs-1 shadow-lg">Build Now</button> */}
                </div>
                
            </div>
        </div>
    )
}

export default  Body;
