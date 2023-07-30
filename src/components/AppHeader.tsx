import { Menu } from "antd"
import { Header } from "antd/es/layout/layout"
import { useDispatch, useSelector } from "react-redux"
import { AppState } from "../store"
import { useEffect } from "react"
import { isLoggedIn } from "../store/actions/userActions"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"

const AppHeader = () => {
    const { token } = useSelector((state: AppState) => state.user.data)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        dispatch(isLoggedIn())
    }, [dispatch])

    const { pathname } = useLocation()
    return (
        <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[pathname]}
          items={token ?[
            {
                label: (
                  <a href="/records" target="_self" rel="noopener noreferrer">
                    Records
                  </a>
                ),
                key: 'records',
              },
              {
                label: (
                  <a href="/categories" target="_self" rel="noopener noreferrer">
                    Categories
                  </a>
                ),
                key: 'categories',
              },
              {
                label: (
                  <a href="/logout" target="_self" rel="noopener noreferrer">
                    Logout
                  </a>
                ),
                key: 'logout',
              },
          ] 
          : 
          [{
            label: (
              <a href="/login" target="_self" rel="noopener noreferrer">
                Login
              </a>
            ),
            key: 'login',
          }]
  
          }
        />
      </Header>
    )
}

export default AppHeader