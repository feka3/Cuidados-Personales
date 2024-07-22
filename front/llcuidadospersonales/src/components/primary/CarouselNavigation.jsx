import React from 'react';
import { Carousel } from "@material-tailwind/react";

const CarouselComponent = () => {
    return (
        <Carousel className="rounded-xl">
            <div className="relative w-full h-96">
                <img
                    src="https://www.osteopatia-sevilla.com/wp-content/uploads/2023/02/2-scaled.jpg"
                    alt="image 1"
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="relative w-full h-96">
                <img
                    src="https://www.vitalseguro.com/wp-content/uploads/2020/12/podo%CC%81logo.png"
                    alt="image 2"
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="relative w-full h-96">
                <img
                    src="https://harmonycosmetologia.com/wp-content/uploads/2023/12/Slider-1.png"
                    alt="image 3"
                    className="h-full w-full object-cover"
                />
            </div>
        </Carousel>
    );
};

export default CarouselComponent;
