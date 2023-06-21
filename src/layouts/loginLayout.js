import React from 'react';
import { Content } from 'antd/es/layout/layout';
import backgroundImage from '../../src/assets/login/loginImage.png';
import {Navbar} from "../components/layout"; // Replace with the path to your image file

const LoginLayout = ({ children }) => {
    const backgroundImageUrl = `url(${backgroundImage})`;

    return (
        <React.Fragment>
            <div className="main-wrapper" style={{ backgroundImage: backgroundImageUrl,backgroundSize:"cover",backgroundPosition:"center" }}>
                <Navbar login={true} />
                <Content>
                    <main>{children}</main>
                </Content>
            </div>
        </React.Fragment>
    );
};

export default LoginLayout;
