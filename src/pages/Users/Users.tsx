import { DeleteFilled, EditFilled, ProfileOutlined } from '@ant-design/icons'
import { db } from '@components/firebaseConfig'
import { routes } from '@lib/routes'
import { IUsers } from '@lib/types'
import { uuid } from '@utils/webHelper'
import {
  Button,
  Col,
  Input,
  Layout,
  Modal,
  Row,
  Select,
  Table,
  Tag,
  Pagination,
} from 'antd'
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  limit,
  startAfter,
} from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { RouteKeyContext } from '../../Context/RouteContext'
import './User.css'

export const dataColumns = [
  {
    id: uuid(),
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: 'Kulas Knight',
    phoneNumber: '0123456789',
    website: 'http://hildegard.org',
    company: 'Romaguera-Crona',
    role: 'member',
    avatar: '',
  },
]

const { Option } = Select

export default function Users() {
  const context = useContext(RouteKeyContext)

  let history = useHistory()

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [users, setUsers] = useState<any[]>([])
  const [reRender, setReRender] = useState(false)

  const [id, setId] = useState('')
  const [isFilter, setIsFilter] = useState(false)

  const usersCollectionRef = collection(db, 'users')

  useEffect(() => {
    getUsers()
  }, [reRender])

  useEffect(() => {
    setUsers(context.memory)
  }, [isFilter])

  const getUsers = async () => {
    const q = query(usersCollectionRef, limit(5))
    const data = await getDocs(q)
    const listUser = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))

    setUsers(listUser)
    context.setMemory(listUser)
  }

  const handleEdit = async (id: string, pathname: string, pageName: string) => {
    context.setIdEdit(id)

    const data = await getDocs(collection(db, 'users'))
    const listUsers = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))

    const userEdit = listUsers.find((user: any) => user.id === id)

    context.setDataEdit(userEdit)

    //Xử lý active sidebar, import key route từ lib sau đó set key cho context.
    const routeUsers: any = routes.filter(el => el.title === 'Users')
    const routeChildren = routeUsers[0].children.filter(
      (el: any) => el.title === pageName
    )
    context.setRouteKey(routeChildren[0].key)
    history.push(`/users/${id}${pathname}`)
  }

  const handleClickAddNew = () => {
    const routeUsers: any = routes.filter(el => el.title === 'Users')

    const routeChildren = routeUsers[0].children.filter(
      (el: any) => el.title === 'Add User'
    )
    context.setRouteKey(routeChildren[0].key)
    history.push('/users/adduser')
  }

  const handleFilter = (e: string) => {
    //Nhận array result gồm tên các users
    const result = users.map((item: any) => item.name)

    //Kiểm tra array result có chứa value input hay không. Nếu có lấy ra tên user.
    const nameResponse = result.filter((item: string) =>
      item.toLowerCase().includes(e.toLowerCase())
    )

    if (nameResponse) {
      const filterResult = users.filter((user: any) =>
        nameResponse.includes(user.name)
      )
      console.log(filterResult)
      setUsers(filterResult)
    } else {
      setUsers([])
    }
    if (e.length === 0) {
      setIsFilter(!isFilter)
    }
  }

  const handleSelect = async (e: string) => {
    if (e) {
      const q = query(usersCollectionRef, where('role', '==', e), limit(5))
      const data = await getDocs(q)
      const listUser = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      setUsers(listUser)
    } else {
      setUsers(context.memory)
    }
  }

  const showModal = (id: string) => {
    setId(id)
    setIsModalVisible(true)
  }

  const handleOk = async () => {
    const userDoc = doc(db, 'users', id)
    await deleteDoc(userDoc)
    setReRender(!reRender)
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

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
      title: () => (
        <div>
          Role
          <Select allowClear onChange={e => handleSelect(e)}>
            <Option value="admin">admin</Option>
            <Option value="member">member</Option>
          </Select>
        </div>
      ),
      dataIndex: 'role',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (id: string) => (
        <div className="action-container">
          <Tag className="" onClick={() => handleEdit(id, '', 'User Detail')}>
            <ProfileOutlined />
          </Tag>
          <Tag
            className="action-edit"
            onClick={() => handleEdit(id, '/edit', 'Edit User')}>
            <EditFilled style={{ color: '#4caf50' }} />
          </Tag>

          <Tag className="action-delete" onClick={() => showModal(id)}>
            <DeleteFilled style={{ color: 'orange' }} />
          </Tag>
        </div>
      ),
    },
  ]

  const handleChangePage = async (page: number) => {
    const q = query(usersCollectionRef, limit(5))
    const data = await getDocs(q)
    const lastUser = data.docs[data.docs.length - 1]
    console.log(lastUser)
    const next = query(usersCollectionRef, startAfter(lastUser), limit(5))
    const dataNext = await getDocs(next)
    const listUser = dataNext.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    setUsers(listUser)
    context.setMemory(listUser)
  }

  return (
    <>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}>
        <p>Delete Confirm</p>
      </Modal>
      <Layout className="layout-header"></Layout>
      <Layout className="layout-content">
        <Row style={{ display: 'flex', flexDirection: 'column' }}>
          <Button onClick={handleClickAddNew} className="btn-add-new">
            Add New +
          </Button>

          <p style={{ marginTop: '10px', fontSize: '16px' }}>
            Show{' '}
            <Select defaultValue="10">
              <Option value="10">10</Option>
            </Select>{' '}
            entries
          </p>
          <Col>
            <label style={{ width: '30%', float: 'right' }}>
              Search by user's name:
              <Input onChange={e => handleFilter(e.target.value.trim())} />
            </label>
            <Table
              style={{ overflowY: 'hidden', overflowX: 'scroll' }}
              dataSource={users}
              columns={columns}
              pagination={false}
            />
            <Pagination onChange={page => handleChangePage(page)} total={100} />
          </Col>
        </Row>
      </Layout>
    </>
  )
}
