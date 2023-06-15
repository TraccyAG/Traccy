import React, {useState} from 'react';
import {authService} from "../../service/auth.service";
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";

const SetEmail = ({setModal}) => {
    const [email, setEmail] = useState('');
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const forgotPassword = async (e) => {
        e.preventDefault();
        try {
            await authService.resetMailPassword(email)
            toast('Reset link sent on you email')
            setModal(false)
        }catch (e) {
            toast('Incorrect email')
        }
    };
    return (
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
                <button className={'button-register'} onClick={forgotPassword}>
                    Reset Password
                </button>
            </form>
        </div>
    );
};

export default SetEmail;