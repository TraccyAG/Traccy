import React, {useState} from 'react';
import {toast} from 'react-toastify';
import {useHistory, useParams} from 'react-router-dom';
import {authService} from '../../service/auth.service';
import {Button} from "antd";

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
        <div  style={{display: 'flex', justifyContent: 'flex-end'}}>
            <form className="llogin-form">
                <h2>Reset Password</h2>
                <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Enter your new password"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        placeholder="Confirm your new password"
                    />
                </div>
                <Button
                    style={{
                        width: '100%',
                        color: 'white',
                        background: '#B90B5F',
                        height: '40px',
                    }}
                    onClick={handleResetPassword}
                    loading={isLoading} // Set the loading state of the button
                >
                    Reset Password
                </Button>
            </form>
        </div>
    );
};

export default ResetPasswordModal;
