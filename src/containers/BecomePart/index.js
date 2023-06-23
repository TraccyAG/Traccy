import React, {createContext, useEffect, useMemo, useState} from 'react';
import {Button, Steps} from 'antd';
import {SvgIcon} from '../../components/common';
import FormInformationStep from './FormInformationStep';
import ReviewConfirmStep from './ReviewConfirmStep';
import SentStep from './SentStep';
import './index.scss';

import {useTranslation} from 'react-i18next';
import emailjs from '@emailjs/browser';
import {toast} from "react-toastify";
import {userService} from "../../service/user.service";
import UserComponent from "../UserComponent/UserComponent";
import {emailsService} from "../../service/emails.service";

export const UserContext = createContext({
    name: '',
    setName: () => {
    },
    surName: '',
    setSurName: () => {
    },
    email: '',
    setEmail: () => {
    },
    gender: '',
    setGender: () => {
    },
    interest: '',
    setInterest: () => {
    },
    message: '',
    setMessage: () => {
    }
});


const BecomePart = () => {
    const {t} = useTranslation();
    const [current, setCurrent] = useState(0);

    const [name, setName] = useState("");
    const [surName, setSurName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("Male");
    const [interest, setInterest] = useState("Employee");
    const [message, setMessage] = useState("");
    const [user, setUser] = useState(null); // State to store the user data
    const [loading, setLoading] = useState(false); // State for loading

    const value = useMemo(
        () => ({
            name,
            setName,
            surName,
            setSurName,
            email,
            setEmail,
            gender,
            setGender,
            interest,
            setInterest,
            message,
            setMessage
        }),
        [name, surName, email, gender, interest, message]
    );
    const templateParams = {name, email, gender, interest, message};
    const userId = localStorage.getItem('userId');
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Set loading to true before making the API call
                const {data} = await userService.getUserById(userId);
                setUser(data);
                setLoading(false); // Set loading back to false after data is fetched
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false); // Set loading back to false if an error occurs
            }
        };

        fetchData();
    }, [userId]);

    const next = async () => {
        setCurrent(current + 1);

        if (current == 1) {

            const emailData = {
                firstName: name,
                surName: surName,
                email: email,
                gender: gender,
                interest: interest,
                message: message,
            }
            const sendMail = {
                email: email,
                name: name,
            }
            try {
                await emailsService.saveEmail(emailData);
                await emailsService.sendEmail(sendMail)
            } catch (error) {
                console.error('Error saving email data:', error);
                toast.error("Failed to save email data");
            }
            emailjs.send('service_auuynhq', 'template_4bela3j', templateParams, 'HviqP1Nh0agk08uzo')
                .then((response) => {
                    console.log('SUCCESS!', response.status, response.text);
                    toast.success("Email successfully sent");
                }, (err) => {
                    console.log('FAILED...', err);
                    toast.error("Email sending is failed");
                });
        }
    };

    const prev = () => {
        setCurrent(current - 1);
    };
    const steps = [
        {
            title: t("become:form"),
            content: <FormInformationStep/>,
        },
        {
            title: t("become:review"),
            content: <ReviewConfirmStep/>,
        },
        {
            title: t("become:send"),
            content: <SentStep/>,
        },
    ];
    const items = steps.map((item) => ({key: item.title, title: item.title}));

    return (
        <UserContext.Provider value={value}>
            <div className='becomepart-wrapper'>
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
                    {/* <div className='header-bar'>
        <Navbar />
    </div> */}
                        <div className={`rightbar-inner ${user ? 'user' : ''}`}>
                        {!user &&
                            <div className='address-bar'>
                                {/* <div className='logo-section'>
            <img src={LogoLight} alt='Logo' />
        </div> */}
                                <div className='address-col'>
                                    <h3>{t("become:location")}</h3>
                                    <p>
                                        TRACCY AG <br/>
                                        Chaltenbodenstrasse 6a, <br/>
                                        8834 Schindellegi <br/>
                                        info@traccy.ch <br/>
                                        +41 43 810 29 51
                                    </p>
                                </div>
                                <div className='bottom-link'>
                                    <a href='/termofuse.html' target='_blank' rel="noreferrer">
                                        {t("become:terms")}
                                    </a> I
                                    <a href='/Policy.html' target='_blank' rel="noreferrer">
                                        {t("become:privacy")}
                                    </a>
                                </div>
                            </div>
                        }
                        {user &&
                            <>
                                <div className="text-bar">
                                    <hr className="vertical-line"/>
                                    <div className="text-bar-content">
                                        <div>
                                            <h2 >Believe</h2>
                                            <p style={{color:'rgba(230, 43, 201, 1)'}}>in a bright future</p>
                                        </div>
                                        <div>
                                            <h2>Invest</h2>
                                            <p style={{color:'rgba(159, 100, 235, 1)'}}>In impact</p>
                                        </div>
                                        <div>
                                            <h2>Achieve</h2>
                                            <p style={{color:'rgba(23, 197, 250, 1)'}}>change</p>
                                        </div>
                                    </div>
                                </div>


                                <div className={'light-container'}>

                                </div>
                            </>
                        }

                        <div className={`dtl-section ${user ? 'user' : ''}`}>
                            {loading ? (
                                <div>Loading...</div> // Show a loading state if `loading` is true
                            ) : user ? (
                                <UserComponent user={user}/>
                            ) : (
                                <>
                                    <Steps current={current} items={items}/>
                                    <div className="steps-content">{steps[current].content}</div>
                                    <div className="steps-action">
                                        {current === 0 && (
                                            <>
                                                {/* <Link to='/'>FAQ</Link> */}
                                                <Button type="primary" onClick={() => next()}>
                                                    Continue
                                                </Button>
                                            </>
                                        )}
                                        {current === 1 && (
                                            <>
                                                {/* <Link to='/'>FAQ</Link> */}
                                                <div>
                                                    <Button onClick={() => prev()}>
                                                        Back
                                                    </Button>
                                                    <Button type="primary" onClick={() => next()}>
                                                        Continue
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </UserContext.Provider>
);
}

export default BecomePart