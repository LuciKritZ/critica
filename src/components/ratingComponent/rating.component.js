import React from 'react';
import StarRatings from 'react-star-ratings';

// TO DO:
// Add editing options for critic review and return rating in integer
const RatingComponent = ({
    rating,
    starDimension = '20px',
    starSpacing = '2px',
    starRatedColor = '#ffd814',
    starEmptyColor = '#e0e2e7',
}) => (
    <>
        <StarRatings
            rating={rating}
            starDimension={starDimension}
            starSpacing={starSpacing}
            starRatedColor={starRatedColor}
            starEmptyColor={starEmptyColor}
        />
    </>
);

export default RatingComponent;
