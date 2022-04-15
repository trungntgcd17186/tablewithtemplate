import { RouteProps, routes } from '@lib/routes'
import { publicUrl } from '@utils/env'
import { Layout, Menu } from 'antd'
import { SiderProps } from 'antd/lib/layout/Sider'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { RouteKeyContext } from '../../Context/RouteContext'

interface Props extends SiderProps {}

function SiderComponent(props: Props) {
  const history = useHistory()

  const context = useContext(RouteKeyContext)

  const handleTo = (context: any, key: string, pathname?: string) => () => {
    if (pathname) {
      history.push(pathname)
    }

    //Xử lý active sibar khi click vào menu sidebar
    context.setRouteKey(key)
  }

  const renderMenuItem = (route: RouteProps) => {
    return route.title !== 'Edit User' && route.title !== 'User Detail' ? (
      <Menu.Item
        key={route.key}
        disabled={route.disabled}
        icon={route.Icon ? <route.Icon /> : null}
        onClick={handleTo(context, route.key, route.url)}>
        {route.title}
      </Menu.Item>
    ) : (
      ''
    )
  }

  return (
    <Sider {...props}>
      <Logo onClick={handleTo('/', '/')}>
        <img
          width={32}
          src={`${publicUrl}/logo192.png`}
          alt="logo"
          className="mr-8"
        />
        <div className="text-white font-medium">CRA antd admin</div>
      </Logo>
      <Menu theme="dark" mode="inline" selectedKeys={[context.routeKey]}>
        {routes.map(route =>
          !route.children ? (
            renderMenuItem(route)
          ) : (
            <Menu.SubMenu
              key={route.key}
              icon={<route.Icon />}
              title={route.title}>
              {route.children.map(c => renderMenuItem(c))}
            </Menu.SubMenu>
          )
        )}
      </Menu>
    </Sider>
  )
}

const Sider = styled(Layout.Sider)`
  &.ant-layout-sider {
    height: 100vh;
    position: fixed;
    left: 0;
    overflow: auto;
  }
`

const logoSpin = keyframes` {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`

const Logo = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2b2f3a;
  cursor: pointer;

  @media (prefers-reduced-motion: no-preference) {
    img {
      animation: ${logoSpin} infinite 20s linear;
    }
  }
`

SiderComponent.displayName = 'Sider'

export default SiderComponent
