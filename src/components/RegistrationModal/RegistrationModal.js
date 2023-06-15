import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import {Col, Row, SvgIcon} from "../common";
import {Form, Select,Button} from "antd";
import {useTranslation} from "react-i18next";
import {authService} from "../../service/auth.service";
import {useHistory} from "react-router-dom";

const RegistrationModal = () => {
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {t} = useTranslation();
    const [gender, setGender] = useState('Male');
    const [interest, setInterest] = useState('Employee');
    const [tokenJwt, setToken] = useState('');
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [zipcode, setZipcode] = useState('');

    const [isLoading, setIsLoading] = useState(false); // Loading state variable
    const [isKYCCompleted, setIsKYCCompleted] = useState(false);
    const history = useHistory();
    const [popup, setPopup] = useState(null);

    const openPopup = () => {
        const popupWindow = window.open("https://in.sumsub.com/idensic/l/#/uni_QUqyWtzT5Evcg0eC", "popupWindow", "width=500,height=400");
        setPopup(popupWindow);

        // Listen for changes in the URL of the popup window
        const checkPopupUrl = setInterval(() => {
            try {
                if (popupWindow.location.href.includes("jwt")) {
                    console.log(popupWindow.location.href);
                    // Extract the token from the URL
                    const url = new URL(popupWindow.location.href);
                    const token = url.searchParams.get("jwt");
                    // Close the popup window
                    setToken(token)
                    popupWindow.close();
                    // Do something with the token
                    localStorage.setItem('jwt', token)
                    // Clear the interval for checking the URL
                    clearInterval(checkPopupUrl);
                }
            } catch (error) {
                // Handle any errors that occur during the URL check
                console.error(error);
            }
        }, 1000); // Adjust the interval as needed
    };
    useEffect(() => {

    }, [])
    const handleLinkClick = (e) => {
        e.preventDefault();
        openPopup();
    };
    const registerUser = async (e) => {
        e.preventDefault();
        // Email validation using regular expression
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            toast('Invalid email format');
            return;
        }
        try {
            setIsLoading(true); // Set loading state to true
            const user = {
                firstName: firstName,
                email: email,
                surName: surname,
                gender: gender,
                tokenSumSub: tokenJwt,
                password: password,
                address:address,
                zipcode:zipcode,
                title:title
            }

            // Call the registration API
            const register = await authService.registration(user);
            if (register.status === 201) {
                await authService.login({email: email, password: password}).then((response) => {
                    let accessToken = response.data.tokenPair.accessToken;
                    let userId = response.data.user.id;
                    localStorage.setItem('accessToken', accessToken)
                    localStorage.setItem('userId', userId)
                    history.push('/')
                })
            }
            // Registration successful, perform any necessary actions or redirects
        } catch (error) {
            // Handle the error here
            console.error('Registration failed:', error);
            // You can display an error message to the user or perform any other error handling logic
        } finally {
            setIsLoading(false); // Set loading state to false after registration attempt
        }
    };

    return (
        <div style={{color: 'black'}}>

            <form className="llogin-form">
                <h2>Sign UP</h2>
                <div className="form-group">
                    <Col lg="6">
                        <Form.Item
                            name="title"
                            label={t('become:Title')}
                            rules={[{required: true, message: 'Please Enter title'}]}
                            validateStatus={!isKYCCompleted ? 'warning' : ''}
                        >
                            <Select
                                defaultValue="Title"
                                suffixIcon={<SvgIcon name="select-arrow" viewbox="0 0 9.42 7.186"/>}
                                popupClassName="select-drop"
                                options={[
                                    {value: 'Mr', label: 'Mr'},
                                    {value: 'Mrs', label: 'Mrs'},
                                    {value: 'Dr', label: 'Dr'},
                                    {value: 'Ms', label: 'Ms'}
                                ]}
                                value={gender}
                                onChange={(e) => setTitle(e)}
                            />
                        </Form.Item>
                    </Col>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        required={true}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter your first name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="surname">Surname</label>
                    <input
                        type="text"
                        id="surname"
                        value={surname}
                        required={true}
                        onChange={(e) => setSurname(e.target.value)}
                        placeholder="Enter your surname"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        required={true}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your surname"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Zipcode</label>
                    <input
                        type="text"
                        id="zipcode"
                        value={zipcode}
                        required={true}
                        onChange={(e) => setZipcode(e.target.value)}
                        placeholder="Enter your surname"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
                        required={true}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        required={true}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>
                <Row>
                    <Col lg="6">
                        <Form.Item
                            name="gender"
                            label={t('become:gender')}
                            rules={[{required: true, message: 'Please Enter gender'}]}
                            validateStatus={!isKYCCompleted ? 'warning' : ''}
                        >
                            <Select
                                defaultValue="Male"
                                suffixIcon={<SvgIcon name="select-arrow" viewbox="0 0 9.42 7.186"/>}
                                popupClassName="select-drop"
                                options={[
                                    {value: 'Male', label: 'Male'},
                                    {value: 'Female', label: 'Female'},
                                    {value: 'Company', label: 'Company'}
                                ]}
                                value={gender}
                                onChange={(e) => setGender(e)}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <div>
                    {tokenJwt ?  <Button
                            style={{
                                width: '100%',
                                color: 'white',
                                background: '#B90B5F',
                                height: '40px',
                            }}
                            onClick={registerUser}
                            loading={isLoading} // Set the loading state of the button
                        >
                            Registration
                        </Button>
                 : <button
                        style={{
                            width: '100%',
                            color: 'white',
                            background: '#B90B5F',
                            height: '40px',
                        }}
                        onClick={handleLinkClick}
                    >
                        KYC Integration
                    </button>}
                </div>
            </form>
        </div>
    );
};

export default RegistrationModal;