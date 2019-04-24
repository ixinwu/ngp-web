import Cookies from 'js-cookie';
import { call, delay, modify } from '@ixinwu-ngp/web-core';
import ngp from '@ixinwu-ngp/web-framework';
import { treeToList } from '../lib/utils';
import { generateRouteConfigs, findMenuByPathname } from './helpers';
import { fetchGetCurrentUserInfo } from '../services/auth';

const setStatus = (setters, identity, value) => setters[identity].status(value);
const setStatusTip = (setters, identity, value) => setters[identity].statusTip(value);
const setChildRouteConfigs = (setters, identity, value) =>
  setters[identity].childRouteConfigs(value);
const setSelectedMenuIds = (setters, identity, value) => setters[identity].selectedMenuIds(value);
const setOpenMenuIds = (setters, identity, value) => setters[identity].openMenuIds(value);

export function* initApp(props) {
  const { identity, history, location, menus } = props;
  try {
    // 检查token
    const token = Cookies.get('token');
    if (!token) {
      window.location.href = `${window.location.origin}/login.html`;
    }
    ngp.apiService.setToken(token);
    // 开始应用初始化
    yield modify(setStatusTip, identity, '应用初始化开始');

    const flatMenus = treeToList(menus);
    // 获取应用子级路由配置
    const childRouteConfigs = generateRouteConfigs(flatMenus);
    yield modify(setChildRouteConfigs, identity, childRouteConfigs);
    yield modify(setStatusTip, identity, '路由配置加载完成');

    // 处理默认加载页面
    if (childRouteConfigs.length > 0 && location.pathname === '/') {
      const menu = flatMenus.find(item => item.url);

      if (menu) {
        yield modify(setSelectedMenuIds, identity, [menu.id]);
        if (menu.parentId) {
          const parentMenu = flatMenus.find(item => item.id === menu.parentId);
          if (parentMenu) {
            yield modify(setOpenMenuIds, identity, [parentMenu.id]);
          }
        }
        history.push(`${menu.url}`);
      }
    } else {
      const menu = findMenuByPathname(flatMenus, location.pathname);
      if (menu) {
        yield modify(setSelectedMenuIds, identity, [menu.id]);
        if (menu.parentId) {
          const parentMenu = flatMenus.find(item => item.id === menu.parentId);
          if (parentMenu) {
            yield modify(setOpenMenuIds, identity, [parentMenu.id]);
          }
        }
      }
    }

    yield call(delay, 200);

    // 完成应用初始化
    yield modify(setStatusTip, identity, '应用初始化完成');
    yield modify(setStatus, identity, 'success');

    const user = yield call(fetchGetCurrentUserInfo);

    return {
      user,
    };
  } catch (e) {
    yield modify(setStatus, identity, 'error');
    yield modify(setStatusTip, identity, '应用初始化失败');
    console.error(e);
  }
}

export function* menuSelect({ identity }, selectedMenuIds) {
  yield modify(setSelectedMenuIds, identity, selectedMenuIds);
}

export function* menuOpen({ identity }, openMenuIds) {
  yield modify(setOpenMenuIds, identity, openMenuIds);
}
export function menuClick({ menus, history }, menuId) {
  const flatMenus = treeToList(menus);
  const menu = flatMenus.find(item => item.id === menuId);
  history.push(`${menu.url}`);
}

export function logout() {
  Cookies.remove('token');
  ngp.apiService.setToken(null);
  window.location.href = `${window.location.origin}/login.html`;
}
