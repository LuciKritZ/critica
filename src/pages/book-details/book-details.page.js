/* eslint-disable no-console */
/* eslint-disable max-len */
import { Button, Progress, Tag, Input, Form, Avatar } from 'antd';
import axios from 'axios';
import { DeleteOutlined, EditOutlined, LikeOutlined, UserOutlined, LikeFilled } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cloneDeep from 'lodash.clonedeep';
import ImageComponent from '../../components/imageComponent/image.component';
import RatingComponent from '../../components/ratingComponent/rating.component';
import './book-details.page.scss';
import NoReview from '../../assets/noReviews.png';
import LikeLoading from '../../assets/likeLoading.svg';
import { useAuth } from '../../providers/auth-provider.providers';
import DeleteModal from '../../components/deleteModal/deleteModal';

const { TextArea } = Input;

let constCriticsReviewData = [];
let reviewId = '';
const BookDetails = () => {
    const { id } = useParams();
    const { authenticated, userId, role, image } = useAuth();
    const [starsPercentage, setStarsPercentage] = useState([]);
    const [criticsReviewData, setCriticsReviewData] = useState([]);
    const [bookData, setBookData] = useState({});
    const [tags, setTags] = useState([]);
    const [form] = Form.useForm();
    const [averageRating, setAverageRating] = useState(0);
    const [isShowRatingError, setIsShowRatingError] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [myReview, setMyReview] = useState(false);
    const [editReviewId, setEditReviewId] = useState(null);

    // for bookread and bookmark apis
    const updateBookStatus = (bookStatus, isStatus) => {
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
            }).then(() => {
                switch (bookStatus) {
                    case 1: {
                        const constBookData = bookData;
                        constBookData.isInWishlist = !constBookData.isInWishlist;
                        setBookData({ ...constBookData });
                        break;
                    }
                    case 2: {
                        const constBookData = bookData;
                        constBookData.isRead = !constBookData.isRead;
                        setBookData({ ...constBookData });
                        break;
                    }
                    default:
                        break;
                }
            })
        }

    }

    // returns percentage for rating bar
    const returnPercentage = (total, current) => {
        if (!current) {
            return 0;
        }
        return ((100 * current) / total);
    };

    // count percentage for rating bar
    const getRatings = (ratingInfo, totalComments) => {
        const starsPercentageConst = [];
        // eslint-disable-next-line no-plusplus
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
                setBookData(response.data.data);
                getRatings(response.data.ratingInfo, response.data.data.totalComments);
            })
            .catch((error) => {
                console.log('Something went wrong', error);
            });
    }

    const fetchReviewsData = () => {
        axios.post(`${process.env.REACT_API_URL}reviewlike`, {
            bookID: id,
            userID: userId
        })
            .then((response) => {
                if (typeof response.data !== 'string') {
                    const reviewsData = response.data.data;
                    const reviewIndex = reviewsData.findIndex((eachReviews) => eachReviews.userID === userId);
                    if (reviewIndex !== -1) {
                        const myReviewData = reviewsData.splice(reviewIndex, 1);
                        reviewsData.unshift(myReviewData[0]);
                    }
                    const myReviewIndex = reviewsData.findIndex((eachReviews) => eachReviews.userID === userId);
                    setMyReview(myReviewIndex !== -1 && true);
                    setCriticsReviewData(reviewsData);
                    setEditReviewId(null);
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
    }, [id, userId]);
    // authenticated, userId
    // commments like api call
    const likeFunc = (reviewData, index) => {
        const constCriticsReview = criticsReviewData;
        constCriticsReview[index].isLoading = true;
        setCriticsReviewData([...constCriticsReview]);
        axios.put(`${process.env.REACT_API_URL}reviewlike`, {
            id: reviewData.id,
            isLiked: !reviewData.userLike,
            userID: userId
        })
            .then(() => {
                if (constCriticsReview[index].userLike) {
                    constCriticsReview[index].totalLikes -= 1;
                } else {
                    constCriticsReview[index].totalLikes += 1;
                }
                constCriticsReview[index].isLoading = false;
                constCriticsReview[index].userLike = !constCriticsReview[index].userLike;
                setCriticsReviewData([...constCriticsReview]);
            })
    }

    // add reviews
    const addReview = (values) => {
        if (!averageRating) {
            setIsShowRatingError(true);
        } else {
            const criticData = values;
            criticData.rating = averageRating;
            axios.post(`${process.env.REACT_API_URL}review`, {
                rating: averageRating,
                comment: criticData.comment,
                bookID: id,
                userID: userId
            }).then(() => {
                fetchBooksData();
                fetchReviewsData();
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    const editReview = (values) => {
        if (!averageRating) {
            setIsShowRatingError(true);
        } else {
            const criticData = values;
            criticData.rating = averageRating;
            console.log(criticData, '/review, add reviews');
            axios.put(`${process.env.REACT_API_URL}review/${editReviewId}`, {
                rating: averageRating,
                comment: criticData.comment,
                bookID: id,
                userID: userId
            }).then(() => {
                fetchBooksData();
                fetchReviewsData();
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    const onChangeRating = (newRating) => {
        setAverageRating(newRating);
        if (newRating) {
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

    const showDeleteModalFunc = (setModalVisibility) => {
        setIsModalVisible(setModalVisibility);
        // setIsModalVisible(true);
    }

    const onDelete = () => {
        // constReason = reason;
        axios.delete(`${process.env.REACT_API_URL}review/${reviewId}`)
            .then(() => {
                fetchReviewsData();
                fetchBooksData();
                setIsModalVisible(false);
            })
    }

    const deleteComment = (reviewData) => {
        reviewId = reviewData.id;
        setIsModalVisible(true);
    }

    const editComment = (reviewData) => {
        setEditReviewId(reviewData.id)
        setMyReview(false);
        const criticsReviewDataConst = criticsReviewData;
        criticsReviewDataConst.splice(0, 1);
        setAverageRating(reviewData.rating);
        setCriticsReviewData([...criticsReviewDataConst]);
        form.setFieldsValue({ comment: reviewData.comment });
    }

    const ReviewsComponent = ({ reviewData, index }) => (
        <div className={`criticsReview ${reviewData.userID === userId ? `my-review` : ``} `}>
            <div className="criticsImg">
                {
                    reviewData.profilePicture !== "" ?
                        <ImageComponent
                            src={reviewData.profilePicture}
                            alt="Profile"
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
                    {
                        reviewData.isLoading ?
                            <div style={{paddingLeft: 15}}>
                                <img src={LikeLoading} alt="loading" style={{width: 30}}/>
                            </div> :
                            <>
                                <Button type="text"
                                    className="bookStatusBtn likesIcon"
                                    onClick={() => likeFunc(reviewData, index)}>
                                    {
                                        reviewData.userLike ?
                                            <LikeFilled className="likesIcon likes-font-size" />
                                            : <LikeOutlined className="likesIcon likes-font-size" />
                                    }
                                </Button>
                                <div className="totalLikes"> {reviewData.totalLikes}</div>
                            </>
                    }
                    {
                        reviewData.userID === userId &&
                        <>
                            <Button type="text"
                                className="bookStatusBtn likesIcon"
                                style={{ marginLeft: '10px' }}
                                onClick={() => editComment(reviewData)}>
                                <EditOutlined /> Edit
                            </Button>
                            <Button type="text"
                                className="bookStatusBtn likesIcon"
                                style={{ marginLeft: '10px' }}
                                onClick={() => deleteComment(reviewData)}>
                                <DeleteOutlined /> Delete
                            </Button>
                        </>
                    }
                </div>
            </div>
        </div>
    )

    return (
        <>
            <DeleteModal
                showDeleteModal={isModalVisible}
                modalVisibleFunc={showDeleteModalFunc}
                onSave={onDelete}
                message='Are you sure you want to delete your review?' />
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
                                    <Button type={bookData.isInWishlist ? "primary" : "text"}
                                        style={{ marginLeft: '0px' }}
                                        className="btn"
                                        onClick={() => updateBookStatus(1, !bookData.isInWishlist)}>
                                        {bookData.isInWishlist ? 'Book Marked' : 'Book Mark'}
                                    </Button>
                                    <Button type={bookData.isRead ? "primary" : "text"}
                                        className="btn"
                                        style={{ marginLeft: '10px' }}
                                        onClick={() => updateBookStatus(2, !bookData.isRead)}>
                                        {bookData.isRead ? 'Book Completed' : 'Incomplete'}
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
                                    authenticated && userId && role > 1 && !myReview ? <>
                                        <div className="criticsReview" style={{ width: '100%' }}>
                                            <div className="criticsImg">
                                                {
                                                    image ?
                                                        <ImageComponent
                                                            src={image}
                                                            alt="Profile"
                                                            extraClass='circle' />
                                                        : <Avatar
                                                            className="user-avatar" size="large" icon={<UserOutlined />} />
                                                }
                                            </div>
                                            <div className="criticsComment" style={{ width: '100%' }}>
                                                <Form name="basic" form={form} onFinish={editReviewId ? editReview : addReview} initialValues={null}>
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
                                                            {editReviewId ? 'Update Review' : 'Add Review'}
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
                                        <ReviewsComponent reviewData={eachReviews} key={eachReviews.id} index={index} />
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
        </>
    )
};

export default BookDetails;
