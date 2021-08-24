import React, { useState } from 'react';
import { Collapse, Radio, Checkbox, Button } from 'antd';
import RatingComponent from '../ratingComponent/rating.component';
import './filters.component.scss';

const { Panel } = Collapse;

// TODO:
// p-2 search, show more
// p-3 reusability
const FiltersComponent = ({ applyFilters, authorList, genreList }) => {
    const [filterObj, setFilterObj] = useState({
        averageRating: null,
        author: null,
        genre: [],
    });
    const onChangeRating = (e) => {
        const filter = filterObj;
        filter.averageRating = +e.target.value;
        setFilterObj({ ...filter });
    };
    const onChangeAuthor = (e) => {
        const filter = filterObj;
        filter.author = +e.target.value;
        setFilterObj({ ...filter });
    };
    const onChangeGenre = (e) => {
        const filter = filterObj;
        filter.genre = e;
        setFilterObj({ ...filter });
    };
    const ShowRadioRatingContent = ({ rating }) => (
        <Radio value={rating}>
            <RatingComponent starDimension="19px" starSpacing="1px" rating={rating} />
            <span className="rating-text">& up</span>
        </Radio>
    );
    const ShowRadioAuthorContent = ({ author }) => (
        <Radio value={author.id}>
            <span className="rating-text">{author.name}</span>
        </Radio>
    );
    const sendFilters = () => {
        applyFilters(filterObj);
    };
    return (
        <>
            <section className="filter-section">
                <h3>Filters</h3>
            </section>
            <Collapse defaultActiveKey={['1']} bordered={false} expandIconPosition="right">
                <Panel header="Critics Rating" key="1">
                    <Radio.Group onChange={onChangeRating} value={filterObj.averageRating}>
                        <ShowRadioRatingContent rating={4} />
                        <ShowRadioRatingContent rating={3} />
                        <ShowRadioRatingContent rating={2} />
                        <ShowRadioRatingContent rating={1} />
                    </Radio.Group>
                </Panel>
                <Panel header="Genre" key="2">
                    <Checkbox.Group
                        options={genreList}
                        defaultValue={filterObj.genre}
                        onChange={onChangeGenre}
                    />
                </Panel>
                <Panel header="Author" key="3">
                    <Radio.Group onChange={onChangeAuthor} value={filterObj.author}>
                        {authorList.map((eachAuthorData) => (
                            <ShowRadioAuthorContent
                                author={eachAuthorData}
                                key={eachAuthorData.id}
                            />
                        ))}
                    </Radio.Group>
                </Panel>
            </Collapse>
            <section className="filter-section">
                <Button type="primary" style={{ width: '100%' }} onClick={sendFilters}>
                    Apply Filters
                </Button>
            </section>
        </>
    );
};

export default FiltersComponent;
