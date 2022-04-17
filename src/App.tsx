import ErrorBoundary from '@components/ErrorBoundary'
import Exception from '@components/Exception'
import Loading from '@components/Loading'
import Sider from '@components/Sider'
import { RouteProps, routes } from '@lib/routes'
import HomePage from '@pages/HomePage'
import { Layout } from 'antd'
import { Suspense, useContext } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { RouteKeyContext } from './Context/RouteContext'

function App() {
  const context = useContext(RouteKeyContext)
  let location = useLocation()

  const renderRoute = (route: RouteProps) => {
    const id = localStorage.getItem('idEdit')

    if (!route.Component || !route.url) {
      return null
    }
    //Xử lý check case sai id user khi edit.
    if (
      route.title === 'Edit User' &&
      location.pathname !== `/users/${id}/edit`
    ) {
      return null
    }

    // Xử lý check case sai id user khi xem info user.
    if (route.title === 'User Detail' && location.pathname !== `/users/${id}`) {
      return null
    }

    return (
      <Route
        key={route.key}
        exact={route.exact}
        component={route.Component}
        path={route.url}
      />
    )
  }

  const _routes = routes
    .map(r => (r.children ? r.children.map(renderRoute) : renderRoute(r)))
    .reduce((result: any[], route) => {
      if (!route) {
        return result
      }
      if (Array.isArray(route)) {
        return [...result, ...route.filter(Boolean)]
      }

      result.push(route)

      return result
    }, [])

  return (
    <ErrorBoundary>
      <Layout>
        <Sider />
        <Layout className="ml-200">
          <Layout.Content>
            <Suspense fallback={<Loading />}>
              <Switch>
                <Route exact path="/" component={HomePage} />
                {_routes}
                <Route component={Exception} />
              </Switch>
            </Suspense>
          </Layout.Content>
        </Layout>
      </Layout>
    </ErrorBoundary>
  )
}

export default App
