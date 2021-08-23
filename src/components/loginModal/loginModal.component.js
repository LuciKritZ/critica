import React from 'react';
import Login from '../login/login.component';
import CustomModal from '../../custom/modal/modal.custom';

const LoginModalComponent = ({ signInModalStatus, setSignInModalStatus }) => (
    <>
            <CustomModal
                centered
                visible={signInModalStatus}
                footer={null}
                width={650}
                height={500}
                onCancel={() => setSignInModalStatus(false)}
            >
                <Login onSignIn={() => setSignInModalStatus(false)} />
            </CustomModal>
    </>
);

export default LoginModalComponent;
