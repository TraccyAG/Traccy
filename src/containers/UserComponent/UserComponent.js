import React, {useEffect, useState} from "react";
import {useWallet} from "../../contexts/store";
import {Contract, ethers} from "ethers";
import {TRCYN_TOKEN_ADDRESS, PHASEABLE_SALE_CONTRACT_ADDRESS} from "../../config/constants";
import saleAbi from "../../config/PhaseableSaleABI.json";
import erc20Abi from "../../config/erc20.json";
import LogoUser from '../../assets/images/logo-user.jpeg'
import ellipse from '../../assets/images/Ellipse.png'
import {useHistory} from "react-router-dom";
import './UserComponent.css'

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
        <div className={'container-user'}>
            <div className={'headerStyle'}>
                <img className={'imgStyle'} onClick={() => history.push('/login')} src={LogoUser} alt="logo-user"/>
            </div>
            <div className={'form-user-inputs'}>
                <div className={'line-padding'}>
                    <div className={'user-header'} >
                        <h2 className={'titleStyle'}>My Profile</h2>
                        <img className={'ellipseStyle'} src={ellipse} alt="ellipse"/>
                    </div>
                    <hr className={'line-myprofile'}></hr>
                </div>
                <div className={'inputsStyle'}>

                    <div>
                        <p className={'partStyle'}>
                            <label className={'labelStyle'}>Title:</label>
                            <input
                                type="text"
                                value={user.title}
                                className={'fieldStyle'}
                                disabled
                            />
                        </p>
                        <p className={'partStyle'}>
                            <label className={'labelStyle'}>First Name:</label>
                            <input
                                type="text"
                                value={user.firstName}
                                className={'fieldStyle'}
                                disabled
                            />
                        </p>
                        <p className={'partStyle'}>
                            <label className={'labelStyle'}>Surname:</label>
                            <input
                                type="text"
                                value={user.surName}
                                className={'fieldStyle'}
                                disabled
                            />
                        </p>
                        <p className={'partStyle'}>
                            <label className={'labelStyle'}>Email:</label>
                            <input
                                type="text"
                                value={user.email}
                                className={'fieldStyle'}
                                disabled
                            />
                        </p>
                    </div>
                    <div>
                        <p className={'partStyle'}>
                            <label className={'labelStyle'}>Address:</label>
                            <input
                                type="text"
                                value={user.address}
                                className={'fieldStyle'}
                                disabled
                            />
                        </p>
                        <p className={'partStyle'}>
                            <label className={'labelStyle'}>ZIP-Code:</label>
                            <input
                                type="text"
                                value={user.zipcode}
                                className={'fieldStyle'}
                                disabled
                            />
                        </p>
                        <p className={'partStyle'}>
                            <label className={'labelStyle'}>Available TRCYN TOKEN:</label>
                            <input
                                type="text"
                                value={balance}
                                className={'redStyle'}
                                disabled
                            />
                        </p>
                        <p className={'partStyle'}>
                            <label className={'labelStyle'}>Value in USD$:</label>
                            <input
                                type="text"
                                value={balance * price}
                                className={'redStyle'}
                                disabled
                            />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default UserComponent;
