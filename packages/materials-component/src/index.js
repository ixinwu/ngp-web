import loadable from '@loadable/component';

export const CssBaseLine = loadable(() =>
  import(/* webpackChunkName: "css_base_line" */ './css_base_line'),
);
export const Error = loadable(() => import(/* webpackChunkName: "error" */ './error'));
export const Loading = loadable(() => import(/* webpackChunkName: "loading" */ './loading'));
export const DateFormat = loadable(() =>
  import(/* webpackChunkName: "datetime_format" */ './datetime_format'),
);
export const NumberFormat = loadable(() =>
  import(/* webpackChunkName: "number_format" */ './number_format'),
);
export const TextFormat = loadable(() =>
  import(/* webpackChunkName: "text_format" */ './text_format'),
);
export const TypeFormat = loadable(() =>
  import(/* webpackChunkName: "type_format" */ './type_format'),
);
export const NumberRangePicker = loadable(() =>
  import(/* webpackChunkName: "number_range_picker" */ './number_range_picker'),
);
export const FieldDisplay = loadable(() =>
  import(/* webpackChunkName: "field_display" */ './field_display'),
);
export const FieldForm = loadable(() =>
  import(/* webpackChunkName: "field_form" */ './field_form'),
);
export const FieldGrid = loadable(() =>
  import(/* webpackChunkName: "field_grid" */ './field_grid'),
);
export const ListSearch = loadable(() =>
  import(/* webpackChunkName: "list_search" */ './list_search'),
);
export const ListTable = loadable(() =>
  import(/* webpackChunkName: "list_table" */ './list_table'),
);
