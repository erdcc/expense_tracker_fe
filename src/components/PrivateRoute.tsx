import { Navigate, RouteProps } from "react-router-dom";

function PrivateRoute({ children, ...props }:RouteProps) {

    const token = localStorage.getItem("token");

    if (token) {
        return <>{children}</>
    } else {
        return <Navigate to="/login" />
  }
}

export default PrivateRoute;

