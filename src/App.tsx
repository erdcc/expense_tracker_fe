import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import { Layout, Menu, theme } from 'antd';
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Category from "./components/Category";
import Record from "./components/Record";

const { Header, Content, Footer } = Layout;


function App() {
  return <Layout>
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="demo-logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={new Array(3).fill(null).map((_, index) => ({
          key: String(index + 1),
          label: `nav ${index + 1}`,
        }))}
      />
    </Header>
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
      </Routes>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Expense Tracker @erdcc</Footer>
  </Layout>
}

export default App;
