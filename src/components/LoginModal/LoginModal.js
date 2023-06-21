import React, {useState} from 'react';
import './LoginModal.scss';
import {authService} from '../../service/auth.service';
import Snackbar from '@material-ui/core/Snackbar';
import {useHistory} from 'react-router-dom';
import RegistrationModal from '../RegistrationModal/RegistrationModal';
import SetEmail from '../SetEmail/SetEmail';
import {toast} from "react-toastify";
import LoginButton from "../authComponents/LoginButton";
import LoginInput from "../authComponents/loginInput";
import {SvgIcon} from "../common";

const LoginModal = ({setModal}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [sendMail, setSendMail] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [isLoading, setLoading] = useState(false); // Added loading state

    const history = useHistory();

    const handleRegistration = () => {
        // Perform the registration logic here
        // Set the isRegistered state to true after successful registration
        setIsRegistered(true);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const forgotPassword = (e) => {
        e.preventDefault();
        setSendMail(true);
    };

    const loginUser = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading state to true

        try {
            const {data} = await authService.login({
                email,
                password,
            });
            let accessToken = data.tokenPair.accessToken;
            let userId = data.user.id;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('userId', userId);
            history.push('/become-part');
        } catch (error) {
            toast('Invalid password or email');
        }

        setLoading(false); // Set loading state back to false
    };

    const handleCloseSnackbar = () => {
        setError(null);
    };

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
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
            <div className={'text-container'}>
                <h2>
                    using blockchain
                    impactful
                </h2>
                <p>
                    Experience the power of impact with your personalized account
                </p>
            </div>
            <div style={{width: '100%'}}>
                {isRegistered ? (
                    <RegistrationModal setIsRegistered={ setIsRegistered}/>
                ) : sendMail ? (
                    <SetEmail setSendMail={setSendMail} setModal={setModal}/>
                ) : (
                    <div className={'login-form-blur'}>
                        <form className="llogin-form">
                            <div className={'form-close'}>
                                <h2>Sign in</h2>
                                <button className="close-button" onClick={()=>history.push('/become-part')}>
                                    &#x2715;
                                </button>
                            </div>
                            <LoginInput
                                label="Email"
                                placeholder="Enter your email"
                                type={'text'}
                                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
                                value={email}
                                onChange={handleEmailChange}
                            />
                            <LoginInput
                                label="Password"
                                placeholder="Enter your password"
                                type={'password'}
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <div className={'login-buttons'}>
                                <LoginButton name={'Login'} loading={isLoading} onClick={loginUser}></LoginButton>
                                <LoginButton name={'Registration'}  onClick={handleRegistration}></LoginButton>
                                <LoginButton name={'Forgot password'} onClick={forgotPassword}></LoginButton>
                            </div>
                        </form>
                    </div>
                )}

                <Snackbar open={error !== null} autoHideDuration={5000} onClose={handleCloseSnackbar} message={error}/>
            </div>
        </div>
    );
};

export default LoginModal;
