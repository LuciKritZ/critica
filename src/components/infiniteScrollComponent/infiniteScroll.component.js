import React from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

// TO DO:
// check how to show circle profile picture
// default image when error
// check loading state
// isLazyLoading = false
const InfiniteScrollComponent = ({ render, fetchData, bookLength, LoaderFunc }) => (
    <>
        <InfiniteScroll
            dataLength={bookLength} // This is important field to render the next data
            next={fetchData}
            hasMore
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-evenly',
                flexDirection: 'row'
            }}
            loader={<LoaderFunc />}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            {render()}
        </InfiniteScroll>
    </>
);

export default InfiniteScrollComponent;