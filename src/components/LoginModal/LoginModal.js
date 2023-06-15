import React, { useState } from 'react';
import './LoginModal.scss';
import { authService } from '../../service/auth.service';
import Snackbar from '@material-ui/core/Snackbar';
import { useHistory } from 'react-router-dom';
import RegistrationModal from '../RegistrationModal/RegistrationModal';
import SetEmail from '../SetEmail/SetEmail';
import {toast} from "react-toastify";
import {Button} from "antd";

const LoginModal = ({ setModal }) => {
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
            const { data } = await authService.login({
                email,
                password,
            });
            let accessToken = data.tokenPair.accessToken;
            let userId = data.user.id;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('userId', userId);
            history.push('/become-part');
            setModal(false);
        } catch (error) {
            toast('Invalid password or email');
        }

        setLoading(false); // Set loading state back to false
    };

    const handleCloseSnackbar = () => {
        setError(null);
    };

    return (
        <div>
            {isRegistered ? (
                <RegistrationModal />
            ) : sendMail ? (
                <SetEmail setModal={setModal} />
            ) : (
                <div>
                    <form className="llogin-form">
                        <h2>Sign In</h2>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="Enter your password"
                            />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                rowGap: '10px',
                            }}
                        >
                            <Button
                                style={{
                                    width: '100%',
                                    color: 'white',
                                    background: '#B90B5F',
                                    height: '40px',
                                }}
                                onClick={loginUser}
                                loading={isLoading} // Set the loading state of the button
                            >
                                Login
                            </Button>

                            <button className={'button-register'} onClick={handleRegistration}>
                                Registration
                            </button>

                            <button className={'button-register'} onClick={forgotPassword}>
                                Forgot Password
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <Snackbar open={error !== null} autoHideDuration={5000} onClose={handleCloseSnackbar} message={error} />
        </div>
    );
};

export default LoginModal;
