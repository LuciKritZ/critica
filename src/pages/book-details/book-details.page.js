/* eslint-disable no-console */
/* eslint-disable max-len */
import { Button, Progress, Tag, Input, Form, Avatar } from 'antd';
import axios from 'axios';
import { DeleteOutlined, EditOutlined, LikeOutlined, UserOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cloneDeep from 'lodash.clonedeep';
import ImageComponent from '../../components/imageComponent/image.component';
import RatingComponent from '../../components/ratingComponent/rating.component';
import './book-details.page.scss';
import NoReview from '../../assets/noReviews.png';
import { useAuth } from '../../providers/auth-provider.providers';

const { TextArea } = Input;

// const bookData = {
//     bookCover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1503088065l/36065279._SX318_.jpg',
//     title: 'I Do What I Do',
//     author: 'Raghuram G. Rajan',
//     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//     averageRating: 4.1,
//     totalRating: '10,313',
//     totalComments: 10,
//     stars: {
//         1: 3,
//         2: 1,
//         3: 1,
//         4: 4,
//         5: 1
//     }
// };

let constCriticsReviewData = [];

const BookDetails = () => {
    const { id } = useParams();
    const { authenticated, userId, role } = useAuth();
    const [starsPercentage, setStarsPercentage] = useState([]);
    const [criticsReviewData, setCriticsReviewData] = useState([]);
    const [bookData, setBookData] = useState({});
    const [tags, setTags] = useState([]);
    const [form] = Form.useForm();
    const [averageRating, setAverageRating] = useState(0);
    const [isShowRatingError, setIsShowRatingError] = useState(false);


    console.log(authenticated, userId, role, 'vvv');
    // for bookread and bookmark apis
    const updateBookStatus = (bookStatus, isStatus) => {
        console.log(bookStatus, isStatus);
        if (authenticated && userId) {
            axios.put(`${process.env.REACT_API_URL}userbook/userbookdetails`, {
                bookID: id,
                ...(bookStatus === 1 && {
                    isInWishlist: isStatus
                }),
                ...(bookStatus === 2 && {
                    isRead: isStatus
                }),
                userID: userId
            }).then((response) => {
                console.log(response, 'response');
            })
        }

    }

    // returns percentage for rating bar
    const returnPercentage = (total, current) => {
        if(!current) {
            return 0;
        }
        return ((100 * current) / total);
    };

    // count percentage for rating bar
    const getRatings = (ratingInfo, totalComments) => {
        console.log(totalComments, ratingInfo, 'ratingInfo');
        const starsPercentageConst = [];
        for (let star = 1; star <= 5; star++) {
            starsPercentageConst.push(returnPercentage(totalComments, ratingInfo[star]))
        }
        setStarsPercentage(starsPercentageConst)
    }


    // ratings filter
    const ratingsFilter = (star) => {
        const filterTagsIndex = tags.findIndex((eachTags) => eachTags.filterid === 1);
        if (filterTagsIndex === -1) {
            setTags([...tags, { text: `star: ${star}`, value: star, filterid: 1 }]);
        } else {
            const constTags = tags;
            constTags[filterTagsIndex] = { text: `star: ${star}`, value: star, filterid: 1 };
            setTags([...constTags]);
        }
        console.log(constCriticsReviewData, 'constCriticsReviewData');
        const rewviewsFilteredData = constCriticsReviewData.filter((eachReviews) => eachReviews.rating === star);
        setCriticsReviewData([...rewviewsFilteredData]);
    }

    const fetchBooksData = () => {
        axios.get(`${process.env.REACT_API_URL}book`, {
            params: {
                bookID: id,
                ...(authenticated && userId && {
                    userID: userId
                })
            }
        })
            .then((response) => {
                console.log(response, 'books');
                setBookData(response.data.data);
                getRatings(response.data.ratingInfo, response.data.data.totalComments);
            })
            .catch((error) => {
                console.log('Something went wrong', error);
            });
    }

    const fetchReviewsData = () => {
        axios.get(`${process.env.REACT_API_URL}review/${id}`)
            .then((response) => {
                console.log(response);
                if(typeof response.data !== 'string') {
                    const rrData  = {
                        bookID: "uw0WELSJ5jIcUVDIumOM",
                        comment: "Nice book. Must read for investors",
                        creationDateAndTime: 1629374156025,
                        id: "CfkycouZcvuFnNBT80uQ",
                        rating: 4,
                        totalLikes: 0,
                        userFullName: "tttt Borkar",
                        userID: 1
                    }
                    const reviewsData = response.data.data;
                    reviewsData.push(rrData);
                    console.log([...reviewsData], 'rrr');
                    const reviewIndex = reviewsData.findIndex((eachReviews) => eachReviews.userID === userId);
                    if(reviewIndex !== -1) {
                        const myReviewData = reviewsData.splice(reviewIndex, 1);
                        reviewsData.unshift(myReviewData[0]);
                        console.log(reviewsData, 'reviewsData');
                    }
                    setCriticsReviewData(reviewsData);
                    constCriticsReviewData = cloneDeep(reviewsData);
                }
            })
            .catch((error) => {
                console.log('Something went wrong', error);
            });
    }

    useEffect(() => {
        document.title = 'Books Info';
        fetchBooksData();
        fetchReviewsData();
    }, [id]);

    // commments like api call
    const likeFunc = () => {
        console.log('ddddd likeFunc');
    }

    // add reviews
    const addReview = (values) => {
        if (!averageRating) {
            setIsShowRatingError(true);
        } else {
            const criticData = values;
            criticData.rating = averageRating;
            console.log(criticData, '/review, add reviews');
            axios.post(`${process.env.REACT_API_URL}review`, {
                rating: averageRating,
                comment: criticData.comment,
                bookID: id,
                userID: userId
            }).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    const onChangeRating = (newRating) => {
        console.log(newRating, 'newRating');
        setAverageRating(newRating);
        if (newRating) {
            console.log('aaa', newRating);
            setIsShowRatingError(false);;
        }
    }
    // clear filters
    const clearFilters = (index, closeTag) => {
        switch (closeTag.filterid) {
            case 1: {
                const filterTagsIndex = tags.findIndex((eachTag) => eachTag.filterid === 1);
                if (filterTagsIndex !== -1) {
                    const constTags = tags;
                    constTags.splice(filterTagsIndex, 1);
                    setTags([...constTags]);
                    setCriticsReviewData(cloneDeep([...constCriticsReviewData]));
                }
                break;
            }
            case 2: {
                const filterTagsIndex = tags.findIndex((eachTag) => eachTag.filterid === 1);
                if (filterTagsIndex !== -1) {
                    const constTags = tags;
                    constTags.splice(filterTagsIndex, 1);
                    setTags([...constTags]);
                }
                break;
            }
            default:
                break;
        }
    }

    const ReviewsComponent = ({ reviewData, likeFunction }) => (
        <div className={`criticsReview ${ reviewData.userID === userId ? `my-review` : ``} `}>
            <div className="criticsImg">
                {
                    false ?
                        <ImageComponent
                            src={bookData.bookCover}
                            alt={bookData.title}
                            extraClass='circle' />
                        : <Avatar
                            className="user-avatar" size="large" icon={<UserOutlined />} />
                }
            </div>
            <div className="criticsComment">
                <div className="crticsName">
                    {reviewData.userFullName}
                </div>
                <div className="criticsRating">
                    <RatingComponent
                        starDimension='22px'
                        starSpacing='3px'
                        rating={reviewData.rating} />
                </div>
                <div className="criticsComment">
                    {reviewData.comment}
                </div>
                <div className="criticsLikes">
                    <Button type="text"
                        className="bookStatusBtn likesIcon"
                        onClick={likeFunction}>
                        <LikeOutlined className="likesIcon likes-font-size" />
                    </Button>
                    <div className="totalLikes"> {reviewData.totalLikes}</div>
                    {
                        reviewData.userID === userId &&
                        <>
                            <Button type="text"
                                className="bookStatusBtn likesIcon"
                                style={{ marginLeft: '10px' }}
                                onClick={() => updateBookStatus(2, !bookData.isRead)}>
                                <EditOutlined /> Edit
                            </Button>
                            <Button type="text"
                                className="bookStatusBtn likesIcon"
                                style={{ marginLeft: '10px' }}
                                onClick={() => updateBookStatus(2, !bookData.isRead)}>
                                <DeleteOutlined /> Delete
                            </Button>
                        </>
                    }
                </div>
            </div>
        </div>
    )

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
                                {bookData.description}
                            </div>
                            <div>
                                <Button type="primary"
                                    className="bookStatusBtn"
                                    onClick={() => updateBookStatus(1, !bookData.isInWishlist)}>
                                     {bookData.isInWishlist ? 'Book Marked' : 'Book Mark'}
                                </Button>
                                <Button type="primary"
                                    className="bookStatusBtn"
                                    style={{ marginLeft: '10px' }}
                                    onClick={() => updateBookStatus(2, !bookData.isRead)}>
                                    {bookData.isRead ? 'Read' : 'Want to Read'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ratingInfoWrapper">
                    <div className="ratingInfoContainer pt-30px">
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
                                <div className="filters">
                                    {
                                        tags.length ?
                                            <span className="filtersTitle">Filters:</span>
                                            : <> </>
                                    }
                                    {
                                        tags.map((eachTags, index) => (
                                            <Tag closable onClose={() => clearFilters(index, eachTags)} key={index}>
                                                {eachTags.text}
                                            </Tag>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="ratingBar">
                            {
                                starsPercentage.length && starsPercentage.map((eachStar, index) => (
                                    <div className="eachRatingBar" key={index}>
                                        <span className="starName">{index + 1} star</span>
                                        <Progress percent={eachStar} onClick={() => ratingsFilter(index + 1)} title="click to filter reviews" />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="ratingInfoContainer pb-30px">
                        <div className="reviewConatiner">
                            {
                                true ? <>
                                    <div className="criticsReview" style={{ width: '100%' }}>
                                        <div className="criticsImg">
                                            {
                                                false ?
                                                    <ImageComponent
                                                        src={bookData.bookCover}
                                                        alt={bookData.title}
                                                        extraClass='circle' />
                                                : <Avatar 
                                                className="user-avatar" size="large" icon={<UserOutlined />} />
                                            }
                                        </div>
                                        <div className="criticsComment" style={{ width: '100%' }}>
                                            <Form name="basic" form={form} onFinish={addReview} initialValues={null}>
                                                <div className="criticsRating">
                                                    <RatingComponent
                                                        isRatingChangeAllowed
                                                        onChangeRatingFunc={onChangeRating}
                                                        starDimension='22px'
                                                        starSpacing='3px'
                                                        rating={averageRating} />
                                                    {
                                                        isShowRatingError ?
                                                            <span className="ratingError" role="alert">
                                                                Please give ratings
                                                            </span> :
                                                            <></>
                                                    }
                                                </div>
                                                <div className="criticsComment" style={{ width: '100%' }}>
                                                    <Form.Item name="comment" rules={[{ required: true, whitespace: true, message: "Please add review" }]}>
                                                        <TextArea
                                                            showCount
                                                            maxLength={500}
                                                            placeholder={`Write your review for ${bookData.title}`}
                                                            autoSize={{ minRows: 5, maxRows: 5 }} />
                                                    </Form.Item>
                                                </div>
                                                {/* <Form.Item style={{ marginTop: '15px' }}>

                                                </Form.Item> */}
                                                <div className="reviewButton">
                                                    <Button type="primary"
                                                        htmlType="submit"
                                                        className="bookStatusBtn">
                                                        Add Review
                                                    </Button>
                                                </div>
                                            </Form>
                                        </div>
                                    </div>
                                </> :
                                    <>

                                    </>
                            }
                            {
                                criticsReviewData.length ? criticsReviewData.map((eachReviews, index) => (
                                    <ReviewsComponent reviewData={eachReviews} likeFunc={likeFunc} key={index} />
                                )) :
                                    <div className="noReviews">
                                        <img src={NoReview} alt="No Reviews" />
                                        <div className="no-review-title">
                                            No reviews
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default BookDetails;
