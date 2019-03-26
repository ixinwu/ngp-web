import React, { Component } from 'react';
import { Switch, generateRouteContent } from '@ixinwu-ngp/web-framework';
import { withStyles } from '@ixinwu-ngp/web-styles';
import Error from '@ixinwu-ngp/materials-component/error';
import Loading from '@ixinwu-ngp/materials-component/loading';
import { Layout, Menu, Icon, Dropdown, Button } from 'antd';
import Nav from './components/nav';
import styles from './styles';

const { Header, Sider, Content } = Layout;

class View extends Component {
  state = {
    collapsed: false,
  };

  componentDidMount() {
    const { initApp } = this.props;

    initApp();
  }

  handleToggle = () => {
    this.setState(prevState => ({
      ...prevState,
      collapsed: !prevState.collapsed,
    }));
  };

  handleNavSelect = ({ selectedKeys: selectedMenuIds }) => {
    const { menuSelect } = this.props;
    menuSelect(selectedMenuIds);
  };

  handleNavClick = ({ key: id }) => {
    const { menuClick } = this.props;
    menuClick(id);
  };

  handleNavOpenChange = openMenuIds => {
    const { menuOpen } = this.props;
    menuOpen(openMenuIds);
  };

  handleUserMenuClick = ({ key }) => {
    const { logout } = this.props;
    if (key === 'logout') {
      logout();
    }
  };

  render() {
    const {
      title,
      status,
      statusTip,
      menus,
      user,
      selectedMenuIds,
      openMenuIds,
      childRouteConfigs,
      classes,
    } = this.props;
    const { collapsed } = this.state;

    const userName = user && user.name;
    const userMenu = (
      <Menu onClick={this.handleUserMenuClick}>
        <Menu.Item key="logout">
          <Icon type="logout" />
          退出登录
        </Menu.Item>
      </Menu>
    );

    let content;

    if (status === 'error') {
      content = (
        <div className={classes.container}>
          <Error message={statusTip} />
        </div>
      );
    } else if (status === 'success') {
      content = (
        <Layout className={classes.container}>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className={classes.logo}>{!collapsed ? title : <span>&nbsp;</span>}</div>
            <Nav
              menus={menus}
              onSelect={this.handleNavSelect}
              onClick={this.handleNavClick}
              onOpenChange={this.handleNavOpenChange}
              selectedKeys={selectedMenuIds}
              openKeys={openMenuIds}
            />
          </Sider>
          <Layout>
            <Header className={classes.header}>
              <div className={classes.headerLeft}>
                <Icon
                  className={classes.trigger}
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.handleToggle}
                />
              </div>
              <div className={classes.headerRight}>
                <Dropdown overlay={userMenu} trigger={['click']}>
                  <div className={classes.user}>
                    <Button
                      className={classes.userIcon}
                      type="primary"
                      shape="circle"
                      icon="user"
                    />
                    <span className={classes.userName}>{userName}</span>
                  </div>
                </Dropdown>
              </div>
            </Header>
            <Content className={classes.content}>
              <Switch>{generateRouteContent('', childRouteConfigs)}</Switch>
            </Content>
          </Layout>
        </Layout>
      );
    } else {
      content = (
        <div className={classes.container}>
          <Loading size="large" message={statusTip} />
        </div>
      );
    }

    return content;
  }
}

export default withStyles(styles)(View);
