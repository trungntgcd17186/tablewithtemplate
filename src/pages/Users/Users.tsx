import { DeleteFilled, EditFilled, ProfileOutlined } from '@ant-design/icons'
import { db } from '@components/firebaseConfig'
import { routes } from '@lib/routes'
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
} from 'antd'
import {
  collection,
  deleteDoc,
  doc,
  endBefore,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { RouteKeyContext } from '../../Context/RouteContext'
import './User.css'

const { Option } = Select

export default function Users() {
  const context = useContext(RouteKeyContext)

  let history = useHistory()

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [users, setUsers] = useState<any[]>([])
  const [lastUser, setLastUser] = useState<any>({})

  const [startUser, setStartUser] = useState<any>({})
  const [page, setPage] = useState(1)
  const [id, setId] = useState('')

  const [reRender, setReRender] = useState(false)
  const [isFilter, setIsFilter] = useState(false)

  const usersCollectionRef = collection(db, 'users')

  useEffect(() => {
    getUsers()
  }, [reRender])

  useEffect(() => {
    setUsers(context.memory)
  }, [isFilter])

  const getUsers = async () => {
    const q = query(usersCollectionRef, orderBy('username', 'asc'), limit(5))
    updateState(q)
  }

  const handleNextPage = async () => {
    const q = query(
      usersCollectionRef,
      orderBy('username', 'asc'),
      startAfter(lastUser),
      limit(5)
    )
    updateState(q)
    setPage(page + 1)
  }

  const handlePreviousPage = async () => {
    if (page > 1) {
      const q = query(
        usersCollectionRef,
        orderBy('username', 'asc'),
        endBefore(startUser),
        limitToLast(6)
      )
      updateState(q)
      setPage(page - 1)
    }
  }

  const updateState = async (q: any) => {
    const data: any = await getDocs(q)
    const listUser = data.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }))

    const lastDoc = data.docs[data.docs.length - 1]
    const startDoc = data.docs[0]

    setLastUser(lastDoc)
    setStartUser(startDoc)
    setUsers(listUser)
    context.setMemory(listUser)
  }

  const handleEdit = async (id: string, pathname: string, pageName: string) => {
    context.setIdEdit(id)
    const userEdit = users.find((user: any) => user.id === id)
    context.setDataEdit(userEdit)

    handleActiveSidebar(id, pathname, pageName)
  }

  const handleClickAddNew = () => {
    handleActiveSidebar('', 'adduser', 'Add User')
  }

  const handleActiveSidebar = (
    id: string,
    pathname: string,
    pageName: string
  ) => {
    //Xử lý active sidebar, import key route từ lib sau đó set key cho context.
    const routeUsers: any = routes.filter(el => el.title === 'Users')
    const routeChildren = routeUsers[0].children.filter(
      (el: any) => el.title === pageName
    )
    context.setRouteKey(routeChildren[0].key)
    history.push(`/users/${id}${pathname}`)
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
        <Row className="user-table-container">
          <Button onClick={handleClickAddNew} className="btn-add-new">
            Add New +
          </Button>

          <p className="show-entries">
            Show
            <Select defaultValue="10">
              <Option value="10">10</Option>
            </Select>
            entries
          </p>
          <Col>
            <label className="label-search">
              Search by user's name:
              <Input onChange={e => handleFilter(e.target.value.trim())} />
            </label>
            <Table
              style={{ overflowX: 'scroll', overflowY: 'hidden' }}
              dataSource={users}
              columns={columns}
              pagination={false}
            />
            <div className="btn-page-container">
              <Button onClick={handlePreviousPage}>Previous</Button>
              <div className="page-number">{page}</div>
              <Button className="next-btn" onClick={handleNextPage}>
                Next
              </Button>
            </div>
          </Col>
        </Row>
      </Layout>
    </>
  )
}
