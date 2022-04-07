import { DeleteFilled, EditFilled } from '@ant-design/icons'
import { Button, Col, Layout, Row, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './User.css'
export const dataColumns = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: 'Kulas Knight',
    phoneNumber: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: 'Romaguera-Crona',
    role: 'member',
    avatar: '',
  },
]

const { Option } = Select

export default function Users() {
  const storageKey = 'UserList'

  const dataString = localStorage.getItem(storageKey)

  const [users, setUsers] = useState<any>([])

  const dataLS = JSON.parse(dataString || '[]')

  useEffect(() => {
    if (dataString) {
      setUsers(dataLS)
    } else {
      setUsers(dataColumns)
      localStorage.setItem(storageKey, JSON.stringify(dataColumns))
    }
  }, [dataString])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Avatar',
      dataIndex: '',
      render: (objectUserInfor: { avatar: string }) => (
        <img
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
          }}
          src={
            objectUserInfor.avatar ||
            'https://www.thecastofcheers.com/images/9-best-online-avatars-and-how-to-make-your-own-[2020]-4.png'
          }
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
      dataIndex: 'address',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Website',
      dataIndex: 'website',
    },
    {
      title: 'Company',
      dataIndex: 'company',
    },
    {
      title: 'Role',
      dataIndex: 'role',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (id: string) => (
        <div className="action-container">
          <Button className="action-edit">
            <EditFilled style={{ color: '#4caf50' }} />
          </Button>
          <Button className="action-delete" id={id} onClick={handleDelete}>
            <DeleteFilled style={{ color: 'orange' }} />
          </Button>
        </div>
      ),
    },
  ]

  const handleDelete = (e: any) => {
    let items = JSON.parse(dataString || '[]')

    for (let i = 0; i < items.length; i++) {
      if (items[i].id == e.target.id) {
        items.splice(i, 1)
      }
    }

    items = JSON.stringify(items)
    localStorage.setItem(storageKey, items)

    setUsers(JSON.parse(dataString || '[]'))
  }

  const handleClickAddNew = () => {
    document
      .getElementById('MenuItem0')
      ?.classList.remove('ant-menu-item-selected')
    document
      .getElementById('MenuItem1')
      ?.classList.add('ant-menu-item-selected')
  }

  return (
    <>
      <Layout className="layout-header"></Layout>
      <Layout className="layout-content">
        <Row style={{ display: 'flex', flexDirection: 'column' }}>
          <Link to="/adduser">
            <Button onClick={handleClickAddNew} className="btn-add-new">
              Add New +
            </Button>
          </Link>

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
