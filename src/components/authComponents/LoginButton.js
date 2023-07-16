import React from 'react';
import { Spin } from 'antd';

const LoginButton = ({ name, loading, onClick,type }) => {
    return (
        <div style={containerStyle}>
            <button type={type} style={buttonStyle} onClick={onClick} disabled={loading}>
                {loading ? (
                    <Spin size="small" style={spinnerStyle} />
                ) : (
                    name
                )}
            </button>
        </div>
    );
};

const containerStyle = {
    position: 'relative',
};

const buttonStyle = {
    width: '220px',
    height: '44px',
    background: '#AA265F',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '15px',
    color: '#FFFFFF',
    opacity: 0.8,
};

const spinnerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

export default LoginButton;
