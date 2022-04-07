import React from 'react'
import { Form, Select, Input, Button, notification } from 'antd'
const { Option } = Select

export default function EditUser() {
  const onFinish = (values: any) => {
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
      description: 'Add failed',
    })
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
            initialValues={{ remember: true }}
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
              <Input type="file" />
            </Form.Item>

            <Form.Item
              style={{ display: 'flex', justifyContent: 'flex-end' }}
              wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button type="ghost" style={{ marginLeft: '10px' }}>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
