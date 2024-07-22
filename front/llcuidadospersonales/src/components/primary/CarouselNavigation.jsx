import React, { useState } from 'react';

const Carousel = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    return (
        <div className="relative w-full">
            <div className="overflow-hidden w-full">
                <img src={images[currentImageIndex]} alt="carousel" className="w-full " />
            </div>
            <div className="absolute inset-y-0 left-0 flex items-center">
                <button onClick={prevImage} className="fs-4 p-2 rounded-r-md hover:bg-gray-300">
                    &lt;
                </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
                <button onClick={nextImage} className="fs-4 p-2 rounded-r-md hover:bg-gray-300 border rounded">
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default Carousel;
