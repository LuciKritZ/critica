import { Button } from 'antd';
import React from 'react';
import ImageComponent from '../imageComponent/image.component';
import RatingComponent from '../ratingComponent/rating.component';
import './bookCard.component.scss';

const BookCardComponent = ({ bookInfo, isShowButton = false, buttonFunc, buttonString }) => (
    <>
        <div className="card-book">
            <ImageComponent
                src={bookInfo.bookCover}
                alt={bookInfo.title}
                redirect={bookInfo.id} />
            <div className="book-info-container">
                <p className="book-title" title={bookInfo.title}>
                    {bookInfo.title}
                </p>
                <p className="book-author">by {bookInfo.author}</p>
                {
                    isShowButton ?
                        <div>
                            <Button danger 
                                style={{ width: '100%' }}
                                onClick={() => buttonFunc(bookInfo.url)}>
                                {buttonString}
                            </Button>
                        </div>
                        :
                        <div>
                            <RatingComponent rating={bookInfo.averageRating} />
                            <span className="book-ratings">({bookInfo.totalComments})</span>
                        </div>
                }
            </div>
        </div>
    </>
);

export default BookCardComponent;
