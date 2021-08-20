import React from 'react';
import { Popover, Button, Row } from 'antd';

const defaultContent = (
    <>
        <p>Content</p>
        <p>Content</p>
    </>
);

const CustomPopover = ({ placement, title, content, trigger, children, visible, close }) => (
    <Popover
        placement={placement || 'bottom'}
        title={title}
        content={content || defaultContent}
        trigger={trigger || 'hover'}
        visible={visible}
        onVisibleChange={(isVisible) => !isVisible && close()}
    >
        <Row>{children}</Row>
    </Popover>
);

export default CustomPopover;
