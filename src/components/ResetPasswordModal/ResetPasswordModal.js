import React, {useState} from 'react';
import {toast} from 'react-toastify';
import {useHistory, useParams} from 'react-router-dom';
import {authService} from '../../service/auth.service';
import {Button} from "antd";
import LoginInput from "../authComponents/loginInput";
import LoginButton from "../authComponents/LoginButton";

const ResetPasswordModal = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const history = useHistory();
    const {token} = useParams();

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setLoading(true); // Set loading state to true

            try {
                await authService.resetPassword({password, token});
                toast('Password reset successfully');
                history.push('/become-part');
            } catch (error) {
                toast.error('An error occurred during password reset');
            }

            setLoading(false); // Set loading state back to false
        } else {
            toast('Passwords do not match');
        }
    };

    return (
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <form className="llogin-form" style={{width: '45%'}}>
                <h2>Reset Password</h2>
                <LoginInput
                    label="Password"
                    placeholder="Enter your password"
                    type={'password'}
                    value={password}
                    onChange={handlePasswordChange}
                />
                <LoginInput
                    label="Password"
                    placeholder="Confirm your new password"
                    type={'password'}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                />
                <div className={'login-buttons'}>
                    <LoginButton name={' Reset Password'} onClick={handleResetPassword}></LoginButton>
                </div>
            </form>
        </div>
    );
};

export default ResetPasswordModal;
