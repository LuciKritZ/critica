/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './payments.scss';
import { Button, Form, Input, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import useAuthStore from '../../stores/auth.store';
import { appHistory } from '../../utils/history.utils';
import { useAuth } from '../../providers/auth-provider.providers';
import { AppRoute } from '../../utils/router.utils';
import MESSAGES from '../../utils/messages.utils';
import BookLover from '../../assets/bookLover.svg';
import { useUserInfo } from '../../providers/user.providers';

const iframeStyles = {};

const cardElementOpts = {
    iconStyle: 'solid',
    style: iframeStyles,
    hidePostalCode: true,
};
const Payments = () => {
    const [form] = Form.useForm();
    const { userId } = useAuth();
    const { refreshUser } = useUserInfo();
    const [isProcessing, setProcessingTo] = useState(false);
    const [checkoutError, setCheckoutError] = useState();

    const [setPremiumUser] = useAuthStore((state) => [state.setPremiumUser]);
    const stripe = useStripe();
    const elements = useElements();

    const activatePremium = () => {
        notification.success({
            message: MESSAGES.LABELS.SUCCESS,
            description: MESSAGES.AUTHENTICATION.PAYMENT_SUCCESS,
            duration: MESSAGES.DURATION,
        });
        axios
            .put(`${process.env.REACT_API_URL}user`, {
                id: userId,
                data: {
                    isPremium: 1,
                },
            })
            .then(() => {
                setPremiumUser(true);
                refreshUser();
                appHistory.push(AppRoute.HOMEPAGE);
            });
    };
    const buyPremiumMembership = async (value) => {
        setProcessingTo(true);
        const cardElement = elements.getElement('card');
        try {
            const { data: clientSecret } = await axios.post(
                `${process.env.REACT_API_URL}/payment`,
                {
                    amount: 99,
                    currency: 'INR',
                },
            );
            const paymentMethodReq = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: {
                    name: value.Name,
                    email: value.email,
                },
            });
            if (paymentMethodReq.error) {
                setCheckoutError(paymentMethodReq.error.message);
                setProcessingTo(false);
                return;
            }
            const confirmCardPayments = await stripe.confirmCardPayment(
                clientSecret.client_secret,
                {
                    payment_method: paymentMethodReq.paymentMethod.id,
                },
            );

            if (confirmCardPayments.error) {
                setCheckoutError(confirmCardPayments.error.message);
                setProcessingTo(false);
                return;
            }
            activatePremium();
            // onSuccessfulCheckout();
        } catch (err) {
            setCheckoutError(err.message);
        }
    };
    return (
        <>
            <div className="payment-wrapper">
                <div className="container">
                    <div className="payments-container">
                        <div className="payments-page-title">
                            <strong>Crítica</strong> Premium Plan
                        </div>
                        <div className="payments-info-container">
                            <div className="premium-text">
                                <div className="category-title">
                                    <ul>
                                        <li>Monthly Mail recommending list of books</li>
                                        <li>Many more features to come ...</li>
                                    </ul>
                                    <img
                                        src={BookLover}
                                        alt="book lover"
                                        className="book-lover-img"
                                    />
                                </div>
                            </div>
                            <div className="premium-form">
                                <div className="payment-box">
                                    <div className="payments-title">Payment Details</div>
                                    <Form
                                        name="basic"
                                        form={form}
                                        onFinish={buyPremiumMembership}
                                        initialValues={null}
                                    >
                                        <div className="payment-form-input">
                                            <label className="input__label">Name</label>
                                            <div className="input-field">
                                                <Form.Item
                                                    name="Name"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            whitespace: true,
                                                            message: 'Name is missing',
                                                        },
                                                    ]}
                                                >
                                                    <Input autoComplete="off" />
                                                </Form.Item>
                                            </div>
                                        </div>

                                        <div className="payment-form-input">
                                            <label className="input__label">Email</label>
                                            <div className="input-field">
                                                <Form.Item
                                                    name="Email"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            whitespace: true,
                                                            // message: 'Email is missing',
                                                            type: 'email',
                                                        },
                                                    ]}
                                                >
                                                    <Input autoComplete="off" />
                                                </Form.Item>
                                            </div>
                                        </div>

                                        <div className="payment-form-input-card">
                                            <div className="input-field">
                                                <CardElement options={cardElementOpts} />
                                            </div>
                                        </div>
                                        {checkoutError && (
                                            <div className="card-error">{checkoutError}</div>
                                        )}
                                        <Form.Item style={{ marginTop: '15px' }}>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                className="btn try-premium-btn"
                                                ghost
                                                style={{ width: 200 }}
                                            >
                                                {isProcessing ? (
                                                    <>
                                                        {' '}
                                                        <span>
                                                            processing{' '}
                                                        </span> <LoadingOutlined />{' '}
                                                    </>
                                                ) : (
                                                    'Pay 99 INR'
                                                )}
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Payments;
