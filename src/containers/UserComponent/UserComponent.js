import React from "react";
import {useWallet} from "../../contexts/store";
import { ethers} from "ethers";


const UserComponent = ({user}) => {
    const wallet = useWallet();
    const etherBalance = ethers.utils.formatEther(wallet.balance);

    return (
        <div style={containerStyle}>
            <div>
                <h2 style={titleStyle}>My Profile</h2>
            </div>
            <div style={inputsStyle}>
                <div>
                    <p style={partStyle}>
                        <label style={labelStyle}>Title:</label>
                        <input
                            type="text"
                            value={user.title}
                            style={fieldStyle}
                            disabled
                        />
                    </p>
                    <p style={partStyle}>
                        <label style={labelStyle}>First Name:</label>
                        <input
                            type="text"
                            value={user.firstName}
                            style={fieldStyle}
                            disabled
                        />
                    </p>
                    <p style={partStyle}>
                        <label style={labelStyle}>Surname:</label>
                        <input
                            type="text"
                            value={user.surName}
                            style={fieldStyle}
                            disabled
                        />
                    </p>
                    <p style={partStyle}>
                        <label style={labelStyle}>Email:</label>
                        <input
                            type="text"
                            value={user.email}
                            style={fieldStyle}
                            disabled
                        />
                    </p>
                </div>
                <div>
                    <p style={partStyle}>
                        <label style={labelStyle}>Address:</label>
                        <input
                            type="text"
                            value={user.address}
                            style={fieldStyle}
                            disabled
                        />
                    </p>
                    <p style={partStyle}>
                        <label style={labelStyle}>ZIP-Code:</label>
                        <input
                            type="text"
                            value={user.zipcode}
                            style={fieldStyle}
                            disabled
                        />
                    </p>
                    <p style={partStyle}>
                        <label style={labelStyle}>Available TRCYN TOKEN:</label>
                        <input
                            type="text"
                            value={0}
                            style={redStyle}
                            disabled
                        />
                    </p>
                    <p style={partStyle}>
                        <label style={labelStyle}>Value in USD$:</label>
                        <input

                            type="text"
                            value={etherBalance}
                            style={redStyle}
                            disabled
                        />
                    </p>
                </div>
            </div>
        </div>
    );
};


// Define styles as JavaScript objects
const containerStyle = {
    backgroundColor: "inherit",
    padding: "20px",
    color: "black",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const titleStyle = {
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 40,
    color: "#FFFFFF"
};

const fieldStyle = {
    backgroundColor: "#4D4B4F",
    color: "#fff",
    padding: "5px 10px",
    width: "300px",
    height: '45px'
};
const redStyle = {
    background: 'linear-gradient(90deg, #E71888 11.5%, #4D214B 88%)',
    color: "#fff",
    padding: "5px 10px",
    width: "300px",
    height: '45px'
}

const inputsStyle = {
    marginTop: '80px',
    display: 'flex',
    rowGap: '10px',
    flexDirection: 'row',
    justifyContent: 'space-around'
}
const partStyle = {
    display: 'flex',
    flexFlow: 'column',
}
const labelStyle = {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '15px',
    lineHeight: '18px',
    letterSpacing: '-0.06em',
    color: 'rgba(255, 255, 255, 0.35)'
}

export default UserComponent;
