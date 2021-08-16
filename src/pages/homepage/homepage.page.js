import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'react-multi-carousel/lib/styles.css';
import ImageComponent from '../../components/imageComponent/image.component';
import './homepage.page.scss';
import CarouselComponent from '../../components/carouselComponent/carousel.component';

// TODO:
// p-1 only single skeleton
// P-3 Add flipkart like genre horizontal scroll bar which redirects to search page.
const Homepage = () => {
    const [homeData, setHomeData] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
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
                    <div>Skeleton loading</div>
                </>
            )}
        </>
    );
    return (
        <>
            <div className="wrapper">
                <ShowImageCarousel
                    categoryTitle="Critically Acclaimed"
                    bookInfo={homeData?.critically_accliamed}
                />

                <ShowImageCarousel categoryTitle="Most Reads" bookInfo={homeData?.most_read} />

                <ShowImageCarousel
                    categoryTitle="Newly Added"
                    bookInfo={homeData?.newly_added}
                />
            </div>
        </>
    );
};

export default Homepage;
