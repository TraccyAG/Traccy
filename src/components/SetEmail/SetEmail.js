import React, {useState} from 'react';
import {authService} from "../../service/auth.service";
import {toast} from "react-toastify";
import LoginInput from "../authComponents/loginInput";
import LoginButton from "../authComponents/LoginButton";
import {useHistory} from "react-router-dom";

const SetEmail = ({setModal}) => {
    const [email, setEmail] = useState('');
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const history = useHistory();
    const forgotPassword = async (e) => {
        e.preventDefault();
        try {
            await authService.resetMailPassword(email)
            toast('Reset link sent on you email')
            setModal(false)
        } catch (e) {
            toast('Incorrect email')
        }
    };
    return (
        <div className={'login-form-blur'}>
            <form className="llogin-form">
                <div className={'form-close'}>
                    <h2>Sign in</h2>
                    <button className="close-button" onClick={() => history.push('/become-part')}>
                        &#x2715;
                    </button>
                </div>
                <div className="form-group">
                    <LoginInput
                        label="Email"
                        placeholder="Enter your email"
                        type={'text'}
                        required={true}
                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div className={'login-buttons'}>
                    <LoginButton name={'Reset Password'} onClick={forgotPassword}></LoginButton>
                </div>
            </form>
        </div>
    );
};

export default SetEmail;