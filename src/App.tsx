import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import { Layout } from 'antd';
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Category from "./components/Category";
import Record from "./components/Record";
import AppHeader from "./components/AppHeader";
import Logout from "./components/Logout";
import HomePage from "./components/HomePage";
//import backgroundImage from "../public/bg.jpg"

const { Content, Footer } = Layout;




function App() {

  return (

    <Layout className="layout" style={{
      backgroundImage: `url(${process.env.PUBLIC_URL}/bg.jpg)`,
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
    }}
    >
      <AppHeader />
      <Content className="site-layout" style={{ padding: '50px' }}>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/categories" element={
            <PrivateRoute>
              <Category />
            </PrivateRoute>
          } />
          <Route path="/records" element={
            <PrivateRoute>
              <Record />
            </PrivateRoute>
          } />
          <Route path="/logout" element={
            <PrivateRoute>
              <Logout />
            </PrivateRoute>
          } />
        </Routes>
      </Content>
      <Footer className="site-layout" style={{ textAlign: 'center' }}>Payment Track <a href="https://github.com/erdcc">@erdcc</a></Footer>
    </Layout>

  )
}

export default App;
