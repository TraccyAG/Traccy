import React from 'react';
import './ImageGallery.css';
import image1 from '../../../../assets/images/farm/Group 370792.png'
import image2 from '../../../../assets/images/farm/Group 370791.png'
import image3 from '../../../../assets/images/farm/Group 370790.png'
import image4 from '../../../../assets/images/farm/Group 370793.png'
const slide_img = [
    image1,image2,image3,image4
];

const ImageGallery = () => {
    return (
        <div className="image-gallery">
            {slide_img.map((img, i) => (
                <img
                    key={i}
                    src={img}
                    alt=""
                    className={`image-gallery__item ${
                        i !== 0 ? 'image-gallery__item--overlap' : ''
                    }`}
                />
            ))}
        </div>
    );
};

export default ImageGallery;
