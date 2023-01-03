import React, { useState } from 'react';
import {
 PoweroffOutlined,CalendarOutlined,ContactsOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

import { authActions } from "./features/authorize/authSlice";
import AddEvent from './AddEvent';
import Dashboard from './Dashboard';
import Login from './LoginForm';
import { useSelector } from "react-redux";

const { Header, Content, Footer, Sider } = Layout;



const LayoutComponent = () => {

  const logedInUser = useSelector((state) => {
    return state.auth.loggedInUser;
  });
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(['dashboard'])
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate()
  const dispatch = useDispatch();




  const items = [
    {
        key: 'dashboard',
        icon: <CalendarOutlined />,
        label: 'Dashboard',
        onClick: () => {
            navigate('/')
            setSelectedKeys(['dashboard'])
        }
    },
    {
        key: 'add-event',
        icon: <ContactsOutlined/>,
        label: 'Add Event',
        onClick: () => {
            navigate('/add-event')
            setSelectedKeys(['add-event'])
        }
    },{
      key: 'log-out',
        icon: <PoweroffOutlined />,
        label: 'Log Out',
        onClick: () => {
          dispatch(authActions.logout(false))
          setSelectedKeys(['log-out'])
        }
    }
]

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <Breadcrumb
            style={{
              margin: '30px',
              color:"white"
            }}
          >
            <Breadcrumb.Item>Hello {logedInUser.firstName} !</Breadcrumb.Item>
          </Breadcrumb>
        <Menu theme="dark" defaultSelectedKeys={selectedKeys} mode="inline" items={items} selectedKeys={selectedKeys}/>
      </Sider>
      <Layout className="site-layout" >
        <Content
          style={{
            margin: '0 16px',
            
          }}
        >
          
          <div
            style={{
              padding: 24,
              minHeight: 360,
              
            }}
          > 
            
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/add-event' element={<AddEvent />} />
                <Route path='/edit-event/:id' element={<AddEvent />} />
                <Route path='/' element={<Dashboard setSelectedKeys = {setSelectedKeys} />} />
            </Routes>


          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Event management ©2023
        </Footer>
      </Layout>
    </Layout>
  );
};
export default LayoutComponent;