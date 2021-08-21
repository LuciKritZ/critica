/* eslint-disable max-len */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BookCardComponent from '../../components/bookCardComponent/bookCard.component';
import { useAuth } from '../../providers/auth-provider.providers';
import './bookmarks.page.scss';

const Bookmarks = () => {
    const [bookDataInfo, setBookDataInfo] = useState({});
    const { authenticated, userId } = useAuth();
    const fetchBookData = () => {
        axios.get(`${process.env.REACT_API_URL}userbook/getbooks`,{
            params: {
                id: userId
            }
        })
        .then((response) => {
            console.log(response.data);
            if(typeof response.data != 'string') {
                setBookDataInfo(response.data.data);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    const removeBookmark = (bookData, index) => {
        if (authenticated && userId) {
            axios.put(`${process.env.REACT_API_URL}userbook/userbookdetails`, {
                bookID: bookData.id,
                isInWishlist: false,
                userID: userId
            }).then((response) => {
                const constBookData = bookDataInfo;
                constBookData.splice(index, 1);
                setBookDataInfo([...constBookData]);
            })
        }

    }

    useEffect(() => {
        document.title = 'Book Mark Page';
        fetchBookData();
    },[]);

    return (
        <div className="wrapper">
            <div className="container">
                <div className="category-title">My Bookmarks</div>
                <div className="book-container">
                    {bookDataInfo.length && bookDataInfo.map((eachBookInfo, index) => (
                        <BookCardComponent
                            bookInfo={eachBookInfo}
                            key={eachBookInfo.id}
                            isShowButton
                            redirect={eachBookInfo.id}
                            buttonFunc={() => removeBookmark(eachBookInfo, index)}
                            buttonString="Remove from Bookmark" />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Bookmarks;
