/* eslint-disable max-len */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';
import BookCardComponent from '../../components/bookCardComponent/bookCard.component';
import { useAuth } from '../../providers/auth-provider.providers';
import './bookmarks.page.scss';
import Bookshelves from '../../assets/bookshelves.svg';

const Bookmarks = () => {
    // skeleton Hardcoded values
    const rows = 1;
    const columns = 6;
    const coverHeight = 300;
    const coverWidth = 195;
    const padding = 15;
    const speed = 1;

    const coverHeightWithPadding = coverHeight + padding;
    const coverWidthWithPadding = coverWidth + padding;
    const initial = 35;
    const covers = Array(columns * rows).fill(1);

    const [bookDataInfo, setBookDataInfo] = useState({});
    const { authenticated, userId } = useAuth();
    const [isLoading, setisLoading] = useState(false);
    const [isRemoving, setisRemoving] = useState(false);
    const fetchBookData = () => {
        setisLoading(true);
        axios
            .get(`${process.env.REACT_API_URL}userbook/getbooks`, {
                params: {
                    id: userId,
                },
            })
            .then((response) => {
                if (typeof response.data !== 'string') {
                    const constBooksData = [];
                    response.data.books.forEach((eachBooksData) => {
                        if (eachBooksData.isInWishlist) {
                            constBooksData.push(eachBooksData);
                        }
                    });
                    setBookDataInfo(constBooksData);
                }
                setisLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const removeBookmark = (e, bookData, index) => {
        if (authenticated && userId) {
            setisRemoving(true);
            axios
                .put(`${process.env.REACT_API_URL}userbook/userbookdetails`, {
                    bookID: bookData.id,
                    isInWishlist: false,
                    userID: userId,
                })
                .then(() => {
                    const constBookData = bookDataInfo;
                    constBookData.splice(index, 1);
                    setBookDataInfo([...constBookData]);
                    setisRemoving(false);
                });
        }
    };

    useEffect(() => {
        document.title = 'Book Mark Page';
        fetchBookData();
    }, []);

    return (
        <div className="wrapper">
            <div className="container">
                <div className="category-title">My Bookmarks</div>
                {isLoading ? (
                    <ContentLoader
                        speed={speed}
                        width={columns * coverWidthWithPadding}
                        height={rows * coverHeightWithPadding}
                    >
                        {covers.map((g, i) => {
                            const vy =
                                Math.floor(i / columns) * coverHeightWithPadding + initial;
                            const vx =
                                ((i * coverWidthWithPadding) %
                                    (columns * coverWidthWithPadding)) +
                                initial;
                            return (
                                <rect
                                    key={i.toString()}
                                    x={vx}
                                    y={vy}
                                    rx="0"
                                    ry="0"
                                    width={coverWidth}
                                    height={coverHeight}
                                />
                            );
                        })}
                    </ContentLoader>
                ) : (
                    <>
                        {bookDataInfo.length ?
                            <> <div className="book-container">{bookDataInfo.map((eachBookInfo, index) => (
                                <BookCardComponent
                                    bookInfo={eachBookInfo}
                                    key={eachBookInfo.id}
                                    isShowButton
                                    redirect={eachBookInfo.id}
                                    isRemoving={isRemoving}
                                    buttonFunc={(e) => {
                                        removeBookmark(e, eachBookInfo, index);
                                    }}
                                    buttonString="Delete"
                                />
                            ))}</div></>
                            :
                            <>
                                <div className="no-books-container">
                                    <img src={Bookshelves} alt="no books" className="no-books-img" />
                                    <span className="no-books-title">
                                        No Book Mark Found
                                    </span>
                                </div>
                            </>
                        }
                    </>
                )}
            </div>
        </div>
    );
};

export default Bookmarks;
