import { uuid } from '@utils/webHelper'
import { SettingOutlined, UserOutlined, TableOutlined } from '@ant-design/icons'
import Table from '@pages/Table'
import Users from '@pages/Users/Users'
import Home from '@pages/Home'
import AddUser from '@pages/Users/AddUser'
import EditUser from '@pages/Users/EditUser'

export type RouteProps = {
  key: string
  title: string
  children?: RouteProps[]
  url: string
  Icon?: any
  Component?: any
  disabled?: boolean
  exact?: boolean
}

export let routes = [
  {
    key: uuid(),
    title: 'Table',
    Icon: TableOutlined,
    url: '/quotes',
    exact: true,
    Component: Table,
  },
  {
    key: uuid(),
    title: 'Users',
    Icon: UserOutlined,
    url: '',
    exact: true,
    children: [
      {
        key: uuid(),
        title: 'Total Users',
        url: '/users',
        exact: true,
        Component: Users,
      },
      {
        key: uuid(),
        title: 'Add User',
        url: '/adduser',
        exact: true,
        Component: AddUser,
      },
      {
        key: uuid(),
        title: 'Edit User',
        url: `/users/:id`,
        exact: true,
        Component: EditUser,
      },
    ],
  },
  {
    key: uuid(),
    title: 'Home',
    Icon: UserOutlined,
    url: '/Home',
    exact: true,
    Component: Home,
  },
]

export default routes
