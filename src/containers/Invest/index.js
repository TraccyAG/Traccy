import React, {useEffect, useState} from 'react';
import {Steps} from 'antd';
import {SvgIcon} from '../../components/common';
import InvestStep1 from './InvestStep1';
import InvestStep2 from './InvestStep2';
import InvestStep3 from './InvestStep3';
import InvestStep4 from './InvestStep4';
import './index.scss';

import {useTranslation} from 'react-i18next';
import {userService} from "../../service/user.service";

const Invest = () => {
    const {t} = useTranslation();
    const [current, setCurrent] = useState(0);

    const [user, setUser] = useState(null); // State to store the user data
    const [loading, setLoading] = useState(false); // State for loading

    const [payments, setPayments] = useState(null);
    const [investAmount, setInvestAmount] = useState(0);
    const [paymentOption, setPaymentOption] = useState(null); // set by chainSelector, object schema is {name, decimals, address}

    const handlePayments = (payments) => {
        setPayments(payments);
    };

    const userId = localStorage.getItem('userId');
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Set loading to true before making the API call
                const { data } = await userService.getUserById(userId);
                setUser(data);
                setLoading(false); // Set loading back to false after data is fetched
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false); // Set loading back to false if an error occurs
            }
        };

        fetchData();
    }, [userId]);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const steps = [
        {
            title: t("buy:choose"),
            content: <InvestStep2  handlePayments={handlePayments} onNext={next} onPrev={prev} />,
        },
        // {
        //     title: `Purchase Agreement`,
        //     content: <InvestStep1 payments={payments} user={user} onNext={next} />,
        // },
        {
            title: t("buy:fill"),
            content: <InvestStep3 user={user} onNext={next} onPrev={prev} />,
        },

        {
            title: t("buy:confirmation"),
            content: <InvestStep4 investAmount={investAmount} paymentOption={paymentOption} onPrev={prev} />,
        }
    ];

    const items = steps.map((item) => ({key: item.title, title: item.title}));
    return (
        <div className='investform-wrapper'>
            <div className="polygon-effect">
                <img src="/invest-form/left-hexa.png" alt="polygon-left"/>
                <img src="/invest-form/right-hexa.png" alt="polygon-right"/>
            </div>
            <div className='leftbar'>
                <div className='social-icon-list'>
                    <a href="https://twitter.com/traccy_official?s=11&t=_z6GdVt91PmJiJmxDvd8sA">
                        <SvgIcon name='twitter' viewbox='0 0 36 29.239'/>
                    </a>
                    <a href="https://web.telegram.org/z/#-1837824968">
                        <SvgIcon name='telegram' viewbox='0 0 34.875 34.664'/>
                    </a>
                    <a href="https://www.instagram.com/traccy_official/">
                        <SvgIcon name='instagram' viewbox='0 0 32.999 32.999'/>
                    </a>
                    <a href="https://www.linkedin.com/company/traccy-ag/?viewAsMember=true">
                        <SvgIcon name='linkedin' viewbox='0 0 32.001 32.001'/>
                    </a>
                </div>
            </div>
            <div className='right-section'>
                <div className='rightbar-inner'>
                    <div className='dtl-section'>
                        <Steps current={current} items={items}/>
                        <div className="steps-content">{steps[current].content}</div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Invest