import { useDispatch, useSelector } from "react-redux"
import { logout } from "../store/actions/userActions"
import { useEffect } from "react"
import { AppState } from "../store"
import { Navigate } from "react-router-dom"

const Logout = () => {
    const { data } = useSelector((state: AppState) => state.user)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        dispatch(logout())
    }, [dispatch])

    if(!data.username) {
        console.log("Logout: ",data.message)
        return <Navigate to="/login" />
    }

    return <div>Logging out...</div>

}

export default Logout