import React from 'react';

const LoginInput = ({ label, placeholder, value, onChange, type, required, pattern, width }) => {
    const inputContainerStyle = {
        position: 'relative',
        marginBottom: '20px',
        width: width || '100%', // Apply dynamic width or default to 100%
    };

    const labelStyle = {
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '15px',
        lineHeight: '18px',
        color: '#FFFFFF',
        opacity: 0.5,
    };

    const inputStyle = {
        width: '100%',
        padding: '20px 10px 10px 0px',
        paddingLeft: '0',
        border: 'none',
        borderBottom: '1px solid #ccc',
        backgroundColor: 'inherit',
        color: 'inherit',
        outline: 'none',
    };

    const underlineStyle = {
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '100%',
        height: '1px',
        backgroundColor: '#ccc',
    };

    return (
        <div style={inputContainerStyle}>
            <label style={labelStyle}>{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                pattern={pattern}
                style={inputStyle}
                required={required}
            />
            <div style={underlineStyle}></div>
        </div>
    );
};

export default LoginInput;
