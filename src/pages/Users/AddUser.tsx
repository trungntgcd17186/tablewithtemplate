import { Form, Select, Input, Button } from 'antd'
import { dataColumns } from './Users'
const { Option } = Select

export default function AddUser() {
  const storageKey = 'UserList'
  const onFinish = (values: any) => {
    dataColumns.push(values)

    localStorage.setItem(storageKey, JSON.stringify(dataColumns))
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log(errorInfo)
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
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[
                { required: true, message: 'Please input your address!' },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[{ required: true, message: 'Please input your email!' }]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Website"
              name="website"
              rules={[
                { required: true, message: 'Please input your website!' },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Company"
              name="company"
              rules={[
                { required: true, message: 'Please input your company!' },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: 'Please input your role!' }]}>
              <Select placeholder="Member">
                <Option value="admin">Admin</Option>
                <Option value="member">Member</Option>
              </Select>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button type="ghost" style={{ marginLeft: '10px' }}>
                Cancel
              </Button>
            </Form.Item>

            <Form.Item
              label="Avatar"
              name="avatar"
              rules={[
                { required: true, message: 'Please input your avatar link!' },
              ]}>
              <Input />
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
