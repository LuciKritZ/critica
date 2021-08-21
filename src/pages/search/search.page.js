/* eslint-disable max-len */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import BookCardComponent from '../../components/bookCardComponent/bookCard.component';
import FiltersComponent from '../../components/filtersComponent/filters.component';
import InfiniteScrollComponent from '../../components/infiniteScrollComponent/infiniteScroll.component';
import './search.component.scss';

const Search = () => {
    const [bookInfo, setBookInfo] = useState([]);
    const [genres, setGenres] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [filterConstObj, setFilterObj] = useState({});
    useEffect(() => {
        document.title = 'Search';
        axios.get(`${process.env.REACT_API_URL}genres`)
            .then((response) => {
                const genreArray = [];
                response.data.data.forEach((eachGenre, index) => {
                    genreArray.push({
                        label: eachGenre[index + 1],
                        value: index + 1
                    });
                });
                setGenres(genreArray);
            })
            .catch((error) => {
                console.log('Something went wrong', error);
            });
        axios.get(`${process.env.REACT_API_URL}authors`)
            .then((response) => {
                const authorArray = [];
                response.data.data.forEach((eachAuthor, index) => {
                    authorArray.push({
                        name: eachAuthor[index + 1],
                        id: index + 1
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
        axios.post(`${process.env.REACT_API_URL}books/filtered`, { filter: filterObj })
            .then((response) => {
                setBookInfo(response.data.data);
                if (!response.data.total) {
                    setHasMore(false);
                }
            })
            .catch((error) => {
                console.log('Something went wrong', error);
            });
    }
    const applyFilters = (filterObj) => {
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
    }
    const fetchMoreData = () => {
        // setBookInfo([...bookInfo, ...bookDataInfo]);
        // applyFilters(filterConstObj);
        setHasMore(false);
    }
    const LoaderFunc = () => (
        <h4 style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex'
        }}>Loading...</h4>
    );
    return (
        <>
            <div className="wrapper">
                <div className="filter-container">
                    <FiltersComponent applyFilters={applyFilters} genreList={genres} authorList={authors} />
                </div>
                <div className="book-container">
                    {
                        bookInfo.length ?
                            <InfiniteScrollComponent
                                hasMore={hasMore}
                                bookLength={bookInfo.length}
                                fetchData={fetchMoreData}
                                LoaderFunc={LoaderFunc}
                                render={() => bookInfo.map((eachBookInfo) => (
                                    <BookCardComponent 
                                    bookInfo={eachBookInfo}
                                    redirect={eachBookInfo.id}
                                    key={eachBookInfo.id} />
                                ))}
                            /> :
                            <div>
                                No books Found
                            </div>
                    }

                </div>
            </div>
        </>
    )
}

export default Search;
