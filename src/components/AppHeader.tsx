import { Menu } from "antd"
import { Header } from "antd/es/layout/layout"
import { useDispatch, useSelector } from "react-redux"
import { AppState } from "../store"
import { useEffect } from "react"
import { isLoggedIn } from "../store/actions/userActions"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import { HomeTwoTone } from "@ant-design/icons"

const AppHeader = () => {
  const { data, loading } = useSelector((state: AppState) => state.user)
  const dispatch = useDispatch<any>()

  useEffect(() => {
    dispatch(isLoggedIn())
  }, [dispatch])

  const { pathname } = useLocation()
  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <Link to="/">
        <HomeTwoTone style={{ fontSize: '250%', margin:"20px"}} />
      </Link>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[pathname]}
        items={
          data.username ? [
            {
              label: (
                <Link to="/records">
                  Records
                </Link>
              ),
              key: '/records',
            },
            {
              label: (
                <Link to="/categories">
                  Categories
                </Link>
              ),
              key: '/categories',
            },
            {
              label: (
                <Link to="/logout" style={{color:"red"}}>
                  Logout
                </Link>
              ),
              key: '/logout',
            },
          ]
            : loading ? [] :
              [{
                label: (
                  <Link to="/login" >
                    Login
                  </Link>
                ),
                key: '/login',
              }]

        }
      />
    </Header>
  )
}

export default AppHeader