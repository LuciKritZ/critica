/* eslint-disable max-len */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import queryString from 'query-string'
import BookCardComponent from '../../components/bookCardComponent/bookCard.component';
import FiltersComponent from '../../components/filtersComponent/filters.component';
import InfiniteScrollComponent from '../../components/infiniteScrollComponent/infiniteScroll.component';
import './search.component.scss';
import Bookshelves from '../../assets/bookshelves.svg';
import LikeLoading from '../../assets/likeLoading.svg';

let offset = 0;
const Search = ({ location }) => {
    // const { location: { search } } = this.props;
    const { search } = queryString.parse(location.search);
    const [bookInfo, setBookInfo] = useState([]);
    const [genres, setGenres] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [filterConstObj, setFilterObj] = useState({});

    useEffect(() => {
        document.title = 'Search';
        axios
            .get(`${process.env.REACT_API_URL}genres`)
            .then((response) => {
                const genreArray = [];
                response.data.data.forEach((eachGenre) => {
                    const genreIndex = +Object.keys(eachGenre)[0];
                    genreArray.push({
                        label: eachGenre[genreIndex],
                        value: genreIndex,
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
                response.data.data.forEach((eachAuthor) => {
                    const authorIndex = +Object.keys(eachAuthor)[0];
                    authorArray.push({
                        name: eachAuthor[authorIndex],
                        id: authorIndex ,
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
                if (!response.data.total || response.data.total < 8) {
                    setHasMore(false);
                }
            })
            .catch((error) => {
                console.log('Something went wrong', error);
            }).finally(() => {
                setIsLoadingData(false);
            });
    };
    const searchfetchBooks = (filterObj) => {
        axios
            .post(`${process.env.REACT_API_URL}books/filtered?limit=8&offset=${offset}`, { filter: filterObj })
            .then((response) => {
                setBookInfo([...response.data.data]);
                if (!response.data.total || response.data.total < 8) {
                    setHasMore(false);
                }
            })
            .catch((error) => {
                console.log('Something went wrong', error);
            }).finally(() => {
                setIsLoadingData(false);
            });
    };

    useEffect(() => {
        if (search) {
            setBookInfo([]);
            setIsLoadingData(true);
            searchfetchBooks({ title: search });
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
        offset += 8;
        applyFilters(filterConstObj);
    };

    const applyExtraFilters = (filterObj) => {
        setBookInfo([]);
        setIsLoadingData(true);
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
            <img src={LikeLoading} alt="loading" style={{ width: 30 }} />
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
                    {
                        isLoadingData ?
                            <>
                                {
                                    LoaderFunc()
                                }
                            </>
                            :
                            <>
                                {bookInfo && bookInfo.length ? (
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
                            </>
                    }

                </div>
            </div>
        </>
    );
};

export default Search;
