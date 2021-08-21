import React from 'react';
import { Button } from 'antd';
import clsx from 'clsx';
import './button.custom.scss';

const CustomButton = ({ icon, onClick, className, title }) => (
    <Button icon={icon} onClick={onClick} className={clsx('btn', className)}>
        {title}
    </Button>
);

export default CustomButton;
