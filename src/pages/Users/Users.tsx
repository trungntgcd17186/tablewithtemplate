import { DeleteFilled, EditFilled } from '@ant-design/icons'
import { Button, Col, Layout, Row, Select, Table } from 'antd'
import React, { useState } from 'react'
import './User.css'
export const dataColumns = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496',
      },
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets',
    },
  },
]

const { Option } = Select

export default function Users() {
  const storageKey = 'UserList'

  localStorage.setItem(storageKey, JSON.stringify(dataColumns))

  const dataString = localStorage.getItem(storageKey)

  const [users, setUsers] = useState<any>(JSON.parse(dataString || '') || [])

  const columns = [
    {
      title: 'Avatar',
      dataIndex: '',
      render: (id: string) => (
        <img
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
          }}
          src="https://www.thecastofcheers.com/images/9-best-online-avatars-and-how-to-make-your-own-[2020]-4.png"
          alt="anh avatar"
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'User Name',
      dataIndex: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Address',
      dataIndex: ['address', 'street'],
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
    },
    {
      title: 'Website',
      dataIndex: 'website',
    },
    {
      title: 'Company',
      dataIndex: ['company', 'name'],
    },
    {
      title: 'Role',
      dataIndex: '',
    },
    {
      title: 'Action',
      dataIndex: '',
      render: () => (
        <div className="action-container">
          <div className="action-edit">
            <EditFilled style={{ color: '#4caf50' }} />
          </div>
          <div className="action-delete">
            <DeleteFilled style={{ color: 'orange' }} />
          </div>
        </div>
      ),
    },
  ]

  return (
    <>
      <Layout className="layout-header"></Layout>
      <Layout className="layout-content">
        <Row style={{ display: 'flex', flexDirection: 'column' }}>
          <Button className="btn-add-new">Add New +</Button>

          <p style={{ marginTop: '10px', fontSize: '16px' }}>
            Show{' '}
            <Select defaultValue="10">
              <Option value="10">10</Option>
            </Select>{' '}
            entries
          </p>
          <Col>
            <Table dataSource={users} columns={columns} />
          </Col>
        </Row>
      </Layout>
    </>
  )
}
