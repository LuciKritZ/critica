/* eslint-disable max-len */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import queryString from 'query-string'
import BookCardComponent from '../../components/bookCardComponent/bookCard.component';
import FiltersComponent from '../../components/filtersComponent/filters.component';
import InfiniteScrollComponent from '../../components/infiniteScrollComponent/infiniteScroll.component';
import './search.component.scss';
import Bookshelves from '../../assets/bookshelves.svg';

let offset = 0;
const Search = ({ location }) => {
    // const { location: { search } } = this.props;
    const { search } = queryString.parse(location.search);
    const [bookInfo, setBookInfo] = useState([]);
    const [genres, setGenres] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const [filterConstObj, setFilterObj] = useState({});

    useEffect(() => {
        document.title = 'Search';
        axios
            .get(`${process.env.REACT_API_URL}genres`)
            .then((response) => {
                const genreArray = [];
                response.data.data.forEach((eachGenre, index) => {
                    genreArray.push({
                        label: eachGenre[index + 1],
                        value: index + 1,
                    });
                });
                setGenres(genreArray);
            })
            .catch((error) => {
                console.log('Something went wrong', error);
            });
        axios
            .get(`${process.env.REACT_API_URL}authors`)
            .then((response) => {
                const authorArray = [];
                response.data.data.forEach((eachAuthor, index) => {
                    authorArray.push({
                        name: eachAuthor[index + 1],
                        id: index + 1,
                    });
                    // return
                });
                setAuthors(authorArray);
            })
            .catch((error) => {
                console.log('Something went wrong', error);
            });
    }, []);

    const fetchBooks = (filterObj) => {
        axios
            .post(`${process.env.REACT_API_URL}books/filtered?limit=8&offset=${offset}`, { filter: filterObj })
            .then((response) => {
                setBookInfo([...bookInfo, ...response.data.data]);
                if (!response.data.total) {
                    setHasMore(false);
                }
            })
            .catch((error) => {
                console.log('Something went wrong', error);
            });
    };

    useEffect(() => {
        if (search) {
            fetchBooks({ title: search });
        }
    }, [search]);

    const applyFilters = (filterObj) => {
        setHasMore(true);
        const filterBookObj = {};
        if (filterObj.author) {
            // eslint-disable-next-line no-param-reassign
            filterBookObj.author = filterObj.author;
        }
        if (filterObj.averageRating) {
            filterBookObj.averageRating = filterObj.averageRating;
        }
        if (filterObj.genre.length) {
            filterBookObj.genre = [...filterObj.genre];
        }
        setFilterObj(filterObj);
        fetchBooks(filterBookObj);
    };
    const fetchMoreData = () => {
        // setBookInfo([...bookInfo, ...bookDataInfo]);
        offset += 1;
        applyFilters(filterConstObj);
    };

    const applyExtraFilters = (filterObj) => {
        setBookInfo([]);
        applyFilters(filterObj);
    }
    
    const LoaderFunc = () => (
        <h4
            style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
            }}
        >
            Loading...
        </h4>
    );
    return (
        <>
            <div className="search-wrapper">
                <div className="filter-container">
                    <FiltersComponent
                        applyFilters={applyExtraFilters}
                        genreList={genres}
                        authorList={authors}
                    />
                </div>
                <div className="book-container">
                    {bookInfo.length ? (
                        <InfiniteScrollComponent
                            hasMore={hasMore}
                            bookLength={bookInfo.length}
                            fetchData={fetchMoreData}
                            LoaderFunc={LoaderFunc}
                            render={() =>
                                bookInfo.map((eachBookInfo) => (
                                    <BookCardComponent
                                        bookInfo={eachBookInfo}
                                        redirect={eachBookInfo.id}
                                        key={eachBookInfo.id}
                                    />
                                ))
                            }
                        />

                    ) : (
                        <div className="no-books-container">
                            <img
                                src={Bookshelves}
                                alt="no books"
                                className="no-books-img" />
                            <span className="no-books-title">
                                No Books Found
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Search;
