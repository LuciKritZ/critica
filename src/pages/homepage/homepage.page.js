import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'react-multi-carousel/lib/styles.css';
import ContentLoader from 'react-content-loader';
import ImageComponent from '../../components/imageComponent/image.component';
import './homepage.page.scss';
import CarouselComponent from '../../components/carouselComponent/carousel.component';

// TODO:
// p-1 only single skeleton
// P-3 Add flipkart like genre horizontal scroll bar which redirects to search page.
const Homepage = () => {
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

    const [homeData, setHomeData] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        console.log(process.env.REACT_API_URL, 'ddd');
        document.title = 'Critica';
        axios
            .get(`${process.env.REACT_API_URL}home`)
            .then((response) => {
                setHomeData(response.data);
                setIsLoaded(true);
            })
            .catch((error) => {
                console.log('Something went wrong', error);
            });
    }, []);

    // to show image carousel
    const ShowImageCarousel = ({ bookInfo, categoryTitle }) => (
        <>
            {isLoaded && bookInfo?.length ? (
                <>
                    <div className="category-title">{categoryTitle}</div>
                    <CarouselComponent
                        render={() =>
                            bookInfo.map((eachBookInfo) => (
                                <ImageComponent
                                    src={eachBookInfo.bookCover}
                                    alt={eachBookInfo.title}
                                    key={eachBookInfo.id}
                                    redirect={eachBookInfo.id}
                                />
                            ))
                        }
                    />
                </>
            ) : (
                <>
                    <ContentLoader
                        speed={speed}
                        width={columns * coverWidthWithPadding}
                        height={rows * coverHeightWithPadding}
                    >
                        <rect x="0" y="0" rx="0" ry="0" width={200} height="20" />

                        {covers.map((g, i) => {
                            const vy = Math.floor(i / columns) * coverHeightWithPadding + initial;
                            const vx =
                                (i * coverWidthWithPadding) % (columns * coverWidthWithPadding);
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
                </>
            )}
        </>
    );
    return (
        <>
            <div className="home-page-wrapper">
                <ShowImageCarousel
                    categoryTitle="Critically Acclaimed"
                    bookInfo={homeData?.critically_accliamed}
                />

                <ShowImageCarousel categoryTitle="Most Reads" bookInfo={homeData?.most_read} />

                <ShowImageCarousel categoryTitle="Newly Added" bookInfo={homeData?.newly_added} />
            </div>
        </>
    );
};

export default Homepage;
