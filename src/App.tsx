import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import { Layout } from 'antd';
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Category from "./components/Category";
import Record from "./components/Record";
import AppHeader from "./components/AppHeader";
import Logout from "./components/Logout";

const { Content, Footer } = Layout;


function App() {
  return <Layout className="layout" >
    <AppHeader />
    <Content className="site-layout" style={{ padding: '50px' }}>

      <Routes>
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
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Expense Tracker @erdcc</Footer>
  </Layout>
}

export default App;
