import aaaList from './aaa_list/bundle';
import aaaListConfig from './aaa_list/bundle.config';
import aaaAdd from './aaa_add/bundle';
import aaaAddConfig from './aaa_add/bundle.config';
import aaaDetail from './aaa_detail/bundle';
import aaaDetailConfig from './aaa_detail/bundle.config';
import aaaEdit from './aaa_edit/bundle';
import aaaEditConfig from './aaa_edit/bundle.config';
import test from './test/bundle';

const createMockGetPageConfig = config => pageKey => {
  console.log(`获取[[${pageKey}]]的页面配置`);

  return new Promise(resolve =>
    resolve({
      ...config,
      routes: (config.routes || []).map(item => ({
        ...item,
        id: item.key,
        pageKey: item.pageKey || item.key,
      })),
    }),
  );
};

export const pageBundleLoaders = {
  aaa_list: aaaList,
  aaa_add: aaaAdd,
  aaa_detail: aaaDetail,
  aaa_edit: aaaEdit,
  test,
};

export const pageConfigLoaders = {
  aaa_list: createMockGetPageConfig(aaaListConfig),
  aaa_add: createMockGetPageConfig(aaaAddConfig),
  aaa_detail: createMockGetPageConfig(aaaDetailConfig),
  aaa_edit: createMockGetPageConfig(aaaEditConfig),
};
