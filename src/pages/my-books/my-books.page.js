import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BookCardComponent from '../../components/bookCardComponent/bookCard.component';
import { useAuth } from '../../providers/auth-provider.providers';
import './my-books.page.scss';

const MyBooks = () => {
    const [bookDataInfo, setBookDataInfo] = useState({});
    const { authenticated, userId } = useAuth();
    const fetchBookData = () => {
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
                        if (eachBooksData.isRead) {
                            constBooksData.push(eachBooksData);
                        }
                    });
                    setBookDataInfo(constBooksData);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const removeBookmark = (e, bookData, index) => {
        // e.stopPropagation();
        // console.log(e, 'ee')
        if (authenticated && userId) {
            axios
                .put(`${process.env.REACT_API_URL}userbook/userbookdetails`, {
                    bookID: bookData.id,
                    isRead: false,
                    userID: userId,
                })
                .then(() => {
                    const constBookData = bookDataInfo;
                    constBookData.splice(index, 1);
                    setBookDataInfo([...constBookData]);
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
                <div className="category-title">Completed Books</div>
                <div className="book-container">
                    {bookDataInfo.length &&
                        bookDataInfo.map((eachBookInfo, index) => (
                            <BookCardComponent
                                bookInfo={eachBookInfo}
                                key={eachBookInfo.id}
                                isShowButton
                                // redirect={eachBookInfo.id}
                                buttonFunc={(e) => {
                                    removeBookmark(e, eachBookInfo, index);
                                }}
                                buttonString="Remove from completed list"
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default MyBooks;
