import React from 'react';
import StarRatings from 'react-star-ratings';

// TO DO:
// Add editing options for critic review and return rating in integer
// import scss rating variables

const RatingComponent = ({
    rating,
    starDimension = '20px',
    starSpacing = '2px',
    starRatedColor = '#ffe53d',
    starEmptyColor = '#e6ebf5',
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
