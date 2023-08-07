import {Button, Divider} from "antd";
import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {useMediaQuery} from 'react-responsive';

import {Col, Container, Row, SvgIcon} from "../../common";
import './Footer.scss';

import img1 from '../../../assets/images/footer/img1.svg';
import img2 from '../../../assets/images/footer/img2.svg';
import Logo from '../../../assets/images/logo.png';
import SimpleCarousel from "./Swiper/SimpleCarouse";


const Footer = () => {
    const isMobileScreen = useMediaQuery({maxWidth: 668});
    const isDesktopScreen = useMediaQuery({minWidth: 669});

    const [links, setLinks] = useState(false);
    const [terms, setTerms] = useState(false);


    const handleClick = () => {
        const buttons = document.getElementsByClassName("connect-wallet-mobile")
        buttons[0].click();
    }
    const history = useHistory();


    return (
        <footer className="footer">
            {isDesktopScreen &&
                <Container>
                    <Row>
                        <Col>
                            <Divider/>
                        </Col>
                    </Row>
                    <Row className="footer-upper">
                        <Col lg='5'>
                            <Row>
                                <Col lg='6'>
                                    <h3>TRACCY AG</h3>
                                    <ul>
                                        <a href="#">
                                            <li className={'hover_none'}>
                                                <div style={{padding: '4px 0 4px 0'}}>Chaltenbodenstrasse 6a,</div>
                                                <div style={{padding: '4px 0 4px 0'}}>8834 Schindellegi</div>
                                                <div style={{padding: '4px 0 4px 0'}}>info@traccy.ch</div>
                                                <div style={{padding: '4px 0 4px 0'}}>+41 43 810 29 51</div>
                                            </li>
                                        </a>
                                        <a href='https://portal.traccy.io/Policy.html'>
                                            <li>Terms of Use</li>
                                        </a>
                                    </ul>
                                </Col>
                                <Col lg='6' className={'col-padding'}>
                                    <h3>Links</h3>
                                    <ul style={{width: '107%'}}>
                                        <a href="https://support.metamask.io/hc/en-us/articles/360015489531-Getting-started-with-MetaMask">
                                            <li>Create Metamask</li>
                                        </a>
                                        <a href="https://metamask.io/news/latest/buying-crypto-in-portfolio-dapp-for-an-easy-experience-the-metamask-way/">
                                            <li>Deposite Metamask</li>
                                        </a>
                                    </ul>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg='3' className="subscribe-col col-padding">
                            <h3>Log in to your Account</h3>
                            <p>Log in to your account to
                                participate in STO </p>
                            <Button type="primary" onClick={() => history.push('/login')}
                                    id="footer-wallet">Login</Button>
                        </Col>
                        <Col lg='4'>
                            <div className={'img_footer_block'}>
                                <ul>
                                    <li style={{marginBottom: '40px'}}><img src={img1} alt="footer" style={{
                                        width: '224px',
                                        height: '63px'
                                    }}/></li>
                                    <li><img src={img2} alt="footer" style={{
                                        width: '185px',
                                        height: '72px'
                                    }}/></li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <Row className='footer-bottom'>
                        <Col lg='8'>
                            <div className="left-inner">
                                <img src={Logo} alt='Logo'/>
                                <p>Copyright © Traccy AG. <br/> Traccy was co-founded by Dedry Misamu, Mick Misamu and
                                    Joas
                                    Fischer.</p>
                            </div>
                        </Col>
                        <Col lg='4'>
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
                        </Col>
                    </Row>
                </Container>
            }
            {isMobileScreen &&
                <Container>
                    <div className="footer-upper">
                        <div className={'img_footer_block'}>
                            <SimpleCarousel/>
                        </div>
                        <div className={'terms_links_block'}>
                            <div className={'links'}>
                                <div>
                                    <h3>LINKS</h3>
                                    <div className={links ? 'links_img' : 'terms_img'}
                                         onClick={() => setLinks(!links)}></div>
                                </div>
                                {links &&
                                    <ul style={{width: '100%', marginTop: '15px'}}>
                                        <a href="https://support.metamask.io/hc/en-us/articles/360015489531-Getting-started-with-MetaMask">
                                            <li>Create Metamask</li>
                                        </a>
                                        <a href="https://metamask.io/news/latest/buying-crypto-in-portfolio-dapp-for-an-easy-experience-the-metamask-way/">
                                            <li>Deposite Metamask</li>
                                        </a>
                                    </ul>
                                }
                            </div>
                            <div className={'terms'}>
                                <div>
                                    <h3>TRACCY AG</h3>
                                    <div className={terms ? 'links_img' : 'terms_img'}
                                         onClick={() => setTerms(!terms)}></div>
                                </div>
                                {terms &&
                                    <ul>
                                        <a href="#">
                                            <li className={'hover_none'}>
                                                <div style={{padding: '4px 0 4px 0'}}>Chaltenbodenstrasse 6a,</div>
                                                <div style={{padding: '4px 0 4px 0'}}>8834 Schindellegi</div>
                                                <div style={{padding: '4px 0 4px 0'}}>info@traccy.ch</div>
                                                <div style={{padding: '4px 0 4px 0'}}>+41 43 810 29 51</div>
                                            </li>
                                        </a>
                                        <a href={''}>
                                            <li>Terms of Use</li>
                                        </a>
                                    </ul>
                                }
                            </div>
                        </div>
                        <Col lg='3' className="log_in">
                            <h3>Log in to your Account</h3>
                            <p>Log in to your account to
                                participate in STO </p>
                            <Button type="primary" onClick={() => history.push('/login')}
                                    id="footer-wallet">Login</Button>
                        </Col>
                    </div>
                    <Row className='footer-bottom'>
                        <Col className={'social_icons_footer'}>
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
                        </Col>
                        <Col>
                            <div className="left-inner">
                                <img src={Logo} alt='Logo'/>
                                <p>Copyright © Traccy AG. <br/> Traccy was co-founded by Dedry Misamu, Mick Misamu and
                                    Joas
                                    Fischer.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            }
        </footer>
    );
}

export default Footer;
