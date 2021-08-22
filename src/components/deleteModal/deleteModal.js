import React from 'react';
import { Modal } from 'antd';

const DeleteModal = ({ showDeleteModal, modalVisibleFunc, onSave, message }) => {
    const handleOk = () => {
        onSave();
    };

    const handleCancel = () => {
        modalVisibleFunc(false);
    };
    return (
        <>
            <Modal
                visible={showDeleteModal}
                onOk={handleOk}
                onCancel={handleCancel}>
                {message}
            </Modal>
        </>
    );
}
export default DeleteModal;