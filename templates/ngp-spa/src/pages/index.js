import aaaList from './aaa_list/bundle';
import aaaListConfig from './aaa_list/bundle.config';
import aaaAdd from './aaa_add/bundle';
import aaaAddConfig from './aaa_add/bundle.config';
import aaaDetail from './aaa_detail/bundle';
import aaaDetailConfig from './aaa_detail/bundle.config';
import aaaEdit from './aaa_edit/bundle';
import aaaEditConfig from './aaa_edit/bundle.config';
import recordList from './record_list/bundle';
import recordListConfig from './record_list/bundle.config';
import recordAdd from './record_add/bundle';
import recordAddConfig from './record_add/bundle.config';
import recordDetail from './record_detail/bundle';
import recordDetailConfig from './record_detail/bundle.config';
import recordEdit from './record_edit/bundle';
import recordEditConfig from './record_edit/bundle.config';
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
  record_list: recordList,
  record_add: recordAdd,
  record_detail: recordDetail,
  record_edit: recordEdit,
  test,
};

export const pageConfigLoaders = {
  aaa_list: createMockGetPageConfig(aaaListConfig),
  aaa_add: createMockGetPageConfig(aaaAddConfig),
  aaa_detail: createMockGetPageConfig(aaaDetailConfig),
  aaa_edit: createMockGetPageConfig(aaaEditConfig),
  record_list: createMockGetPageConfig(recordListConfig),
  record_add: createMockGetPageConfig(recordAddConfig),
  record_detail: createMockGetPageConfig(recordDetailConfig),
  record_edit: createMockGetPageConfig(recordEditConfig),
};
