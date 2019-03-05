import React, { Component } from 'react';
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

class Nav extends Component {
  constructor(props) {
    super(props);

    this.generateMenu = this.generateMenu.bind(this);
    this.generateChildMenu = this.generateChildMenu.bind(this);
  }

  /**
   * 生成第一级菜单，需要处理样式
   *
   * @param {any} menu
   * @returns
   *
   * @memberof Nav
   */
  generateMenu(menu) {
    if (menu.children && menu.children.length > 0) {
      return (
        <SubMenu
          key={menu.id}
          title={
            <span>
              <Icon type={menu.icon} />
              <span>{menu.name}</span>
            </span>
          }
        >
          {menu.children.map(this.generateChildMenu)}
        </SubMenu>
      );
    }

    return (
      <Menu.Item key={menu.id}>
        <span>
          <Icon type={menu.icon} />
          <span>{menu.name}</span>
        </span>
      </Menu.Item>
    );
  }

  /**
   * 生成子级菜单
   *
   * @param {any} menu
   * @returns
   *
   * @memberof Nav
   */
  generateChildMenu(menu) {
    if (menu.children && menu.children.length > 0) {
      return (
        <SubMenu
          key={menu.id}
          title={
            <span>
              <Icon type={menu.icon} />
              <span>{menu.name}</span>
            </span>
          }
          disabled={menu.disabled}
        >
          {menu.children.map(this.generateChildMenu)}
        </SubMenu>
      );
    }

    return (
      <Menu.Item key={menu.id} disabled={menu.disabled}>
        <span>
          <Icon type={menu.icon} />
          <span>{menu.name}</span>
        </span>
      </Menu.Item>
    );
  }

  render() {
    const { classes, menus, ...rest } = this.props;
    return (
      <Menu theme="dark" mode="inline" {...rest}>
        {menus.map(this.generateMenu)}
      </Menu>
    );
  }
}

export default Nav;
