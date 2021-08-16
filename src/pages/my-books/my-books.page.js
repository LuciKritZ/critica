/* eslint-disable max-len */
import React from 'react';
import BookCardComponent from '../../components/bookCardComponent/bookCard.component';
import './my-books.page.scss';

const bookDataInfo = [
    {
        url: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1441601125l/762464.jpg',
        title: 'Beating the Street Beating the Street',
        author: 'Peter Lynch',
        avgRating: 2.403,
        totalRating: '3,313',
    },
    {
        url: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1386925471l/242472.jpg',
        title: 'The Black Swan',
        author: 'Nassim Nicholas Taleb',
        avgRating: 4.403,
        totalRating: '23,313',
    },
    {
        url: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1444850522l/762462.jpg',
        title: 'One Up On Wall Street: How to Use What You Already Know to Make Money in the Market',
        author: 'Peter Lynch',
        avgRating: 4.6,
        totalRating: '38,783',
    },
    {
        url: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1409602421l/106835.jpg',
        title: 'The Intelligent Investor',
        author: 'Benjamin Graham',
        avgRating: 4.8,
        totalRating: '97,813',
    },
    {
        url: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1564666396l/46223297.jpg',
        title: 'Permanent Record',
        author: 'Edward Snowden',
        avgRating: 4.8,
        totalRating: '97,813',
    },
    {
        url: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1609355352l/52275335._SY475_.jpg',
        title: 'How to Avoid a Climate Disaster: The Solutions We Have and the Breakthroughs We Need',
        author: 'Peter Lynch',
        avgRating: 4.3,
        totalRating: '54,783',
    },
    {
        url: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1386925471l/242472.jpg',
        title: "The Warren Buffett Way: Investment Strategies of the World's Greatest Investor",
        author: 'Peter Lynch',
        avgRating: 4.2,
        totalRating: '14,889',
    },
    {
        url: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1503088065l/36065279._SX318_.jpg',
        title: 'I Do What I Do',
        author: 'Raghuram G. Rajan',
        avgRating: 4.1,
        totalRating: '10,313',
    },
];
const MyBooks = () => {
    const removeBookRead = (bookid) => {
        console.log(bookid, 'bookid');
    }
    return (
        <div className="wrapper">
            <div className="container">
                <div className="category-title">Books Read</div>
                <div className="book-container">
                    {bookDataInfo.map((eachBookInfo, index) => (
                        <BookCardComponent
                            bookInfo={eachBookInfo}
                            key={index}
                            isShowButton
                            buttonFunc={removeBookRead}
                            buttonString="Remove from Read" />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyBooks;
