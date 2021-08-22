import React from 'react';
import './image.component.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { appHistory } from '../../utils/history.utils';

// TO DO:
// check how to show circle profile picture
// default image when error
// check loading state
// isLazyLoading = false
const ImageComponent = ({ src, alt, redirect, extraClass }) => {
    const redirectFunc = () => {
        if (redirect) {
            appHistory.push(`/books/${redirect}`);
        }
    };
    return (
        <>
            <LazyLoadImage
                src={src}
                alt={alt}
                onClick={() => redirectFunc()}
                // eslint-disable-next-line max-len
                className={`image-class ${redirect ? `cursor-ponter ` : ` `} ${
                    extraClass || ` hover_grow hover_shadow-lg`
                }`}
                threshold="100"
                effect="blur"
            />
        </>
    );
};

export default ImageComponent;
