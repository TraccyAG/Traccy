import React from 'react';
import { Container, Row, Col, SvgIcon } from '../../components/common';
import { Drawer, Tabs } from 'antd';
import { useMediaQuery } from 'react-responsive'
import HTMLFlipBook from 'react-pageflip';
import './index.scss';

import { Link, useHistory, useParams } from 'react-router-dom';

import BannerImg from '../../assets/images/itt-slide.jpg';
import MapImg from '../../assets/images/map.png';
import PopupImg1 from '../../assets/images/popup-img1.jpg';
import PopupImg2 from '../../assets/images/popup-img2.jpg';
import PopupImg3 from '../../assets/images/popup-img3.jpg';
import BookImg1 from '../../assets/images/bookimg1.png'
import { useState } from 'react';
import { Sliders } from '../ImpactThroughTraccy';

const items = [
    {
        key: '1',
        label: `Roadmap`,
    },
    {
        key: '2',
        label: `Business`,
    },
    {
        key: '3',
        label: `Financial`,
    },
    {
        key: '4',
        label: `Impact`,
    },
];

const ImpactThroughTraccyDetails = () => {
    const router = useHistory();
    const { index, pIndex } = useParams();

    const [showContent1, setShowContent1] = React.useState(false);
    const [showContent2, setShowContent2] = React.useState(false);
    const [showContent3, setShowContent3] = React.useState(false);
    const smallDeviceBook = useMediaQuery({ query: '(max-width: 991px)' })
    const hideModal = () => {
        setShowContent1(false);
        setShowContent2(false);
        setShowContent3(false);
    }
    const showModal1 = () => {
        setShowContent1(true);
        setShowContent2(false);
        setShowContent3(false);
    };
    const showModal2 = () => {
        setShowContent2(true);
        setShowContent1(false);
        setShowContent3(false);
    };
    const showModal3 = () => {
        setShowContent3(true);
        setShowContent1(false);
        setShowContent2(false);
    };

    const [openModal, setOpen] = useState(false);
    const [stageIndex, setStageIndex] = useState(0);
    const onConnect = (index) => {
        setOpen(true);
        setStageIndex(index)
    }

    const onClose = () => {
        if (openModal)
            setOpen(false)
    }

    const goDetail = (project, index) => {
        if (project.route)
            router.push(`/impact-through-traccy-details/${project.route}`)
        else
            router.push(`/impact-through-traccy-details/${stageIndex}/${index}`)
    }
    return (
        <div className='itt-dtl-wrapper' onClick={onClose}>
            <section className='banner-section'>
                <div className='about-banner' style={{ backgroundImage: `url(${Sliders[index ?? 0].banner})` }}></div>
                <Link to='/impact-through-traccy/0' className='backarrow'>
                    <SvgIcon name='arrow-left' viewbox='0 0 9.071 16.492' />
                    Back
                </Link>
                <div>
                    <Container>
                        <div className="stage-wrapper">
                            <div className="stage-main">
                                <div className="stage-left">
                                    <h1>
                                        Traccy Solar
                                    </h1>
                                    <span className="desc">We are changing theSolar Technology</span>
                                    <span className="application">Fundraising required</span>
                                    <div className="selection">
                                        <span className="number">3’230’000 $</span>
                                    </div>
                                    <div className="project-list-button" onClick={() => onConnect(0)}>
                                        <div className="list-indicator" />
                                        <span>Project List</span>
                                    </div>
                                </div>
                                <div className="stage-right">
                                    <div className="processing"><span>Processing Time</span></div>
                                    <div className="processing-desc">
                                        <span>9</span>
                                        <span>month</span>
                                    </div>
                                    <div className="world"><span>Break Event Point</span></div>
                                    <div className="world-desc">
                                        <span>18</span>
                                        <span>months</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
                <Drawer
                    title={false}
                    placement='right'
                    width={"100%"}
                    onClose={onClose}
                    closeIcon={false}
                    open={openModal}
                    rootClassName='project-sidebar'
                >
                    <div className="project-list">
                        <div className="title">
                            <span>Project List</span>
                        </div>
                        {Sliders[stageIndex].projects.map((project, index) => (
                            <div className="item" onClick={() => goDetail(project, index)}>
                                <img src={project.image} alt="avatar" />
                                <div className="splitter" />
                                <span>{project.number}</span>
                                <div className="splitter outer" />
                            </div>
                        ))}
                    </div>
                </Drawer>
            </section>
            <section className='book-section'>
                <Container>
                    <Row>
                        <Col>
                            <HTMLFlipBook width={300} height={smallDeviceBook ? 400 : 160} size={smallDeviceBook ? 'fixed' : 'stretch'}>
                                <div className="demoPage">
                                    <div className='bookpage-inner-left'>
                                        <div className='uppaer-row'>
                                            <p>
                                                Traccy Solar AG
                                            </p>
                                        </div>
                                        <div className='bottom-row'>
                                            <h2>Traccy Solar</h2>
                                            <h4>Revolution of Solar impact</h4>
                                            <Tabs defaultActiveKey="1" items={items} />
                                        </div>
                                        <div className='arrow-right-sm'>
                                            <SvgIcon name='circle-bottom' viewbox='0 0 51 50.998' />
                                        </div>
                                    </div>
                                </div>
                                <div className="demoPage">
                                    <div className='bookpage-inner-right'>
                                        <div className='arrow-left-sm'>
                                            <SvgIcon name='circle-bottom' viewbox='0 0 51 50.998' />
                                        </div>
                                        <div className='left-col'>
                                            <div className='left-upper'>
                                                <h4>We are planning to Construction</h4>
                                                <p>
                                                    200'000 square mater of Solar Pannel
                                                </p>
                                            </div>
                                            <div className='left-bottom'>
                                                <h1>8</h1>
                                                <div className='small-head'>
                                                    <p>Construction period</p>
                                                    <h4>Month</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='right-col'>
                                            <img src={BookImg1} alt={BookImg1} />
                                            <h4>We are planning</h4>
                                            <p>Orchid wer nehmen Personen of meine</p>
                                        </div>
                                        <div className='arrow-right'>
                                            <SvgIcon name='circle-bottom' viewbox='0 0 51 50.998' />
                                        </div>
                                    </div>
                                </div>
                                <div className="demoPage">
                                    <div className='bookpage-inner-left'>
                                        <div className='arrow-left'>
                                            <SvgIcon name='circle-bottom' viewbox='0 0 51 50.998' />
                                        </div>
                                        <div className='uppaer-row'>
                                            <p>
                                                Orchid wer nehmen Personen of meine Perdurent montes, necetur ridodus
                                            </p>
                                        </div>
                                        <div className='bottom-row'>
                                            <h2>Traccy Solar</h2>
                                            <h4>Modern engineering</h4>
                                            <Tabs defaultActiveKey="1" items={items} />
                                        </div>
                                        <div className='arrow-right-sm'>
                                            <SvgIcon name='circle-bottom' viewbox='0 0 51 50.998' />
                                        </div>
                                    </div>
                                </div>
                                <div className="demoPage">
                                    <div className='bookpage-inner-right'>
                                        <div className='arrow-left-sm'>
                                            <SvgIcon name='circle-bottom' viewbox='0 0 51 50.998' />
                                        </div>
                                        <div className='left-col'>
                                            <div className='left-upper'>
                                                <h4>We are planning to Construction</h4>
                                                <p>
                                                    Orchid wer nehmen Personen of meine Perdurent montes, necetur ridodus
                                                </p>
                                            </div>
                                            <div className='left-bottom'>
                                                <h1>8</h1>
                                                <div className='small-head'>
                                                    <p>Construction period</p>
                                                    <h4>Month</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='right-col'>
                                            <img src={BookImg1} alt={BookImg1} />
                                            <h4>We are planning</h4>
                                            <p>Orchid wer nehmen Personen of meine</p>
                                        </div>
                                        <div className='arrow-right'>
                                            <SvgIcon name='circle-bottom' viewbox='0 0 51 50.998' />
                                        </div>
                                    </div>
                                </div>
                                <div className="demoPage">
                                    <div className='bookpage-inner-left'>
                                        <div className='arrow-left'>
                                            <SvgIcon name='circle-bottom' viewbox='0 0 51 50.998' />
                                        </div>
                                        <div className='uppaer-row'>
                                            <p>
                                                Orchid wer nehmen Personen of meine Perdurent montes, necetur ridodus
                                            </p>
                                        </div>
                                        <div className='bottom-row'>
                                            <h2>Aura</h2>
                                            <h4>Modern engineering</h4>
                                            <Tabs defaultActiveKey="1" items={items} />
                                        </div>
                                    </div>
                                    <div className='arrow-right-sm'>
                                        <SvgIcon name='circle-bottom' viewbox='0 0 51 50.998' />
                                    </div>
                                </div>
                                <div className="demoPage">
                                    <div className='bookpage-inner-right'>
                                        <div className='arrow-left-sm'>
                                            <SvgIcon name='circle-bottom' viewbox='0 0 51 50.998' />
                                        </div>
                                        <div className='left-col'>
                                            <div className='left-upper'>
                                                <h4>We are planning to Construction</h4>
                                                <p>
                                                    Orchid wer nehmen Personen of meine Perdurent montes, necetur ridodus
                                                </p>
                                            </div>
                                            <div className='left-bottom'>
                                                <h1>8</h1>
                                                <div className='small-head'>
                                                    <p>Construction period</p>
                                                    <h4>Month</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='right-col'>
                                            <img src={BookImg1} alt={BookImg1} />
                                            <h4>We are planning</h4>
                                            <p>Orchid wer nehmen Personen of meine</p>
                                        </div>
                                    </div>
                                </div>
                            </HTMLFlipBook>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className='map-section'>
                <div className='blur-circle1'></div>
                <div className='blur-circle2'></div>
                <div className='blur-circle3'></div>
                <Container>
                    <Row>
                        <Col>
                            <h2 className='header-title'>OUR GLOBAL PROJECTS</h2>
                            <div className='map-wrapper'>
                                <div className='project-center'>
                                    {showContent1 &&
                                        <div className='popup'>
                                            <div className='popup-inner'>
                                                <SvgIcon name='close' viewbox='0 0 10.357 10.357' onClick={hideModal} />
                                                <img src={PopupImg1} alt="Popup" />
                                            </div>
                                        </div>
                                    }
                                    {showContent2 &&
                                        <div className='popup'>
                                            <div className='popup-inner'>
                                                <SvgIcon name='close' viewbox='0 0 10.357 10.357' onClick={hideModal} />
                                                <img src={PopupImg2} alt="Popup" />
                                            </div>
                                        </div>
                                    }
                                    {showContent3 &&
                                        <div className='popup'>
                                            <div className='popup-inner'>
                                                <SvgIcon name='close' viewbox='0 0 10.357 10.357' onClick={hideModal} />
                                                <img src={PopupImg3} alt="Popup" />
                                            </div>
                                        </div>
                                    }
                                    <div className='points' onClick={showModal1}>
                                        <span></span>
                                        <div>01</div>
                                    </div>
                                    <div className='points' onClick={showModal2}>
                                        <span></span>02
                                    </div>
                                    <div className='points' onClick={showModal3}>
                                        03 <span></span>
                                    </div>
                                    <div className='points'>
                                        <span></span>
                                        <div>04</div>
                                    </div>
                                    <div className='points'>
                                        05 <span></span>
                                    </div>
                                    <div className='points'>
                                        <div>06</div> <span></span>
                                    </div>
                                    <div className='points'>
                                        07 <span></span>
                                    </div>
                                </div>
                                <img src={MapImg} alt='Map' />
                            </div>
                        </Col>
                    </Row>
                </Container>
                {showContent1 &&
                    <div className='bottom-left-details details1'>
                        <div className='numbers'>
                            <div className='color-bar'></div>
                            01.
                        </div>
                        <div className='right-content'>
                            <h4>FlyOut</h4>
                            <p>
                                Automatic Misting System for reduce the Fly problem (mosquito, fly, etc) in organic way
                            </p>
                        </div>
                    </div>
                }
                {showContent2 &&
                    <div className='bottom-left-details details2'>
                        <div className='numbers'>
                            <div className='color-bar'></div>
                            02.
                        </div>
                        <div className='right-content'>
                            <h4>Traccy Solar</h4>
                            <p>
                                A new way to use Solar energy for enpower Green Endergy and reduce Carbos emission
                            </p>
                        </div>
                    </div>
                }
                {showContent3 &&
                    <div className='bottom-left-details details3'>
                        <div className='numbers'>
                            <div className='color-bar'></div>
                            03.
                        </div>
                        <div className='right-content'>
                            <h4>DecentralCity</h4>
                            <p>
                                Make 100% autonomus a city from Food, Water, Energy and the main resources
                            </p>
                        </div>
                    </div>
                }
                <div className='right-numbers'>
                    <ul>
                        <li className={showContent1 === true ? 'selected' : ''} onClick={showModal1}>01 <span>FlyOut</span></li>
                        <li className={showContent2 === true ? 'selected' : ''} onClick={showModal2}>02 <span>Traccy Solar</span></li>
                        <li className={showContent3 === true ? 'selected' : ''} onClick={showModal3}>03 <span>DecentralCity</span></li>
                    </ul>
                </div>
            </section>
        </div>
    )
};

export default ImpactThroughTraccyDetails