import React, {useState} from 'react';
import {toast} from "react-toastify";
import {Checkbox} from "antd";
import {authService} from "../../service/auth.service";
import {useHistory} from "react-router-dom";
import LoginButton from "../authComponents/LoginButton";
import LoginInput from "../authComponents/loginInput";
import SelectInput from "../authComponents/SelectIcon";
import './RegistrationModal.scss'

const RegistrationModal = ({setIsRegistered}) => {
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('Male');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false); // Checkbox state

    const [isLoading, setIsLoading] = useState(false); // Loading state variable
    const history = useHistory();

    const handleAgreeTermsChange = (e) => {
        setAgreeTerms(e.target.checked);
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
                password: password,
                address: address,
                zipcode: zipcode,
                city: city
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

        } catch (error) {
            console.error('Registration failed:', error);
        } finally {
            setIsLoading(false);
        }
    };
    const handleGenderChange = (value) => {
        setGender(value);
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
                <div className={'register-flex-container'}>
                    <LoginInput
                        width={'45%'}
                        label="City"
                        placeholder="Enter your city"
                        type={'text'}
                        required={true}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
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
                        I agree to the <a href="https://portal.traccy.io/termofuse.html"><strong>terms of
                        use</strong></a>
                    </Checkbox>
                </div>
                <div className={'login-buttons'}>

                    <LoginButton name={'Continue'} loading={isLoading}
                                 onClick={registerUser}></LoginButton>

                    <LoginButton name={'Login'} onClick={() => setIsRegistered(false)}></LoginButton>

                </div>
            </form>
        </div>
    );
};

export default RegistrationModal;
