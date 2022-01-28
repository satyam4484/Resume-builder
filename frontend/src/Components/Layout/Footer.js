import "./Footer.css";
// this is the footer component 
const Footer = () =>{
    return (
        <div className="container-fluid sticky-bottom mt-5">
            <div className="row ft" style={{marginTop:"28vh"}}>
                <div className="col-md-8 ft-1">
                    Build by s@tyamSingh using React and Django
                </div>
                <div className="col-md-4 ft-2">
                    satyam singh &#169; RD
                </div>
            </div>
        </div>
    )
}

export default Footer;

