import React, { useState } from 'react';
import './ImageGallery.css';

import image1 from '../../../../assets/images/farm/image1.jpeg';
import image2 from '../../../../assets/images/farm/image2.jpeg';
import image3 from '../../../../assets/images/farm/image3.jpeg';
import image4 from '../../../../assets/images/farm/image4.jpeg';

const slide_img = [image2, image4, image1, image3];

const ImageGallery = () => {
    const [showImagePopup, setShowImagePopup] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const openImage = (image) => {
        setSelectedImage(image);
        setShowImagePopup(true);
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    const closeImage = () => {
        setSelectedImage(null);
        setShowImagePopup(false);
        document.body.style.overflow = ''; // Enable scrolling
    };

    return (
        <div>
            <div className="image-gallery">
                {slide_img.map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        alt=""
                        className={`image-gallery__item ${
                            i !== 0 ? 'image-gallery__item--overlap' : ''
                        }`}
                        onClick={() => openImage(img)}
                    />
                ))}
            </div>
            {showImagePopup && (
                <div className="image-popup-overlay" onClick={closeImage}>
                    <div className="image-popup">
                        <img src={selectedImage} alt="" className="image-popup__image" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageGallery;
