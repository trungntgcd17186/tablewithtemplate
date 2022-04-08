import React, { useEffect, useState } from 'react'
import { Form, Select, Input, Button, notification } from 'antd'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import dataColumns from './Users'
const { Option } = Select

interface IProps {
  setUsers: any
}
export default function EditUser(props: IProps) {
  const { setUsers } = props
  console.log(props)

  let history = useHistory()
  const [baseImage, setBaseImage] = useState('')

  const dataEdit = JSON.parse(localStorage.getItem('dataEdit') || '[]')
  const storageKey = 'UserList'
  const dataString = localStorage.getItem(storageKey)

  const onFinish = (values: any) => {
    //Xử lý submit sau khi edit
    let items = JSON.parse(dataString || '[]')
    for (let i = 0; i < items.length; i++) {
      //Tìm id user cần edit theo id columns
      if (items[i].id == dataEdit.id) {
        const objectSubmit = { ...values, avatar: baseImage, id: dataEdit.id }
        //Chạy vòng for đến vị trí id cần edit sau đó gán bằng object mới lấy từ form submit, push lại id từ lS, thêm lại avatar nếu người dùng upload ảnh.
        items[i] = { ...objectSubmit }
      }
    }

    items = JSON.stringify(items)
    localStorage.setItem(storageKey, items)

    history.push('/totalusers')

    document
      .getElementById('MenuItem1')
      ?.classList.remove('ant-menu-item-selected')
    document
      .getElementById('MenuItem0')
      ?.classList.add('ant-menu-item-selected')
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log(errorInfo)
    notification.open({
      message: 'Notification Add User',
      description: 'Edit failed',
    })
  }

  const uploadImage = async (e: any) => {
    const file = e.target.files[0]
    const base64: any = await convertBase64(file)
    setBaseImage(base64)
  }

  const convertBase64 = (file: any) => {
    if (file.size <= 102400) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)

        fileReader.onload = () => {
          resolve(fileReader.result)
        }

        fileReader.onerror = error => {
          reject(error)
        }
      })
    } else {
      notification.open({
        message: 'Notification Image Upload',
        description: 'Size Image too big >100KB',
      })
    }
  }

  const handleClickCancel = () => {
    //Xử lý đổi màu sidebar
    document
      .getElementById('MenuItem2')
      ?.classList.remove('ant-menu-item-selected')
    document
      .getElementById('MenuItem0')
      ?.classList.add('ant-menu-item-selected')
  }

  return (
    <div>
      <h1>Edit User</h1>
      <div className="container-add-user">
        <div className="card-head">
          <h1>Basic Information</h1>
        </div>
        <div className="infor">
          <Form
            name="basic"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 32 }}
            initialValues={{
              name: dataEdit.name,
              username: dataEdit.username,
              email: dataEdit.email,
              address: dataEdit.address,
              phoneNumber: dataEdit.phoneNumber,
              website: dataEdit.website,
              company: dataEdit.company,
              role: dataEdit.role,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input user name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: 'Please input user username!' },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input user email!',
                },
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[
                { required: true, message: 'Please input user address!' },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: 'Please input user phone number!',
                },
                {
                  pattern: new RegExp(
                    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
                  ),
                  message: 'Wrong format!',
                },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item label="Website" name="website">
              <Input />
            </Form.Item>

            <Form.Item label="Company" name="company">
              <Input />
            </Form.Item>

            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: 'Please input user role!' }]}>
              <Select placeholder="Member">
                <Option value="admin">Admin</Option>
                <Option value="member">Member</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Avatar" name="avatar">
              <Input
                type="file"
                onChange={e => {
                  uploadImage(e)
                }}
              />
              <img src={baseImage} style={{ height: '100px' }} />
            </Form.Item>

            <Form.Item
              style={{ display: 'flex', justifyContent: 'flex-end' }}
              wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>

              <Link to="/totalusers">
                <Button
                  onClick={handleClickCancel}
                  type="ghost"
                  style={{ marginLeft: '10px' }}>
                  Cancel
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
