import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import {Checkbox} from "antd";
import {authService} from "../../service/auth.service";
import {useHistory} from "react-router-dom";
import LoginButton from "../authComponents/LoginButton";
import LoginInput from "../authComponents/loginInput";
import SelectInput from "../authComponents/SelectIcon";
import './RegistrationModal.scss'

const RegistrationModal = ({ setIsRegistered}) => {
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('Male');
    const [tokenJwt, setToken] = useState('');
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false); // Checkbox state

    const [isLoading, setIsLoading] = useState(false); // Loading state variable
    const history = useHistory();
    const [popup, setPopup] = useState(null);

    const handleAgreeTermsChange = (e) => {
        setAgreeTerms(e.target.checked);
    };

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
        // Validate if the user has agreed to the terms
        if (!agreeTerms) {
            toast('Please agree to the terms of service');
            return;
        }
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
                address: address,
                zipcode: zipcode,
                title: title
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
    const handleTitleChange = (value) => {
        setTitle(value);
    };
    const handleGenderChange = (value) => {
        setTitle(value);
    };

    return (
        <div className={'login-form-blur'}>
            <form className="llogin-form">
                <div className={'form-close'}>
                    <h2>Sign up</h2>
                    <button className="close-button" onClick={() => history.push('/become-part')}>
                        &#x2715;
                    </button>
                </div>
                <div className="form-group">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}>
                        <SelectInput
                            name={'Title'}
                            defaultValue="Title"
                            options={[
                                {value: 'Mr', label: 'Mr'},
                                {value: 'Mrs', label: 'Mrs'},
                                {value: 'Dr', label: 'Dr'},
                                {value: 'Ms', label: 'Ms'},
                            ]}
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                </div>
                <div className={'register-flex-container'}>
                    <LoginInput
                        width={'45%'}
                        label="Name"
                        placeholder="Enter your name"
                        type={'text'}
                        required={true}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <LoginInput
                        width={'45%'}
                        label="Surname"
                        placeholder="Enter your surname"
                        type={'text'}
                        required={true}
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                </div>
                <div className={'register-flex-container'}>
                    <LoginInput
                        width={'45%'}
                        label="Address"
                        placeholder="Enter your address"
                        type={'text'}
                        required={true}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <LoginInput
                        width={'45%'}
                        label="Zip code"
                        placeholder="Enter your zip code"
                        type={'text'}
                        required={true}
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <LoginInput
                        label="Email"
                        placeholder="Enter your email"
                        type={'text'}
                        required={true}
                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <LoginInput
                        label="Password"
                        placeholder="Enter your password"
                        type={'password'}
                        value={password}
                        required={true}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div style={{width: '200px'}}>
                    <SelectInput
                        name={'Gender'}
                        defaultValue="Gender"
                        options={[
                            {value: 'Male', label: 'Male'},
                            {value: 'Female', label: 'Female'},
                            {value: 'Company', label: 'Company'}
                        ]}
                        value={gender}
                        onChange={handleGenderChange}
                    />
                </div>
                <div>
                    <Checkbox className="custom-checkbox" onChange={handleAgreeTermsChange}>
                        I agree to the  <a href="https://portal.traccy.io/termofuse.html"><strong>terms of use</strong></a>
                    </Checkbox>
                </div>
                <div className={'login-buttons'}>
                    {
                        tokenJwt ?
                            <LoginButton name={' Registration'} loading={isLoading}
                                         onClick={registerUser}></LoginButton>
                            :
                            <LoginButton name={'KYC Integration'} onClick={handleLinkClick}></LoginButton>
                    }
                    <LoginButton name={'Login'} onClick={()=>setIsRegistered(false)}></LoginButton>
                </div>
            </form>
        </div>
    );
};

export default RegistrationModal;