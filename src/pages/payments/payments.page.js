/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { useState } from "react";
import './payments.scss';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import useAuthStore from '../../stores/auth.store';
import { appHistory } from '../../utils/history.utils';
import AppRoute from '../../utils/router.utils';
import { useAuth } from '../../providers/auth-provider.providers';

const iframeStyles = {
    // base: {
    //   color: "#fff",
    //   fontSize: "16px",
    //   iconColor: "#fff",
    //   "::placeholder": {
    //     color: "#87bbfd"
    //   }
    // },
    // invalid: {
    //   iconColor: "#FFC7EE",
    //   color: "#FFC7EE"
    // },
    // complete: {
    //   iconColor: "#cbf4c9"
    // }
};

const cardElementOpts = {
    iconStyle: "solid",
    style: iframeStyles,
    hidePostalCode: true
};
const Payments = () => {
    const [form] = Form.useForm();
    const { authenticated, userId, role } = useAuth();
    const [isProcessing, setProcessingTo] = useState(false);
    const [checkoutError, setCheckoutError] = useState();

    const [setPremiumUser] = useAuthStore((state) => [
        state.setPremiumUser
    ]);
    const stripe = useStripe();
    const elements = useElements();

    const activatePremium = () => {
        axios.put(`${process.env.REACT_API_URL}user`, {
            id: userId,
            data: {
                isPremium: 1
            }
        }).then((response) => {
            setPremiumUser(true);
            appHistory.push(AppRoute.HOMEPAGE);
        })
    }
    const buyPremiumMembership = async value => {
        // ev.preventDefault();

        // const billingDetails = {
        //   name: ev.target.name.value,
        //   email: ev.target.email.value,
        //   address: {
        //     city: ev.target.city.value,
        //     line1: ev.target.address.value,
        //     state: ev.target.state.value,
        //     postal_code: ev.target.zip.value
        //   }
        // };

        // setProcessingTo(true);

        const cardElement = elements.getElement("card");

        try {
            const { data: clientSecret } =
                await axios.post(`${process.env.REACT_API_URL}/payment`, {
                    amount: 99,
                    currency: 'INR'
                });

            console.log(clientSecret, value, 'clientSecret');

            const paymentMethodReq = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement,
                billing_details: {
                    name: value.Name,
                    email: value.email
                }
            });
            if (paymentMethodReq.error) {
                setCheckoutError(paymentMethodReq.error.message);
                setProcessingTo(false);
                return;
            }

            const confirmCardPayments = await stripe.confirmCardPayment(
                clientSecret.client_secret, {
                payment_method: paymentMethodReq.paymentMethod.id
            });

            console.log(confirmCardPayments, confirmCardPayments.error, 'error')
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
    return <>

        <div className="wrapper">
            <div className="container">
                <div className="payments-container">
                    <div className="payments-page-title">
                        <strong>Crítica</strong> Premium Plan
                    </div>
                    <div className="payments-info-container">
                        <div className="premium-text">
                            <div className="category-title">Premium Memership</div>
                        </div>
                        <div className="premium-form">
                            <div className="payment-box">
                                <div className="payments-title">Payment Details</div>
                                <Form
                                    name="basic"
                                    form={form}
                                    onFinish={buyPremiumMembership}
                                    initialValues={null}>

                                    <div className="payment-form-input">
                                        <label className="input__label">Name</label>
                                        <div className="input-field">
                                            <Form.Item
                                                name="Name"
                                                rules={[{
                                                    required: true,
                                                    whitespace: true,
                                                    message: 'Name is missing'
                                                }]}>
                                                <Input autoComplete="off" />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div className="payment-form-input">
                                        <label className="input__label">Email</label>
                                        <div className="input-field">
                                            <Form.Item
                                                name="Email"
                                                rules={[{
                                                    required: true,
                                                    whitespace: true,
                                                    message: 'Email is missing'
                                                }]}>
                                                <Input autoComplete="off" />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div className="payment-form-input-card">
                                        <div className="input-field">

                                            <CardElement options={cardElementOpts} />
                                        </div>
                                    </div>
                                    {checkoutError &&
                                    <div className="card-error">{checkoutError}</div>}
                                    <Form.Item style={{ marginTop: '15px' }}>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            className="btn try-premium-btn"
                                            ghost style={{ width: 200 }}>
                                            Pay 99 INR
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
};

export default Payments;
