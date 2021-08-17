import React from 'react';
import { Drawer, Row } from 'antd';
import PropTypes from 'prop-types';

const CustomDrawer = ({ visible, onClose, placement, width, children, closable }) => {
    return (
        <div>
            <Drawer
                placement={placement || 'right'}
                visible={visible}
                onClose={onClose}
                width={width || '100%'}
                closable={closable}
            >
                <Row>{children}</Row>
            </Drawer>
        </div>
    );
};

CustomDrawer.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    width: PropTypes.number || PropTypes.string,
    placement: PropTypes.string,
    closable: PropTypes.bool,
};

export default CustomDrawer;
