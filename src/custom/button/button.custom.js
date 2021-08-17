import React from 'react';
import { Button } from 'antd';
import clsx from 'clsx';
import './button.custom.styles.scss';

const CustomButton = (props) => (
    <Button icon={props.icon} onClick={props.onClick} className={clsx('btn', props.className)}>
        {props.title}
    </Button>
);

export default CustomButton;
