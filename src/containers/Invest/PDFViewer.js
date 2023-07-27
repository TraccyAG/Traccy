import React, {useState} from 'react';
import {Document, Page, pdfjs} from 'react-pdf';

// Set the workerSrc property to the location of the pdf.worker.js file from the react-pdf library
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const MyDocument = ({blob}) => {
    const [numPages, setNumPages] = useState(null);

    function onDocumentLoadSuccess({numPages}) {
        setNumPages(numPages);
    }

    return (
        <div>
            <Document
                file={blob}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                {/* Loop through all pages and render each one */}
                {[...Array(numPages).keys()].map(pageIndex => (
                    <Page key={pageIndex} pageNumber={pageIndex + 1}/>
                ))}
            </Document>
        </div>
    );
};

export default MyDocument;
