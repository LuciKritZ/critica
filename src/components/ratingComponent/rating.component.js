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
    starHoverColor = '#fce02b',
    isRatingChangeAllowed = false,
    onChangeRatingFunc
}) => {
    const onChangeRating = (newRating) => {
        onChangeRatingFunc(newRating);
    }
    return (
        <>
            {
                isRatingChangeAllowed ?
                    <StarRatings
                        rating={rating}
                        changeRating={onChangeRating}
                        starHoverColor={starHoverColor}
                        starDimension={starDimension}
                        starSpacing={starSpacing}
                        starRatedColor={starRatedColor}
                        starEmptyColor={starEmptyColor}
                    /> :
                    <StarRatings
                        rating={rating}
                        starDimension={starDimension}
                        starSpacing={starSpacing}
                        starRatedColor={starRatedColor}
                        starEmptyColor={starEmptyColor}
                    />

            }

        </>
    )
};

export default RatingComponent;
