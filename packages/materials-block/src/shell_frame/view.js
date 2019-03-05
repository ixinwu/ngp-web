import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'antd/lib/layout';
import 'antd/lib/layout/style';
import Menu from 'antd/lib/menu';
import 'antd/lib/menu/style';
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style';
import Dropdown from 'antd/lib/dropdown';
import 'antd/lib/dropdown/style';
import { matchPath } from 'react-router';
import { Switch } from 'react-router-dom';
import withStyles from '@ixinwu-ngp/materials-component/styles/with_styles';
import { qsStringify, generateRouteContent } from '@ixinwu-ngp/web-framework';
import Logo from './components/logo';

const { Header, Content, Sider } = Layout;

const styles = {
  header: {
    color: '#fff',
    padding: '0 20px',
    display: 'flex',
  },
  headerLeft: {
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
  },
  headerRight: {
    flex: '1 1 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginRight: 20,
  },
};

function findMenu(configs, url, exact) {
  let activeMenu = null;
  configs.every(config => {
    if (
      matchPath(url, {
        pathname: config.url,
        exact,
      })
    ) {
      activeMenu = config;
      return false;
    }

    if (config.children && config.children.length > 0) {
      activeMenu = findMenu(config.children, url);
    }

    if (activeMenu) {
      return false;
    }

    return true;
  });

  return activeMenu;
}

class ShellFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      menuSelectedKey: null,
      funcMenuSelectedKey: null,
    };
  }

  componentDidMount() {
    const { location, shellMenus, menus, history, init } = this.props;

    // 初始化handle
    init();
    // 根据url同步顶级菜单状态
    const activeShellMenu = findMenu(shellMenus, location.pathname);
    if (!activeShellMenu) return;
    this.setState(prevState => ({
      ...prevState,
      menuSelectedKey: activeShellMenu.key,
    }));

    let activeMenu = findMenu(menus, location.pathname);

    // 默认激活第一个功能菜单
    if (!activeMenu && location.pathname === activeMenu.url && menus.length > 0) {
      activeMenu = menus[0];
      history.push({
        pathname: activeMenu.url,
        search: qsStringify(activeMenu.query),
      });
    }

    if (activeMenu) {
      // 同步功能菜单状态
      this.setState(prevState => ({
        ...prevState,
        funcMenuSelectedKey: activeMenu.key,
      }));
    }
  }

  handleUserMenuClick = ({ key }) => {
    const { logout } = this.props;
    if (key === 'logout') {
      logout();
    }
  };

  handleShellMenuClick = ({ key }) => {
    const { shellMenus, location } = this.props;
    const shellMenu = shellMenus.find(config => config.key === key);

    if (matchPath(location.pathname, { pathname: shellMenu.url })) return;

    // 跳转其他应用
    window.location.href = `${window.location.origin}/${shellMenu.url}`;
  };

  handleMenuClick = ({ key }) => {
    const { menus, history } = this.props;
    const menu = menus.find(config => config.key === key);
    this.setState(prevState => ({
      ...prevState,
      funcMenuSelectedKey: menu.key,
    }));
    history.push({
      pathname: menu.url,
      search: qsStringify(menu.query),
    });
  };

  handleCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    const { classes, shellMenus, menus, title, userInfo } = this.props;
    const { collapsed, menuSelectedKey, funcMenuSelectedKey } = this.state;

    const userName = userInfo && userInfo.name ? userInfo.name : 'ADMIN';
    const userMenu = (
      <Menu onClick={this.handleUserMenuClick}>
        <Menu.Item key="logout">退出</Menu.Item>
      </Menu>
    );

    return (
      <Layout style={{ height: '100vh' }}>
        <Header className={classes.header}>
          <div className={classes.headerLeft}>
            <Logo
              classes={{
                root: classes.logo,
              }}
              title={title}
            />
            <Menu
              theme="dark"
              style={{ lineHeight: '64px' }}
              selectedKeys={[funcMenuSelectedKey]}
              mode="horizontal"
              onClick={this.handleMenuClick}
            >
              {menus.map(config => (
                <Menu.Item key={config.key}>
                  {config.icon && <Icon type={config.icon} />}
                  <span>{config.name}</span>
                </Menu.Item>
              ))}
            </Menu>
          </div>
          <div className={classes.headerRight}>
            <Dropdown overlay={userMenu} trigger={['click']}>
              <span>{userName}</span>
            </Dropdown>
          </div>
        </Header>
        <Layout>
          <Sider collapsible collapsed={collapsed} onCollapse={this.handleCollapse}>
            <div className="logo" />
            <Menu
              theme="dark"
              selectedKeys={[menuSelectedKey]}
              mode="inline"
              onClick={this.handleShellMenuClick}
            >
              {shellMenus.map(config => (
                <Menu.Item key={config.key}>
                  {config.icon && <Icon type={config.icon} />}
                  <span>{config.name}</span>
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
          <Content>
            <Switch>{generateRouteContent('', menus)}</Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

ShellFrame.propTypes = {
  classes: PropTypes.object.isRequired,
  // dataConfigs: PropTypes.object,
  // handleConfigs: PropTypes.object,
  history: PropTypes.object.isRequired,
  init: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  menus: PropTypes.array.isRequired,
  shellMenus: PropTypes.array.isRequired,
  title: PropTypes.string,
  userInfo: PropTypes.object,
  // match: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShellFrame);
