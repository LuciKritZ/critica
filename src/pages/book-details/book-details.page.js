/* eslint-disable no-console */
/* eslint-disable max-len */
import { Button, Progress } from 'antd';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ImageComponent from '../../components/imageComponent/image.component';
import RatingComponent from '../../components/ratingComponent/rating.component';
import './book-details.page.scss';

const bookData = {
    bookCover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1503088065l/36065279._SX318_.jpg',
    title: 'I Do What I Do',
    author: 'Raghuram G. Rajan',
    details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    averageRating: 4.1,
    totalRating: '10,313',
    totalComments: 10,
    stars: {
        1: 3,
        2: 1,
        3: 1,
        4: 4,
        5: 1
    }
};

const BookDetails = () => {
    const { id } = useParams();
    console.log(id, 'id');
    const updateBookStatus = (isBookMark, isRead) => {
        console.log(isBookMark, isRead);
    }
    const returnPercentage = (total, current) => ((100 * current) / total);

    const getRatings = () => {
        console.log(returnPercentage(bookData.totalComments, bookData.stars[1]), 'wwww');
    }
    const ratingsFilter = () => {
        console.log('wsssss');
    }
    useEffect(() => {
        document.title = 'Books Info';
        axios.get(`${process.env.REACT_API_URL}review/${id}`)
            .then((response) => {
                console.log(response);
                getRatings();
            })
            .catch((error) => {
                console.log('Something went wrong', error);
            });
    }, [id]);

    return (
        <div className="wrapper">
            <div className="pageWrapper">
                <div className="bookInfoWrapper">
                    <div className="bookInfoContainer">
                        <div className="bookImgContainer">
                            <ImageComponent
                                src={bookData.bookCover}
                                alt={bookData.title}
                                extraClass='bookDetailImage' />
                        </div>
                        <div className="bookDataContainer">
                            <div className="bookTitle">{bookData.title}</div>
                            <div className="bookAuthor"> by {bookData.author}</div>
                            {/* <div className="bookRatng"> by {bookData.author}</div> */}
                            <div className="book-ratings">
                                <RatingComponent
                                    starDimension='19px'
                                    starSpacing='1px'
                                    rating={bookData.averageRating} />
                                <span> {bookData.averageRating} </span>
                                <span className="book-total-reviews">
                                    {bookData.totalComments} reviews
                                </span>
                            </div>
                            <div className="bookDetails">
                                {bookData.details}
                            </div>
                            <div>
                                <Button type="primary"
                                    className="bookStatusBtn"
                                    onClick={() => updateBookStatus(true, false)}>
                                    Book Mark
                                </Button>
                                <Button type="primary"
                                    className="bookStatusBtn"
                                    style={{ marginLeft: '10px' }}
                                    onClick={() => updateBookStatus(false, true)}>
                                    Book Read
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ratingInfoWrapper">
                    <div className="ratingInfoContainer">
                        <div className="ratingRow">
                        <div className="ratingData">
                            <div className="rating-title">
                                Critics Review
                            </div>
                            <div className="book-ratings">
                                    <RatingComponent
                                        starDimension='22px'
                                        starSpacing='2px'
                                        rating={bookData.averageRating} />
                                <span> {bookData.averageRating} </span>
                            </div>
                            <div className="book-total-reviews">
                                {bookData.totalComments} total reviews
                            </div>
                        </div>
                        </div>
                        <div className="ratingBar">
                            <div className="eachRatingBar">
                                <span className="starName">5 star</span>
                                <Progress percent={30} onClick={ratingsFilter} />
                            </div>
                            <div className="eachRatingBar">
                                <span className="starName">4 star</span>
                                <Progress percent={30} onClick={ratingsFilter} />
                            </div>
                            <div className="eachRatingBar">
                                <span className="starName">3 star</span>
                                <Progress percent={30} onClick={ratingsFilter} />
                            </div>
                            <div className="eachRatingBar">
                                <span className="starName">2 star</span>
                                <Progress percent={30} onClick={ratingsFilter} />
                            </div>
                            <div className="eachRatingBar">
                                <span className="starName">1 star</span>
                                <Progress percent={30} onClick={ratingsFilter} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default BookDetails;
