import React, {useState} from 'react';
import {Document, Page, pdfjs} from 'react-pdf';
import {useMediaQuery} from "react-responsive";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const MyDocument = ({blob}) => {
    const [numPages, setNumPages] = useState(null);

    const isDesktopScreen = useMediaQuery({minWidth: 669});

    function onDocumentLoadSuccess({numPages}) {
        setNumPages(numPages);
    }

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
    };

    const textContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: '20px',
        paddingTop: '30px',
    };

    return (
        <div style={containerStyle}>
            <Document
                file={blob}
                onLoadSuccess={onDocumentLoadSuccess}
                loading="Loading PDF..."
            >
                {/* Loop through all pages and render each one */}
                {Array.from(new Array(numPages), (el, index) => (
                    <div key={`page_${index + 1}`} style={textContainerStyle}>
                        <Page
                            pageNumber={index + 1}
                            width={isDesktopScreen ? 900 : 500}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                        />
                    </div>
                ))}
            </Document>
        </div>
    );
};

export default MyDocument;
