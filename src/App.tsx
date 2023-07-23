import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import { Layout, Menu, theme } from 'antd';

const { Header, Content, Footer } = Layout;


function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
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
          <Route path="/register" Component={SignUp} />
        </Routes>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Expense Tracker @erdcc</Footer>
  </Layout>
}

export default App;
