import { Button, Table, Space } from 'antd';
import axios from 'axios';
import React from 'react';
import './adminDashboard.page.scss';

const tableConfig = {
    bordered: false,
    loading: false,
    pagination: {
        position: 'bottomCenter',
        current: 1,
        pageSize: 10
    },
    showHeader: true,
    tableLayout: undefined,
};

const adminData = [
    {
        key: 1,
        firstName: 'Test Test',
        accomplishment: 'https://google.com',
        userID: '9EnwzBxOqhZL045UtnTb',
        creationDateAndTime: ' 16th jan 2020'
    },
    {
        key: 2,
        firstName: 'Test2 Test',
        userID: '1111',
        accomplishment: 'https://google.com',
        creationDateAndTime: ' 16th jan 2020'
    },
    {
        key: 3,
        firstName: 'Test3 Test',
        userID: '222',
        accomplishment: 'https://google.com/https://google.com/https://google.com/https://google.comhttps://google.com',
        creationDateAndTime: ' 16th jan 2020'
    }
]
const AdminDashboard = () => {
    const sendRequest = (isAllowed, key) => {
        console.log(isAllowed, key, 'sss');
        axios.post(`${process.env.REACT_API_URL}adminresponse`, {
            respond: isAllowed,
            userID: key
        }).then((response) => {
            console.log(response, 'rr');
        })
    }
    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            width: '150px',
        },
        {
            title: 'Profile Url',
            dataIndex: 'accomplishment',
            key: 'accomplishment',
            width: '350px',
            ellipsis: true,
            render: text => <a href={text}>{text}</a>,
        },
        {
            title: 'Date',
            dataIndex: 'creationDateAndTime',
            key: 'creationDateAndTime',
            width: '150px',
        },
        {
            title: 'Action',
            key: 'action',
            width: '250px',
            render: (eachAdminData) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        onClick={() => sendRequest(true, eachAdminData.userID)}>
                        Accept</Button>
                    <Button type="primary" danger
                        onClick={() => sendRequest(false, eachAdminData.userID)}>
                        Reject</Button>
                </Space>
            ),
        },
    ];
    return (
        <>
            <div className="wrapper">
                {/* <table className="styled-table">
                    <thead>
                        <tr>
                            <th style={{ maxWidth: '150px' }}>Id</th>
                            <th style={{ maxWidth: '150px' }}>Name</th>
                            <th style={{ maxWidth: '350px' }}>Profile Link</th>
                            <th style={{ maxWidth: '150px' }}>Date</th>
                            <th style={{ maxWidth: '250px' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            adminData.map((eachAdminData) => (
                                <tr key={eachAdminData.key}>
                                    <td style={{ maxWidth: '150px' }}>{eachAdminData.key}</td>
                                    <td style={{ maxWidth: '150px' }}>{eachAdminData.name}</td>
                                    <td style={{ maxWidth: '350px' }}>
                                        <a href={eachAdminData.accomplishment}>
                                            {eachAdminData.accomplishment}
                                        </a>
                                    </td>
                                    <td style={{ maxWidth: '150px' }}>{eachAdminData.date}</td>
                                    <td style={{
                                        maxWidth: '250px',
                                        display: 'flex',
                                        justifyContent: 'start'
                                    }}>
                                        <Button type="primary"
                                            onClick={() => sendRequest(true, eachAdminData.key)}>
                                            Accept</Button>
                                        <Button type="primary" danger
                                            onClick={() => sendRequest(false, eachAdminData.key)}>
                                            Reject</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            */}
                <Table
                    {...tableConfig}
                    pagination={{ position: ['bottomCenter'], pageSize: 10 }}
                    columns={columns}
                    dataSource={adminData} />
            </div>
        </>
    )
}



export default AdminDashboard;
