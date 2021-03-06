import { db } from '@components/firebaseConfig'
import { Button, Form, Input, notification, Select } from 'antd'
import { addDoc, collection } from 'firebase/firestore'
import { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { RouteKeyContext } from '../../Context/RouteContext'

const { Option } = Select
export default function AddUser() {
  const context = useContext(RouteKeyContext)
  let history = useHistory()

  const [baseImage, setBaseImage] = useState('')

  const onFinish = async (values: any) => {
    //Kiểm tra database có chứa username từ form submit hay không.
    const filterResult = context.memory.map((el: { username: string }) =>
      el.username.includes(values.username)
    )
    //Nếu tồn tại -> thông báo lỗi.
    if (filterResult.includes(true)) {
      notification.open({
        message: 'Notification Add User',
        description: 'Username already exists, please enter another username ',
      })
    } else {
      try {
        const docRef = await addDoc(collection(db, 'users'), {
          ...values,
          avatar: baseImage,
        })
        console.log('Document written with ID: ', docRef.id)
      } catch (e) {
        console.error('Error adding document: ', e)
      }

      history.push('/users')
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log(errorInfo)
    notification.open({
      message: 'Notification Add User',
      description: 'Add failed',
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

  const onNumberChange = (e: any) => {
    if (e.target && e.keyCode >= 48 && e.keyCode <= 57) {
      e.target.value = ''
    }
  }

  return (
    <div>
      <h1>Add User</h1>
      <div className="container-add-user">
        <div className="card-head">
          <h1>Basic Information</h1>
        </div>
        <div className="infor">
          <Form
            name="basic"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 32 }}
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
              <Input type="number" onChange={onNumberChange} />
            </Form.Item>

            <Form.Item
              label="Website"
              name="website"
              rules={[
                {
                  required: true,
                  message: 'Please input user website!',
                },
                {
                  pattern: new RegExp(
                    '^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?'
                  ),
                  message: 'Wrong format!',
                },
              ]}>
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
              <Link to="/users">
                <Button
                  onClick={context.handleClickCancel}
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
