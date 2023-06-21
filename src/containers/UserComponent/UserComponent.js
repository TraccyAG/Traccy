import React, {useEffect, useState} from "react";
import {useWallet} from "../../contexts/store";
import {Contract, ethers} from "ethers";
import {TRCYN_TOKEN_ADDRESS, PHASEABLE_SALE_CONTRACT_ADDRESS} from "../../config/constants";
import saleAbi from "../../config/PhaseableSaleABI.json";
import erc20Abi from "../../config/erc20.json";
import LogoUser from '../../assets/images/logo-user.jpeg'
import ellipse from '../../assets/images/Ellipse.png'
import {useHistory} from "react-router-dom";

const UserComponent = ({user}) => {
    const wallet = useWallet();
    const [price, setPrice] = useState(0);
    const [balance, setBalance] = useState(0);
    const history = useHistory();
    useEffect(() => {
        if (wallet.account) {
            // read phase info of current phase and store it in state variable `price` and `phaseVolume`
            const tokenContract = new Contract(TRCYN_TOKEN_ADDRESS, erc20Abi.abi, wallet.signer.provider);
            const saleContract = new Contract(PHASEABLE_SALE_CONTRACT_ADDRESS, saleAbi.abi, wallet.signer.provider);
            saleContract.phaseCounter().then(
                counter => saleContract.phaseInfo(counter - 1 > 0 ? counter - 1 : 0).then(
                    res => {
                        setPrice(ethers.utils.formatUnits(res.priceUsd, 6));
                    }
                )
            );
            tokenContract.balanceOf(wallet.account).then(
                balance => setBalance(ethers.utils.formatEther(balance))
            );
        }
    }, [wallet.account]);

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <img style={imgStyle} onClick={() => history.push('/login')} src={LogoUser} alt="logo-user"/>
            </div>
            <div className={'form-user-inputs'}>
                <div style={{paddingRight: '20%'}}>
                    <div style={{display: 'flex', alignItems: "center", columnGap: "7px"}}>
                        <h2 style={titleStyle}>My Profile</h2>
                        <img style={ellipseStyle} src={ellipse} alt="ellipse"/>
                    </div>
                    <hr style={lineStyle}></hr>
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
                                value={balance}
                                style={redStyle}
                                disabled
                            />
                        </p>
                        <p style={partStyle}>
                            <label style={labelStyle}>Value in USD$:</label>
                            <input
                                type="text"
                                value={balance * price}
                                style={redStyle}
                                disabled
                            />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};


// Define styles as JavaScript objects
const containerStyle = {
    marginTop: "70px",
    background: 'linear-gradient(180deg, rgba(40, 31, 65, 0.25) 0%, rgba(24, 17, 37, 0.48) 100%)',
    backdropFilter: 'blur(12.5px)',
    borderRadius: '25px',
    padding: "20px",
    height: "80%"
};
const imgStyle = {
    width: 70,
    height: 70,
    borderRadius: '50%',
    cursor: "pointer"
};

const titleStyle = {
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 20,
    color: "#FFFFFF"

};

const fieldStyle = {
    background: 'linear-gradient(90.42deg, rgba(255, 255, 255, 0.25) 9.18%, rgba(255, 255, 255, 0.25) 88.96%)',
    opacity: ' 0.5',
    backdropFilter: 'blur(12.5px)',
    color: "#fff",
    padding: "5px 10px",
    width: "100%",
    height: '45px'
};
const redStyle = {
    background: 'linear-gradient(90deg, rgba(231, 24, 136, 0.25) 17.05%, rgba(77, 33, 75, 0.3) 100%)',
    color: "#fff",
    padding: "5px 10px",
    width: "100%",
    height: '45px'
}

const inputsStyle = {
    marginTop: '60px',
    display: 'flex',
    rowGap: '10px',
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: "25px"
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

const headerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: ' flex-end'
}
const lineStyle = {
    border: 'none',
    height: '1px',
    backgroundImage: 'linear-gradient(to right, transparent, #CCC, transparent)',
    width: "280px"
}

const ellipseStyle = {
    height: '18px',
    marginBottom: '5px',
    width: '18px'
}

export default UserComponent;
