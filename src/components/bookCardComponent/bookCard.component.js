/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button } from 'antd';
import React from 'react';
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import ImageComponent from '../imageComponent/image.component';
import RatingComponent from '../ratingComponent/rating.component';
import './bookCard.component.scss';
import { appHistory } from '../../utils/history.utils';

const BookCardComponent = ({
    bookInfo,
    buttonFunc,
    buttonString,
    isShowButton = false,
    redirect = false,
    isRemoving= false,
}) => {
    const redirectFunc = () => {
        if (redirect) {
            appHistory.push(`/books/${redirect}`);
        }
    };

    const deleteFunc = (event) => {
        event.stopPropagation();
        buttonFunc();
    };
    
    return (
        <>
            <div className="card-book">
                <span href="#" onClick={() => redirectFunc()}>
                    <ImageComponent src={bookInfo.bookCover} alt={bookInfo.title} />
                    <div className="book-info-container">
                        <p className="book-title" title={bookInfo.title}>
                            {bookInfo.title}
                        </p>
                        <p className="book-author">by {bookInfo.author}</p>
                        {isShowButton ? (
                            <div>
                                <Button
                                    danger
                                    style={{ width: '100%' }}
                                    onClick={(event) => deleteFunc(event)}
                                    disabled={isRemoving}
                                >
                                    {buttonString} <DeleteOutlined /> 
                                    {isRemoving ? <LoadingOutlined /> : ''}
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <RatingComponent rating={bookInfo.averageRating} />
                                <span className="book-ratings">({bookInfo.totalComments})</span>
                            </div>
                        )}
                    </div>
                </span>
            </div>
        </>
    );
};

export default BookCardComponent;
