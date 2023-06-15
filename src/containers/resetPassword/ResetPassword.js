import React, {useState} from 'react';
import {Modal} from "../../components/Modal/Modal";
import ResetPasswordModal from "../../components/ResetPasswordModal/ResetPasswordModal";


const ResetPassword = () => {
    const [modal,setModal] = useState(true);
    return (
        <div className={'becomepart-wrapper'}>
            <Modal activeModal={modal} setActive={setModal} bool={true}><ResetPasswordModal/> </Modal>
        </div>
    );
};

export default ResetPassword;