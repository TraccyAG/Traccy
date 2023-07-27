import React, {useEffect, useState} from "react";
import {useWallet} from "../../contexts/store";
import {Contract, ethers} from "ethers";
import {PHASEABLE_SALE_CONTRACT_ADDRESS, TRCYN_TOKEN_ADDRESS} from "../../config/constants";
import saleAbi from "../../config/PhaseableSaleABI.json";
import erc20Abi from "../../config/erc20.json";
import LogoUser from '../../assets/images/logo-user.jpeg'
import ellipse from '../../assets/images/Ellipse.png'
import {useHistory} from "react-router-dom";
import './UserComponent.css'
import img from './../../assets/images/svg/elemet.svg';
import back from './../../assets/images/svg/back.svg';

const UserComponent = ({user}) => {
    const wallet = useWallet();
    const [price, setPrice] = useState(0);
    const [balance, setBalance] = useState(0);
    const [documents, setDocuments] = useState(false);
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
            <div className={'form-block'}>
                <div className={'form-user-inputs'}>
                    <div className={'line-padding'}>
                        <div className={'user-header'}>
                            {!documents ? <h2 className={'titleStyle'}>My Profile</h2> :
                                <h2 className={'titleStyle'}>My Documents</h2>}
                            <img className={'ellipseStyle'} src={ellipse} alt="ellipse"/>
                        </div>
                        <hr className={'line-myprofile'}></hr>
                    </div>
                    {documents ?
                        <div className={'documents-block'}>
                            <div className={'documents-table-header'}>
                                <div>Date</div>
                                <div>Name</div>
                            </div>
                            <div className={'documents-table-documents'}>
                                {user?.Agreement?.length > 0 ? user?.Agreement.map((agreement, i) =>
                                    <div key={i} className={'documents-table-header'}>
                                        <div>{agreement.createdAt.slice(0, 10)}</div>
                                        <div>{agreement.file.split('-').pop()}</div>
                                        <button className={'documents-button-download'}>
                                            <a href={agreement.file}>Download</a>
                                        </button>
                                    </div>) : <div>No any documents</div>
                                }
                            </div>
                        </div> :
                        <>
                            <div>Personal information</div>
                            <div className={'inputsStyle'}>
                                <div>
                                    <p className={'partStyle'}>
                                        <label className={'labelStyle'}>Title:</label>
                                        <input
                                            type="text"
                                            value={user.title ? user.title : ''}
                                            className={'fieldStyle'}
                                            disabled
                                        />
                                    </p>
                                    <p className={'partStyle'}>
                                        <label className={'labelStyle'}>First Name:</label>
                                        <input
                                            type="text"
                                            value={user.firstName ? user.firstName : ''}
                                            className={'fieldStyle'}
                                            disabled
                                        />
                                    </p>
                                    <p className={'partStyle'}>
                                        <label className={'labelStyle'}>Surname:</label>
                                        <input
                                            type="text"
                                            value={user.surName ? user.surName : ''}
                                            className={'fieldStyle'}
                                            disabled
                                        />
                                    </p>
                                    <p className={'partStyle'}>
                                        <label className={'labelStyle'}>Email:</label>
                                        <input
                                            type="text"
                                            value={user.email ? user.email : ''}
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
                                            value={user.address ? user.address : ''}
                                            className={'fieldStyle'}
                                            disabled
                                        />
                                    </p>
                                    <p className={'partStyle'}>
                                        <label className={'labelStyle'}>ZIP-Code:</label>
                                        <input
                                            type="text"
                                            value={user.zipcode ? user.zipcode : ''}
                                            className={'fieldStyle'}
                                            disabled
                                        />
                                    </p>
                                    <p className={'partStyle'}>
                                        <label className={'labelStyle'}>City:</label>
                                        <input
                                            type="text"
                                            value={user.city ? user.city : ''}
                                            className={'fieldStyle'}
                                            disabled
                                        />
                                    </p>
                                </div>
                            </div>
                        </>
                    }
                </div>
                <div className={documents ? 'back-button-active' : 'no-documents'}>
                    {!documents ? <div>
                        <div>Assets</div>
                        <p className={'partStyle'}>
                            <label className={'labelStyle'}>Available TRCYN TOKEN:</label>
                            <input
                                type="text"
                                value={balance ? balance : ''}
                                className={'redStyle'}
                                disabled
                            />
                        </p>
                        <p className={'partStyle'}>
                            <label className={'labelStyle'}>Value in USD$:</label>
                            <input
                                type="text"
                                value={balance && price ? balance * price : ''}
                                className={'redStyle'}
                                disabled
                            />
                        </p>
                    </div> : <div></div>}
                    {documents ? <button className={'to-profile-button'} onClick={() => setDocuments(false)}>
                            <img src={back} alt="#" className={'documents-img'}/>
                            <span className={'documents-text'}>Back to My profile</span>
                        </button> :
                        <button className={'documents-button'} onClick={() => setDocuments(true)}>
                            <span className={'documents-text'}>Documents</span>
                            <img src={img} alt="#" className={'documents-img'}/>
                        </button>
                    }
                </div>
            </div>
        </div>
    );
};


export default UserComponent;
