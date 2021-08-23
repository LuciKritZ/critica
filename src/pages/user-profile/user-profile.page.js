import { Col, Image, Row, Divider, Space, Input, DatePicker, Select, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { EditOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import Moment from 'react-moment';
import moment from 'moment';
import { AppRoute } from '../../utils/router.utils';
import { useAuth } from '../../providers/auth-provider.providers';
import LoadingIndicator from '../../components/loading-indicator/loading-indicator.component';
import { useUserInfo } from '../../providers/user.providers';
import CustomButton from '../../custom/button/button.custom';
import { getBooks, updateUser } from '../../rest/user.rest';
import UserCard from '../../components/user-card/user-card.component';
import './user-profile.page.scss';
import MESSAGES from '../../utils/messages.utils';

const { Option } = Select;

const { TextArea } = Input;

const MyProfile = () => {
    const [loading, setLoading] = useState(false);
    const { authenticated, image, userId } = useAuth();
    const { user, refreshUser } = useUserInfo();
    const location = useLocation();
    const { pathname } = location;
    const history = useHistory();
    const [totalBooksRead, setTotalBooksRead] = useState(0);
    const [editFields, setEditFields] = useState({
        name: false,
        gender: false,
        dateOfBirth: false,
        favoriteQuote: false,
        accomplishment: false,
        aboutMe: false,
    });
    const [userDetails, setUserDetails] = useState();

    const initPageLoad = async () => {
        setLoading(true);
        if (pathname === AppRoute.PROFILE && !authenticated) {
            history.push(AppRoute.HOMEPAGE);
        }
        const books = await getBooks(userId);
        setTotalBooksRead(books.total);
        setLoading(false);
    };

    useEffect(() => {
        if (user && user.userDetails) {
            setLoading(true);
            setUserDetails(user.userDetails);
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        initPageLoad();
    }, [pathname]);

    const updateUserDetailState = (key, value) => {
        setUserDetails({
            ...userDetails,
            [key]: value,
        });
    };

    const updateEditFieldsState = (key, value) => {
        setEditFields({
            ...editFields,
            [key]: value,
        });
        if (!value) setUserDetails({ ...user.userDetails });
    };

    const updateName = async (data) => {
        if (
            user &&
            user.userDetails &&
            data.firstName.toString().trim() !== '' &&
            data.lastName.toString().trim() !== ''
        ) {
            await updateUser({
                id: user.userDetails.id.toString(),
                data,
            })
                .then(() =>
                    notification.success({
                        message: MESSAGES.LABELS.SUCCESS,
                        description: MESSAGES.USER.SUCCESS,
                        duration: MESSAGES.DURATION,
                    }),
                )
                .catch(() =>
                    notification.error({
                        message: MESSAGES.LABELS.ERROR,
                        description: MESSAGES.USER.FAILURE,
                        duration: MESSAGES.DURATION,
                    }),
                )
                .finally(() => {
                    refreshUser();
                    updateEditFieldsState('name', false);
                });
        } else if (data.firstName.toString().trim() === '') {
            notification.error({
                message: MESSAGES.LABELS.ERROR,
                description: 'First Name is empty',
                duration: MESSAGES.DURATION,
            });
        } else if (data.lastName.toString().trim() === '') {
            notification.error({
                message: MESSAGES.LABELS.ERROR,
                description: 'Last Name is empty.',
                duration: MESSAGES.DURATION,
            });
        }
    };

    const disabledDate = (current) => {
        const dayEnd = moment().endOf('day');
        return !dayEnd.isAfter(current);
    };

    const updateUserDetails = async (keyName, value) => {
        if (user && user.userDetails) {
            await updateUser({
                id: user.userDetails.id.toString(),
                data: {
                    [keyName.toString()]:
                        keyName !== 'accomplishment' ? value.toString().trim() : value,
                },
            })
                .then(() =>
                    notification.success({
                        message: MESSAGES.LABELS.SUCCESS,
                        description: MESSAGES.USER.SUCCESS,
                        duration: MESSAGES.DURATION,
                    }),
                )
                .catch(() =>
                    notification.error({
                        message: MESSAGES.LABELS.ERROR,
                        description: MESSAGES.USER.FAILURE,
                        duration: MESSAGES.DURATION,
                    }),
                )
                .finally(() => refreshUser());
        }
    };

    const renderButtons = (editFieldKey, userDetailsKey, userDetailsValue) =>
        editFields[editFieldKey] ? (
            <Space direction="horizontal">
                <CheckOutlined
                    className="check-icon"
                    onClick={() => {
                        updateUserDetails(userDetailsKey, userDetailsValue);
                        updateEditFieldsState(editFieldKey, false);
                    }}
                />
                <CloseOutlined
                    className="cross-icon"
                    onClick={() => updateEditFieldsState(editFieldKey, false)}
                />
            </Space>
        ) : (
            <EditOutlined onClick={() => updateEditFieldsState(editFieldKey, true)} />
        );

    if (loading && !user && !user.userDetails) {
        return <LoadingIndicator />;
    }

    return user && user.userDetails ? (
        <Row className="profile-page-container">
            <Col xs={24} lg={8} xl={6} xxl={5}>
                <UserCard
                    actions={[
                        !editFields.name ? (
                            <EditOutlined
                                key="edit"
                                onClick={() => updateEditFieldsState('name', true)}
                            />
                        ) : (
                            <CloseOutlined
                                className="cross-icon"
                                onClick={() => updateEditFieldsState('name', false)}
                            />
                        ),
                    ]}
                >
                    <Col xs={24} className="user-image-container h-200">
                        <Image
                            placeholder={<LoadingIndicator />}
                            className="user-image"
                            width={200}
                            src={image}
                            preview={false}
                        />
                    </Col>
                    <Col xs={24} className="user-image-container">
                        <div className="user-name">
                            {!editFields.name ? (
                                `${user.userDetails.firstName} ${user.userDetails.lastName}`
                            ) : (
                                <Space direction="vertical" className="space-container">
                                    <Input
                                        placeholder="First Name"
                                        value={userDetails.firstName}
                                        onChange={(e) =>
                                            updateUserDetailState('firstName', e.target.value)
                                        }
                                        className="w-200"
                                        maxLength={100}
                                    />
                                    <Input
                                        placeholder="Last Name"
                                        value={userDetails.lastName}
                                        onChange={(e) =>
                                            updateUserDetailState('lastName', e.target.value)
                                        }
                                        className="w-200"
                                        maxLength={100}
                                    />
                                    <CustomButton
                                        className="j-center"
                                        title="Update Name"
                                        onClick={() =>
                                            updateName({
                                                firstName: userDetails.firstName,
                                                lastName: userDetails.lastName,
                                            })
                                        }
                                    />
                                </Space>
                            )}
                        </div>
                    </Col>
                    <Col xs={24} className="user-image-container">
                        <div className="user-joining-date">
                            User since{' '}
                            <Moment
                                date={user.userDetails.creationDateAndTime}
                                format="D MMM YYYY"
                                withTitle
                                unix
                            />
                        </div>
                    </Col>
                    {/* eslint-disable-next-line max-len */}
                    {!user.isCritic && user.userDetails && !user.userDetails.makeCriticRequest && (
                        <Col xs={24} className="user-image-container">
                            <CustomButton
                                title="Make me a critic"
                                onClick={() => updateUserDetails('makeCriticRequest', 1)}
                                className="try-premium-btn"
                            />
                        </Col>
                    )}
                </UserCard>
            </Col>
            <Col xs={24} lg={16} xl={18} xxl={19} className="user-details-container">
                <UserCard title="User Details">
                    <Row>
                        <Col xs={24} className="user-field">
                            <div className="input-title">
                                Date of Birth
                                <div className="field-buttons-mobile">
                                    {renderButtons(
                                        'dateOfBirth',
                                        'birthdate',
                                        userDetails?.birthdate,
                                    )}
                                </div>
                            </div>
                            <div className="input-value">
                                {editFields.dateOfBirth ? (
                                    <DatePicker
                                        disabledDate={disabledDate}
                                        value={userDetails.birthDate}
                                        onChange={(date, dateString) => {
                                            updateUserDetailState('birthdate', dateString);
                                        }}
                                    />
                                ) : (
                                    <Moment
                                        date={moment(user.userDetails.birthdate)}
                                        format="D MMM YYYY"
                                        withTitle
                                    />
                                )}
                            </div>
                            <div className="input-edit-icon">
                                {renderButtons('dateOfBirth', 'birthdate', userDetails?.birthdate)}
                            </div>
                        </Col>
                        <Divider className="user-divider" />
                        <Col xs={24} className="user-field">
                            <div className="input-title">Age</div>
                            <div className="input-value">
                                <Moment
                                    diff={moment(user.userDetails.birthdate)}
                                    date={moment.now()}
                                    unit="years"
                                />
                            </div>
                        </Col>
                        <Divider className="user-divider" />
                        <Col xs={24} className="user-field">
                            <div className="input-title">
                                Gender
                                <div className="field-buttons-mobile">
                                    {renderButtons('gender', 'gender', userDetails?.gender)}
                                </div>
                            </div>
                            <div className="input-value">
                                {editFields.gender ? (
                                    <Select
                                        className="w-150"
                                        defaultValue={user.userDetails?.gender}
                                        style={{ width: 120 }}
                                        onChange={(value) => updateUserDetailState('gender', value)}
                                    >
                                        <Option value="Male">Male</Option>
                                        <Option value="Female">Female</Option>
                                    </Select>
                                ) : (
                                    user.userDetails?.gender
                                )}
                            </div>
                            <div className="input-edit-icon">
                                {renderButtons('gender', 'gender', userDetails?.gender)}
                            </div>
                        </Col>
                        <Divider className="user-divider" />
                        <Col xs={24} className="user-field">
                            <div className="input-title">
                                Favorite Quote
                                <div className="field-buttons-mobile">
                                    {renderButtons('favoriteQuote', 'quote', userDetails?.quote)}
                                </div>
                            </div>
                            <div className="input-value">
                                {editFields.favoriteQuote ? (
                                    <Input
                                        className="w-80"
                                        placeholder="Quote"
                                        value={userDetails.quote}
                                        onChange={(e) =>
                                            updateUserDetailState('quote', e.target.value)
                                        }
                                        maxLength={500}
                                    />
                                ) : (
                                    user.userDetails?.quote
                                )}
                            </div>
                            <div className="input-edit-icon">
                                {renderButtons('favoriteQuote', 'quote', userDetails?.quote)}
                            </div>
                        </Col>
                        <Divider className="user-divider" />
                        <Col xs={24} className="user-field">
                            <div className="input-title">Total Books Read</div>
                            <div className="input-value">{totalBooksRead}</div>
                        </Col>
                        <Divider className="user-divider" />
                        <Col xs={24} className="user-field">
                            <div className="input-title">
                                Accomplishments
                                <div className="field-buttons-mobile">
                                    {renderButtons(
                                        'accomplishment',
                                        'accomplishment',
                                        userDetails?.accomplishment,
                                    )}
                                </div>
                            </div>
                            <div className="input-value">
                                {editFields.accomplishment ? (
                                    <>
                                        <TextArea
                                            className="w-80"
                                            placeholder="Accomplishments"
                                            value={userDetails.accomplishment}
                                            onChange={(e) =>
                                                updateUserDetailState(
                                                    'accomplishment',
                                                    e.target.value,
                                                )
                                            }
                                            autoSize={{ minRows: 3, maxRows: 5 }}
                                            maxLength={500}
                                        />
                                    </>
                                ) : (
                                    user.userDetails?.accomplishment
                                )}
                            </div>
                            <div className="input-edit-icon">
                                {renderButtons(
                                    'accomplishment',
                                    'accomplishment',
                                    userDetails?.accomplishment,
                                )}
                            </div>
                        </Col>
                        <Divider className="user-divider" />
                        <Col xs={24} className="user-field">
                            <div className="input-title">
                                About Me
                                <div className="field-buttons-mobile">
                                    {renderButtons('aboutMe', 'aboutMe', userDetails?.aboutMe)}
                                </div>
                            </div>
                            <div className="input-value">
                                {editFields.aboutMe ? (
                                    <TextArea
                                        className="w-80"
                                        placeholder="About Me"
                                        value={userDetails.aboutMe}
                                        onChange={(e) =>
                                            updateUserDetailState('aboutMe', e.target.value)
                                        }
                                        autoSize={{ minRows: 3, maxRows: 5 }}
                                        maxLength={500}
                                    />
                                ) : (
                                    user.userDetails?.aboutMe
                                )}
                            </div>
                            <div className="input-edit-icon">
                                {renderButtons('aboutMe', 'aboutMe', userDetails?.aboutMe)}
                            </div>
                        </Col>
                    </Row>
                </UserCard>
            </Col>
        </Row>
    ) : (
        <LoadingIndicator fullScreen />
    );
};

export default MyProfile;
