import React from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

const InfiniteScrollComponent = ({ render, fetchData, bookLength, LoaderFunc,hasMore }) => (
    <>
        <InfiniteScroll
            dataLength={bookLength} // This is important field to render the next data
            next={fetchData}
            hasMore={hasMore}
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-evenly',
                flexDirection: 'row'
            }}
            loader={<LoaderFunc />}
            endMessage={
                <p style={{
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex'
                }}>
                    <b>Yay! You have seen it all</b>  
                </p>
            } // make end message dynamic
        >
            {render()}
        </InfiniteScroll>
    </>
);

export default InfiniteScrollComponent;