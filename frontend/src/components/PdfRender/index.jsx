import PropTypes from "prop-types";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const PdfRender = ({ cv }) => {
    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer fileUrl={cv} />
        </Worker>
    );
};

PdfRender.propTypes = {
    cv: PropTypes.string,
};

export default PdfRender;
