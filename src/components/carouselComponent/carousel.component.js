/* eslint-disable react/prop-types */
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './carousel.component.scss';

const responsiveDevice = {
    desktop: {
        breakpoint: {
            max: 3000,
            min: 1300,
        },
        items: 6,
        partialVisibilityGutter: 40,
    },
    mobile: {
        breakpoint: {
            max: 400,
            min: 0,
        },
        items: 1,
        partialVisibilityGutter: 30,
    },
    tablet1: {
        breakpoint: {
            max: 1300,
            min: 1050,
        },
        items: 5,
        partialVisibilityGutter: 30,
    },
    tablet: {
        breakpoint: {
            max: 1050,
            min: 850,
        },
        items: 4,
        partialVisibilityGutter: 30,
    },
    mini: {
        breakpoint: {
            max: 850,
            min: 650,
        },
        items: 3,
        partialVisibilityGutter: 30,
    },
    palmtop: {
        breakpoint: {
            max: 650,
            min: 400,
        },
        items: 2,
        partialVisibilityGutter: 30,
    },
};
const CarouselComponent = ({ render }) => (
    <>
        <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="carousel-container"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite={false}
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={responsiveDevice}
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
        >
            {render()}
        </Carousel>
    </>
);

export default CarouselComponent;
