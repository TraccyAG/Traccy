import React, {useState} from 'react';

import './WhitePaper.scss';
import {SvgIcon} from '../../common';
import {toast} from "react-toastify";
import axios from "axios";

const WhitePaper = () => {
    const [percent, setPercent] = useState(0);
    const [loading, setLoading] = useState(false);

    const onDownload = async () => {
        setPercent(0);
        setLoading(true);

        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        try {
            const loading = async () => {
                for (let i = 0; i <= 87; i++) {
                    await delay(20);
                    setPercent(i);
                }
            };
            await loading();
            const whitepaper =
                'https://traccy.fra1.digitaloceanspaces.com/public/Whitepaper.pdf';

            const response = await axios.get(whitepaper, {responseType: 'blob'});
            const file = new Blob([response.data], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(file);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'Whitepaper.pdf';
            a.click();
            window.URL.revokeObjectURL(whitepaper);

            const continueLoading = async () => {
                for (let i = 87; i <= 100; i++) {
                    await delay(20);
                    setPercent(i);
                }
            };
            await continueLoading();
            setLoading(false);
        } catch (e) {
            console.log(e);
            toast('Error downloading White Paper')
        }
    };


    return (
        <div className="white-paper-download">
            <h4>Whitepaper</h4>
            <div onClick={() => !loading && onDownload()}>
                <p>Download {percent}%</p>
                {loading ? <div></div> :
                    <div className="icon-wrapper">
                        <SvgIcon name='arrow-down' viewbox='0 0 25.87 25.87'/>
                    </div>
                }
            </div>
        </div>
    );
};

export default WhitePaper;

