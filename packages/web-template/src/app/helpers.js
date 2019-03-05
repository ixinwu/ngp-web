import { matchPath } from 'react-router';

export const generateRouteConfigs = menus => {
  const routes = [];

  menus
    .filter(menu => menu.url)
    .forEach(config => {
      if (!routes.find(route => route.url === config.url)) {
        routes.push(config);
      }
    });

  return routes;
};

export function findMenuByPathname(menus, pathname) {
  const activeMenu = menus.find(menu => menu.url && matchPath(pathname, { path: `${menu.url}` }));
  return activeMenu;
}
