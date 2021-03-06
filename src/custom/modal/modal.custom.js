import React from 'react';
import { Modal } from 'antd';

const CustomModal = ({ children, title, centered, visible,
     onOk, onCancel, width, footer, height }) => (
    <Modal
        title={title}
        centered={centered}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        width={width}
        height={height}
        footer={footer}
    >
        {children}
    </Modal>
);

export default CustomModal;
