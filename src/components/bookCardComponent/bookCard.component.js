import React from 'react';
import ImageComponent from '../imageComponent/image.component';
import RatingComponent from '../ratingComponent/rating.component';
import './bookCard.component.scss';

// To Do:
// check Add functionality to add books as read or bookmark it
//

const BookCardComponent = ({ bookInfo }) => (
    <>
        <div className="card-book">
            <ImageComponent src={bookInfo.url} alt={bookInfo.title} />
            <div className="book-info-container">
                <p className="book-title" title={bookInfo.title}>
                    {bookInfo.title}
                </p>
                <p className="book-author">by {bookInfo.author}</p>
                <div>
                    <RatingComponent rating={bookInfo.avgRating} />
                    <span className="book-ratings">({bookInfo.totalRating})</span>
                </div>
            </div>
        </div>
    </>
);

export default BookCardComponent;
