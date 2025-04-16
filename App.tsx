import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Dashboard from './components/Dashboard';
import DestinationManager from './components/DestinationManager';
import Statistics from './components/Statistics';

const { Header, Content, Sider } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        {/* Header */}
        <Header style={{ position: 'fixed', width: '100%' }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <a href="/admin/dashboard">Dashboard</a>
            </Menu.Item>
            <Menu.Item key="2">
              <a href="/admin/destinations">Quản lý điểm đến</a>
            </Menu.Item>
            <Menu.Item key="3">
              <a href="/admin/statistics">Thống kê</a>
            </Menu.Item>
          </Menu>
        </Header>

        <Layout style={{ marginTop: 64 }}>
          {/* Sidebar - optional */}
          <Sider width={200} style={{ background: '#fff' }} />

          {/* Content area */}
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Switch>
                {/* Điều hướng đến các trang */}
                <Route path="/admin/dashboard" component={Dashboard} />
                <Route path="/admin/destinations" component={DestinationManager} />
                <Route path="/admin/statistics" component={Statistics} />
                {/* Trang chủ */}
                <Route path="/" exact>
                  <h1>Trang Chủ</h1>
                </Route>
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
