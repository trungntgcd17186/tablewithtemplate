import { TableOutlined, UserOutlined } from '@ant-design/icons'
import Home from '@pages/Home'
import Table from '@pages/Table'
import AddUser from '@pages/Users/AddUser'
import EditUser from '@pages/Users/EditUser'
import UserDetail from '@pages/Users/UserDetail'
import Users from '@pages/Users/Users'
import { uuid } from '@utils/webHelper'

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
        url: '/users/adduser',
        exact: true,
        Component: AddUser,
      },
      {
        key: uuid(),
        title: 'Edit User',
        url: `/users/:slug/edit`,
        Component: EditUser,
      },
      {
        key: uuid(),
        title: 'User Detail',
        url: `/users/:slug`,
        Component: UserDetail,
      },
    ],
  },
  // {
  //   key: uuid(),
  //   title: 'Table',
  //   Icon: TableOutlined,
  //   url: '/quotes',
  //   exact: true,
  //   Component: Table,
  // },
]

export default routes
