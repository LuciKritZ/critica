import { Button, Table, Space } from 'antd';
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
        name: 'Test Test',
        profileUrl: 'https://google.com',
        date: ' 16th jan 2020'
    },
    {
        key: 2,
        name: 'Test2 Test',
        profileUrl: 'https://google.com',
        date: ' 16th jan 2020'
    },
    {
        key: 3,
        name: 'Test3 Test',
        profileUrl: 'https://google.com/https://google.com/https://google.com/https://google.comhttps://google.com',
        date: ' 16th jan 2020'
    }
]
const AdminDashboard = () => {
    const sendRequest = (isAllowed, key) => {
        console.log(isAllowed, key, 'sss');
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '150px',
        },
        {
            title: 'Profile Url',
            dataIndex: 'profileUrl',
            key: 'profileUrl',
            width: '350px',
            ellipsis: true,
            render: text => <a href={text}>{text}</a>,
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
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
                        onClick={() => sendRequest(true, eachAdminData.key)}>
                        Accept</Button>
                    <Button type="primary" danger
                        onClick={() => sendRequest(false, eachAdminData.key)}>
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
                                        <a href={eachAdminData.profileUrl}>
                                            {eachAdminData.profileUrl}
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
