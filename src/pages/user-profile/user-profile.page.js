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
            setUserDetails(user.userDetails);
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
        if (user && user.userDetails && data.firstName !== "" && data.lastName !== "") {
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
        } else if (data.firstName === "") {
            notification.error({
                message: MESSAGES.LABELS.ERROR,
                description: 'First Name is empty',
                duration: MESSAGES.DURATION,
            })
        } else if (data.lastName === "") {
            notification.error({
                message: MESSAGES.LABELS.ERROR,
                description: 'Last Name is empty.',
                duration: MESSAGES.DURATION,
            })
        }
    };

    function disabledDate(current) {
        const dayEnd = moment().endOf('day');
        return !(dayEnd.isAfter(current));
    }

    const updateUserDetails = async (keyName, value) => {
        if (user && user.userDetails) {
            await updateUser({
                id: user.userDetails.id.toString(),
                data: {
                    [keyName.toString()]: value,
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
                            <CloseOutlined onClick={() => updateEditFieldsState('name', false)} />
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
                                <Space direction="vertical">
                                    <Input
                                        placeholder="First Name"
                                        value={userDetails.firstName}
                                        onChange={(e) =>
                                            updateUserDetailState('firstName', e.target.value)
                                        }
                                        className="w-150"
                                    />
                                    <Input
                                        placeholder="Last Name"
                                        value={userDetails.lastName}
                                        onChange={(e) =>
                                            updateUserDetailState('lastName', e.target.value)
                                        }
                                        className="w-150"
                                    />
                                    <CustomButton
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
                            <div className="input-title">Date of Birth</div>
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
                                {editFields.dateOfBirth ? (
                                    <Space direction="horizontal">
                                        <CheckOutlined
                                            onClick={() => {
                                                updateUserDetails(
                                                    'birthdate',
                                                    userDetails.birthdate,
                                                );
                                                updateEditFieldsState('dateOfBirth', false);
                                            }}
                                        />
                                        <CloseOutlined
                                            onClick={() =>
                                                updateEditFieldsState('dateOfBirth', false)
                                            }
                                        />
                                    </Space>
                                ) : (
                                    <EditOutlined
                                        onClick={() => updateEditFieldsState('dateOfBirth', true)}
                                    />
                                )}
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
                            <div className="input-title">Gender</div>
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
                                {editFields.gender ? (
                                    <Space direction="horizontal">
                                        <CheckOutlined
                                            onClick={() => {
                                                updateUserDetails('gender', userDetails.gender);
                                                updateEditFieldsState('gender', false);
                                            }}
                                        />
                                        <CloseOutlined
                                            onClick={() => updateEditFieldsState('gender', false)}
                                        />
                                    </Space>
                                ) : (
                                    <EditOutlined
                                        onClick={() => updateEditFieldsState('gender', true)}
                                    />
                                )}
                            </div>
                        </Col>
                        <Divider className="user-divider" />
                        <Col xs={24} className="user-field">
                            <div className="input-title">Favorite Quote</div>
                            <div className="input-value">
                                {editFields.favoriteQuote ? (
                                    <Input
                                        className="w-80"
                                        placeholder="Quote"
                                        value={userDetails.quote}
                                        onChange={(e) =>
                                            updateUserDetailState('quote', e.target.value)
                                        }
                                    />
                                ) : (
                                    user.userDetails?.quote
                                )}
                            </div>
                            <div className="input-edit-icon">
                                {editFields.favoriteQuote ? (
                                    <Space direction="horizontal">
                                        <CheckOutlined
                                            onClick={() => {
                                                updateUserDetails('quote', userDetails.quote);
                                                updateEditFieldsState('favoriteQuote', false);
                                            }}
                                        />
                                        <CloseOutlined
                                            onClick={() =>
                                                updateEditFieldsState('favoriteQuote', false)
                                            }
                                        />
                                    </Space>
                                ) : (
                                    <EditOutlined
                                        onClick={() => updateEditFieldsState('favoriteQuote', true)}
                                    />
                                )}
                            </div>
                        </Col>
                        <Divider className="user-divider" />
                        <Col xs={24} className="user-field">
                            <div className="input-title">Total Books Read</div>
                            <div className="input-value">{totalBooksRead}</div>
                        </Col>
                        <Divider className="user-divider" />
                        <Col xs={24} className="user-field">
                            <div className="input-title">Accomplishments</div>
                            <div className="input-value">
                                {editFields.accomplishment ? (
                                    <TextArea
                                        className="w-80"
                                        placeholder="Accomplishments"
                                        value={userDetails.accomplishment}
                                        onChange={(e) =>
                                            updateUserDetailState('accomplishment', e.target.value)
                                        }
                                        autoSize={{ minRows: 3, maxRows: 5 }}
                                    />
                                ) : (
                                    user.userDetails?.accomplishment
                                )}
                            </div>
                            <div className="input-edit-icon">
                                {editFields.accomplishment ? (
                                    <Space direction="horizontal">
                                        <CheckOutlined
                                            onClick={() => {
                                                updateUserDetails(
                                                    'accomplishment',
                                                    userDetails.accomplishment,
                                                );
                                                updateEditFieldsState('accomplishment', false);
                                            }}
                                        />
                                        <CloseOutlined
                                            onClick={() =>
                                                updateEditFieldsState('accomplishment', false)
                                            }
                                        />
                                    </Space>
                                ) : (
                                    <EditOutlined
                                        onClick={() =>
                                            updateEditFieldsState('accomplishment', true)
                                        }
                                    />
                                )}
                            </div>
                        </Col>
                        <Divider className="user-divider" />
                        <Col xs={24} className="user-field">
                            <div className="input-title">About Me</div>
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
                                    />
                                ) : (
                                    user.userDetails?.aboutMe
                                )}
                            </div>
                            <div className="input-edit-icon">
                                {editFields.aboutMe ? (
                                    <Space direction="horizontal">
                                        <CheckOutlined
                                            onClick={() => {
                                                updateUserDetails('aboutMe', userDetails.aboutMe);
                                                updateEditFieldsState('aboutMe', false);
                                            }}
                                        />
                                        <CloseOutlined
                                            onClick={() => updateEditFieldsState('aboutMe', false)}
                                        />
                                    </Space>
                                ) : (
                                    <EditOutlined
                                        onClick={() => updateEditFieldsState('aboutMe', true)}
                                    />
                                )}
                            </div>
                        </Col>
                    </Row>
                </UserCard>
            </Col>
        </Row>
    ) : (
        <LoadingIndicator />
    );
};

export default MyProfile;
