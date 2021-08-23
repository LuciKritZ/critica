import React from 'react';
import { Input } from 'antd';
import './input.custom.scss';

const CustomInput = (props) => {
    const { Search } = Input;
    if (props.search) {
        return (
            <Search
                className="search-input"
                placeholder={props.label}
                onSearch={props.onSearch}
                enterButton
            />
        );
    }
    return (
        <Input
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            addonBefore={props.addonBefore}
            addonAfter={props.addonAfter}
            defaultValue={props.defaultValue}
            value={props.value}
        />
    );
};

export default CustomInput;
