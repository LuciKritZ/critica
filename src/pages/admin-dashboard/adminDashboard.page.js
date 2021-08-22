import { Button, Table, Space } from 'antd';
import axios from 'axios';
import  ContentLoader from 'react-content-loader'
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { useAuth } from '../../providers/auth-provider.providers';
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

const AdminDashboard = () => {
    const { authenticated, userId, role } = useAuth();
    const [adminData, setAdminData] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    

    const sendRequest = (isAllowed, key) => {
        axios.post(`${process.env.REACT_API_URL}adminresponse`, {
            respond: isAllowed,
            userID: key
        }).then((response) => {
            const constAdminData = adminData;
            const dataIndex = constAdminData.findIndex((eachAdminData) => eachAdminData.id === key);
            if(dataIndex !== -1) {
                constAdminData.splice(dataIndex, 1);
            }
            setAdminData([...constAdminData]);
        })
    }

    useEffect(() => {
        if(authenticated && userId && role === 3) {
            setisLoading(true);
            axios.get(`${process.env.REACT_API_URL}criticsrequests?limit=100&offset=0`)
            .then((response) => {
                setisLoading(false);
                if(typeof response.data !== 'string') {
                    setAdminData(response.data.data)
                }
            })
        } else {
            // open login
        }
        
    }, [userId])
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
            render: date => <Moment format="DD/MM/YYYY" unix>{date}</Moment>,
        },
        {
            title: 'Action',
            key: 'action',
            width: '250px',
            render: (eachAdminData) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        onClick={() => sendRequest(true, eachAdminData.id)}>
                        Accept</Button>
                    <Button type="primary" danger
                        onClick={() => sendRequest(false, eachAdminData.id)}>
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
            {
                !isLoading ?
                <Table
                    {...tableConfig}
                    rowKey="id"
                    pagination={{ position: ['bottomCenter'], pageSize: 10 }}
                    columns={columns}
                    dataSource={adminData} />
                    : 
                    <ContentLoader
                    width='100%'
                    height={550}
                    viewBox="0 0 1000 550"
                    backgroundColor="#eaeced"
                    foregroundColor="#ffffff"
                  >
                    <rect x="51" y="45" rx="3" ry="3" width="906" height="17" />
                    <circle cx="879" cy="123" r="11" />
                    <circle cx="914" cy="123" r="11" />
                    <rect x="104" y="115" rx="3" ry="3" width="141" height="15" />
                    <rect x="305" y="114" rx="3" ry="3" width="299" height="15" />
                    <rect x="661" y="114" rx="3" ry="3" width="141" height="15" />
                    <rect x="55" y="155" rx="3" ry="3" width="897" height="2" />
                    <circle cx="880" cy="184" r="11" />
                    <circle cx="915" cy="184" r="11" />
                    <rect x="105" y="176" rx="3" ry="3" width="141" height="15" />
                    <rect x="306" y="175" rx="3" ry="3" width="299" height="15" />
                    <rect x="662" y="175" rx="3" ry="3" width="141" height="15" />
                    <rect x="56" y="216" rx="3" ry="3" width="897" height="2" />
                    <circle cx="881" cy="242" r="11" />
                    <circle cx="916" cy="242" r="11" />
                    <rect x="106" y="234" rx="3" ry="3" width="141" height="15" />
                    <rect x="307" y="233" rx="3" ry="3" width="299" height="15" />
                    <rect x="663" y="233" rx="3" ry="3" width="141" height="15" />
                    <rect x="57" y="274" rx="3" ry="3" width="897" height="2" />
                    <circle cx="882" cy="303" r="11" />
                    <circle cx="917" cy="303" r="11" />
                    <rect x="107" y="295" rx="3" ry="3" width="141" height="15" />
                    <rect x="308" y="294" rx="3" ry="3" width="299" height="15" />
                    <rect x="664" y="294" rx="3" ry="3" width="141" height="15" />
                    <rect x="58" y="335" rx="3" ry="3" width="897" height="2" />
                    <circle cx="881" cy="363" r="11" />
                    <circle cx="916" cy="363" r="11" />
                    <rect x="106" y="355" rx="3" ry="3" width="141" height="15" />
                    <rect x="307" y="354" rx="3" ry="3" width="299" height="15" />
                    <rect x="663" y="354" rx="3" ry="3" width="141" height="15" />
                    <rect x="57" y="395" rx="3" ry="3" width="897" height="2" />
                    <circle cx="882" cy="424" r="11" />
                    <circle cx="917" cy="424" r="11" />
                    <rect x="107" y="416" rx="3" ry="3" width="141" height="15" />
                    <rect x="308" y="415" rx="3" ry="3" width="299" height="15" />
                    <rect x="664" y="415" rx="3" ry="3" width="141" height="15" />
                    <rect x="55" y="453" rx="3" ry="3" width="897" height="2" />
                    <rect x="51" y="49" rx="3" ry="3" width="2" height="465" />
                    <rect x="955" y="49" rx="3" ry="3" width="2" height="465" />
                    <circle cx="882" cy="484" r="11" />
                    <circle cx="917" cy="484" r="11" />
                    <rect x="107" y="476" rx="3" ry="3" width="141" height="15" />
                    <rect x="308" y="475" rx="3" ry="3" width="299" height="15" />
                    <rect x="664" y="475" rx="3" ry="3" width="141" height="15" />
                    <rect x="55" y="513" rx="3" ry="3" width="897" height="2" />
                    <rect x="52" y="80" rx="3" ry="3" width="906" height="17" />
                    <rect x="53" y="57" rx="3" ry="3" width="68" height="33" />
                    <rect x="222" y="54" rx="3" ry="3" width="149" height="33" />
                    <rect x="544" y="55" rx="3" ry="3" width="137" height="33" />
                    <rect x="782" y="56" rx="3" ry="3" width="72" height="33" />
                    <rect x="933" y="54" rx="3" ry="3" width="24" height="33" />
                  </ContentLoader>
            }
            </div>
        </>
    )
}



export default AdminDashboard;
