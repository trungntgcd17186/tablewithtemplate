import { routes } from '@lib/routes'
import { createContext, useState } from 'react'
import { useHistory } from 'react-router-dom'

type RouteKeyProviderProps = {
  children: React.ReactNode
}

const RouteKeyContext = createContext<any>('')

function RouteKeyProvider({ children }: RouteKeyProviderProps) {
  let history = useHistory()
  const [routeKey, setRouteKey] = useState('')
  const [memory, setMemory] = useState<any[]>([])
  const [idEdit, setIdEdit] = useState('')
  const [dataEdit, setDataEdit] = useState({})

  const handleClickCancel = () => {
    //Xử lý active sidebar, import key route từ lib sau đó set key cho context.
    const routeUsers: any = routes.filter(el => el.title === 'Users')

    const routeChildren = routeUsers[0].children.filter(
      (el: any) => el.title === 'Total Users'
    )
    setRouteKey(routeChildren[0].key)
  }

  if (idEdit) {
    localStorage.setItem('idEdit', idEdit)
  }

  const value = {
    routeKey,
    setRouteKey,
    handleClickCancel,
    idEdit,
    setIdEdit,
    setDataEdit,
    dataEdit,
    setMemory,
    memory,
  }
  return (
    <RouteKeyContext.Provider value={value}>
      {children}
    </RouteKeyContext.Provider>
  )
}

export { RouteKeyContext, RouteKeyProvider }
