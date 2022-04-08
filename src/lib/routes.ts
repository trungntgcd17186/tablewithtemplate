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

/**
 * 共用的前端路由，也可以改成 hooks 加上權限來過濾資料、呼叫 API 取得 routes，例如:
 *
 * function useRoutes() {
 *   const { data } = useQuery(`/routes`) // or just a route variable
 *   const { user } = useAuth()
 *
 *   // filter route data then return
 * }
 */
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
    url: '/usermanage',
    exact: true,
    children: [
      {
        key: uuid(),
        title: 'Total Users',
        url: '/totalusers',
        Component: Users,
      },
      {
        key: uuid(),
        title: 'Add User',
        url: '/adduser',
        Component: AddUser,
      },
      {
        key: uuid(),
        title: 'Edit User',
        url: '/edituser',
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
