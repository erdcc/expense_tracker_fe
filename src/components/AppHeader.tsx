import { Menu } from "antd"
import { Header } from "antd/es/layout/layout"
import { useDispatch, useSelector } from "react-redux"
import { AppState } from "../store"
import { useEffect } from "react"
import { isLoggedIn } from "../store/actions/userActions"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"

const AppHeader = () => {
    const { data, loading, error } = useSelector((state: AppState) => state.user)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        dispatch(isLoggedIn())
    }, [])

    const { pathname } = useLocation()
    return (
        <Header style={{ display: 'flex', alignItems: 'center' }}>
            <div className="demo-logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[pathname]}>

                {data.username ?
                    (
                        <>
                            <Menu.Item key="/categories"><Link to="/categories">Categories</Link></Menu.Item>
                            <Menu.Item key="/records"><Link to="/records">Records</Link></Menu.Item>
                            <Menu.Item key="/logout"><Link to="/logout">Logout</Link></Menu.Item>
                        </>
                    )
                    : 
                    loading ? null : <Menu.Item key="/login"><Link to="/login">Login</Link></Menu.Item>

                }
            </Menu>




        </Header>
    )
}

export default AppHeader