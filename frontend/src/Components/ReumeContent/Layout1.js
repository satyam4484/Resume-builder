import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import { Fragment, useRef, useState, useEffect } from "react";
import useRequest from '../../hooks/auth-request';
import request from '../../request';
import "./Layout1.css";
import ResumeLay from "./ResumeLay";
import "./Resume.css";
// kendo react docs -->  https://www.telerik.com/kendo-react-ui/components/pdfprocessing/content-scaling/
// this component uses kendo-react-pdf generator for generating the content

const Layout1 = () => {
    const pdfExportComponent = useRef(null);
    const [user, setUser] = useState({});
    const [see, setSee] = useState(false);
    const agent = useRequest();

    useEffect(() => {
        agent.sendRequest({
            url: request.AllDetails
        }, response => {
            setUser(response.data);
            setSee(true);
        }, error => console.log(error));
    }, []);

    const pdfExportHandler = () => {
        pdfExportComponent.current.save();
    }

    return (
        <Fragment>
            <div className="container border shadow-lg rounded mt-5 p-4" id="resume">
                <div className="row mb-5">
                    <div className="col-12">
                        <button onClick={pdfExportHandler} className="btn btn-warning ">Download</button>
                    </div>
                </div>

                {/* this is the part which generates the pdf  */}
                {see && <PDFExport ref={pdfExportComponent} paperSize="A4" scale={0.7}>
                    <ResumeLay user={user} />
                </PDFExport>
                }
            </div>
        </Fragment >
    )
}
export default Layout1;