// import { Redirect } from "react-router-dom";
// import { Route, RouteProps } from "react-router-dom";

// interface PrivateRouteProps extends RouteProps {
//   component: React.FC<any>;
// }

// function PrivateRoute({ component: Component, ...theRest }: PrivateRouteProps) {
//   return (
//     <Route
//       {...theRest}
//       render={(props) => {
//         const token = localStorage.getItem("token");

//         if (token) {
//           return <Component {...props} />;
//         }
//         return <Redirect to="/login" />;
//       }}
//     />
//   );
// }

// export default PrivateRoute;

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

