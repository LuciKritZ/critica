import React from 'react';
import './image.component.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// TO DO:
// check how to show circle profile picture
// default image when error
// check loading state
// isLazyLoading = false
const ImageComponent = ({ src, alt }) => (
    <>
        <LazyLoadImage
            src={src}
            alt={alt}
            className="image-class hover_grow hover_shadow-lg"
            threshold="100"
            effect="blur"
        />
    </>
);

export default ImageComponent;
