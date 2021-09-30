import React, { useState } from 'react';
import { Row, Col, notification } from 'antd';
import { FrownOutlined } from '@ant-design/icons';
import { GoogleLogin } from 'react-google-login';
import MESSAGES from '../../utils/messages.utils';
import { useAuth } from '../../providers/auth-provider.providers';
import LoadingIndicator from '../loading-indicator/loading-indicator.component';
import './login.component.scss';
import Bibliophiles from '../../assets/bibliophiles.svg';
import CustomButton from '../../custom/button/button.custom';

const formData = {
    profileObj: {
        givenName: "Test",
        familyName: "Test",
        email: "test@test.com",
        // eslint-disable-next-line max-len
        imageUrl: "https://lh3.googleusercontent.com/a/AATXAJw2pIV9gpY2d_Bkso1H98R7MU26E2lHZcZyN9MU=s96-c"
    }
};

const Login = ({ onSignIn }) => {
    const { signIn } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (googleData) => {
        setLoading(true);
        try {
            signIn(googleData);
            onSignIn();
        } finally {
            setLoading(false);
        }
    };

    const handleGuestLogin = () => {
        setLoading(true);
        try {
            signIn(formData);
            onSignIn();
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <LoadingIndicator />;
    }

    return (
        <Row className="login-container">
            <Col className="login-body" md={12} xs={24}>
                <div className="app-title">
                    <span className="app-name">Critica</span> - Place for bibliophiles.
                </div>
                <img src={Bibliophiles} alt="book lover" className="bibliophiles" />
            </Col>
            <Col className="login-body" md={12} xs={24}>
                <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Sign in with Google"
                    className="try-premium-btn btn loginBtn"
                    onSuccess={handleLogin}
                    onFailure={() =>
                        notification.error({
                            message: MESSAGES.LABELS.FAILURE,
                            description: MESSAGES.AUTHENTICATION.FAILURE,
                            icon: <FrownOutlined />,
                            duration: 3,
                        })
                    }
                    cookiePolicy="single_host_origin"
                />
                <CustomButton
                    className="btn-center width-220 "
                    title="Login As Guest"
                    onClick={() => handleGuestLogin()}
                />
            </Col>
        </Row>
    );
};

export default Login;
