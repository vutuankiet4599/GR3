import PropTypes from "prop-types";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
const PdfRender = ({ cv }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <div style={{ height: "720px" }}>
                <Viewer fileUrl={cv} plugins={[defaultLayoutPluginInstance]} />
            </div>
        </Worker>
    );
};

PdfRender.propTypes = {
    cv: PropTypes.string,
};

export default PdfRender;
