import React from 'react';
import {SvgIcon} from "../../../../components/common";
import arrow from "../../../../assets/images/farm/arrow.png";


const BookPage = ({nextPage, prevPage,header,text}) => {
    return (
        <div>
            <div className='bookpage-inner-left' >
                <div className="row">
                    <div className="left-section book">
                        <img src="/impact/traccy-agro/traccy-farm-logo.png" alt="mosquito"/>
                    </div>
                    <div className={'book-layout'}>
                        <h2>{header}</h2>
                        <p>{text}</p>
                    </div>
                    <div className='arrow-right-sm' onClick={nextPage} >
                        {/*<SvgIcon name='circle-bottom' viewbox='0 0 51 50.998' style={{fill: "white"}}/>*/}
                        <img src={arrow} style={{height:'30px'}} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookPage;