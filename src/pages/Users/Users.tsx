import { objType } from '@lib/types'
import { Col, Layout, Row, Table, Button, Select } from 'antd'
import React, { useState } from 'react'
import { useDatas } from './queries'
import { EditFilled } from '@ant-design/icons'
import { DeleteFilled } from '@ant-design/icons'
import './User.css'

export default function Users() {
  const [filter, setFilter] = useState<objType>({ _page: 1 })

  const { data, isFetching, refetch } = useDatas({
    variables: filter,
  })

  const { Option } = Select

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
            <Table dataSource={data} columns={columns} />
          </Col>
        </Row>
      </Layout>
    </>
  )
}
