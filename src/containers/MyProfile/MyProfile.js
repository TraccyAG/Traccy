import React, { useEffect, useState } from 'react';
import { userService } from "../../service/user.service";
import UserComponent from "../UserComponent/UserComponent";
import {SvgIcon} from "../../components/common";
import {Button, Steps} from "antd";
import {UserContext} from "../BecomePart";

const MyProfile = () => {
    const userId = localStorage.getItem('userId');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data } = await userService.getUserById(userId);
                setUser(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    console.log(user);

    return (
        <div>
            <UserContext.Provider >
                <div className='becomepart-wrapper'>
                    <div className="polygon-effect">
                        <img src="/invest-form/left-hexa.png" alt="polygon-left"/>
                        <img src="/invest-form/right-hexa.png" alt="polygon-right"/>
                    </div>
                    <div className='leftbar'>
                        <div className='social-icon-list'>
                            <a href="https://twitter.com/traccy_official?s=11&t=_z6GdVt91PmJiJmxDvd8sA">
                                <SvgIcon name='twitter' viewbox='0 0 36 29.239'/>
                            </a>
                            <a href="https://web.telegram.org/z/#-1837824968">
                                <SvgIcon name='telegram' viewbox='0 0 34.875 34.664'/>
                            </a>
                            <a href="https://www.instagram.com/traccy_official/">
                                <SvgIcon name='instagram' viewbox='0 0 32.999 32.999'/>
                            </a>
                            <a href="https://www.linkedin.com/company/traccy-ag/?viewAsMember=true">
                                <SvgIcon name='linkedin' viewbox='0 0 32.001 32.001'/>
                            </a>
                        </div>
                    </div>
                    <div className='right-section'>
                        {/* <div className='header-bar'>
        <Navbar />
    </div> */}
                        <div className={`rightbar-inner ${user ? 'user' : ''}`}>
                            {user &&
                                <>
                                    <div className="text-bar">
                                        <hr className="vertical-line"/>
                                        <div className="text-bar-content">
                                            <div>
                                                <h2 >Believe</h2>
                                                <p style={{color:'rgba(230, 43, 201, 1)'}}>in a bright future</p>
                                            </div>
                                            <div>
                                                <h2>Invest</h2>
                                                <p style={{color:'rgba(159, 100, 235, 1)'}}>In impact</p>
                                            </div>
                                            <div>
                                                <h2>Achieve</h2>
                                                <p style={{color:'rgba(23, 197, 250, 1)'}}>change</p>
                                            </div>
                                        </div>
                                    </div>


                                    <div className={'light-container'}>

                                    </div>
                                </>
                            }

                            <div className={`dtl-section ${user ? 'user' : ''}`}>
                                {loading ? (
                                    <div>Loading...</div> // Show a loading state if `loading` is true
                                ) : user ? (
                                    <UserComponent user={user}/>
                                ) : (
                                    <>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </UserContext.Provider>
            {/*{user && <UserComponent user={user} />}*/}
        </div>
    );
};

export default MyProfile;
