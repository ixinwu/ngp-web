import React, { Component } from 'react';
import debounce from 'debounce';
import { Select, message } from 'antd';
import withStyles from '@ixinwu-ngp/materials-component/styles/with_styles';
import { fetchGetDataSetListData } from '../services';

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: 32,
  },
  selector: {
    flex: '1 1 auto',
  },
  seperator: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 3px',
  },
};

const { Option } = Select;

const generateSelectors = (field, data) => {
  let selectors = [];
  const config = { ...field.config };
  const selector = {
    key: field.key,
    field,
    value: {
      key: data[config.primaryFieldKey] || '',
      label: data[config.nameFieldKey] || '',
    },
    items: [],
    loading: false,
  };

  selector.config = config;
  selectors.push(selector);

  const fields = config.fields || [];

  fields.forEach(field => {
    if (field.config) {
      selectors = selectors.concat(generateSelectors(field, data));
    }
  });

  return selectors.reverse();
};

class ObjectCascader extends Component {
  static getDerivedStateFromProps(props, state) {
    if (props.field !== state.field || props.data !== state.data) {
      const newSelectors = generateSelectors(props.field || {}, props.data || {});
      const oldSelectors = state.selectors;

      let changed = false;

      // 判断外部属性是否变化
      newSelectors.forEach(newSelector => {
        const oldSelector = oldSelectors.find(selector => selector.key === newSelector.key);

        if (!oldSelector) {
          changed = true;
        }

        if (oldSelector) {
          if (
            oldSelector.value.key !== newSelector.value.key ||
            oldSelector.value.label !== newSelector.value.label
          ) {
            changed = true;
          }
        }
      });

      if (changed) {
        return {
          field: props.field,
          data: props.data,
          selectors: newSelectors,
        };
      }
      return {
        data: props.data,
        selectors: newSelectors,
      };
    }

    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      field: props.field,
      data: props.data,
      selectors: generateSelectors(props.field || {}, props.data || {}),
    };

    this.handleSearch = debounce(this.handleSearch, 500);
  }

  getSelectorItems = (selectorKey, params) => {
    const { selectors } = this.state;

    const index = selectors.findIndex(selector => selector.key === selectorKey);
    const selector = selectors[index];
    this.setState(prevState => ({
      ...prevState,
      selectors: prevState.selectors.map(selector => {
        if (selector.key === selectorKey) {
          return {
            ...selector,
            loading: true,
          };
        }
        return selector;
      }),
    }));

    fetchGetDataSetListData(selector.config.dataSetKey, params, selector.config.fields)
      .then(data => {
        const list = data.list || [];
        this.setState(prevState => ({
          ...prevState,
          selectors: prevState.selectors.map(selector => {
            if (selector.key === selectorKey) {
              return {
                ...selector,
                items: list.map(item => ({
                  key: item[selector.config.primaryFieldKey],
                  label: item[selector.config.nameFieldKey],
                })),
                loading: false,
                dataFetched: true,
              };
            }
            return selector;
          }),
        }));
      })
      .catch(e => {
        message.error(e.message || '数据获取失败！');
      });
  };

  handleFocus = selectorKey => {
    const { selectors } = this.state;

    const index = selectors.findIndex(selector => selector.key === selectorKey);
    const selector = selectors[index];

    let prevSelector;
    if (index > 0) {
      prevSelector = selectors[index - 1];
    }

    if (!selector.dataFetched) {
      const params = {
        pageNumber: 1,
        pageSize: 20,
      };
      if (prevSelector) {
        if (!prevSelector.value || !prevSelector.value.key) {
          message.warning('请先选择上级对象');
          return;
        }
        params[selector.field.key] = prevSelector.value.key;
      }

      this.getSelectorItems(selectorKey, params);
    }
  };

  handleSearch = (selectorKey, searchValue) => {
    const { selectors } = this.state;

    const index = selectors.findIndex(selector => selector.key === selectorKey);
    const selector = selectors[index];

    let prevSelector;
    if (index > 0) {
      prevSelector = selectors[index - 1];
    }

    const params = {
      pageNumber: 1,
      pageSize: 20,
      [selector.config.nameFieldKey]: searchValue,
    };
    if (prevSelector) {
      if (!prevSelector.value || !prevSelector.value.key) {
        message.warning('请先选择上级对象');
        return;
      }
      params[selector.field.key] = prevSelector.value.key;
    }

    this.getSelectorItems(selectorKey, params);
  };

  handleChange = (selectorKey, value) => {
    const { onChange } = this.props;
    const { selectors } = this.state;
    const index = selectors.findIndex(selector => selector.key === selectorKey);

    if (index < selectors.length - 1) {
      if (onChange) {
        onChange(undefined);
      }
      this.setState(prevState => ({
        ...prevState,
        selectors: prevState.selectors.map((selector, idx) => {
          if (index === idx) {
            return {
              ...selector,
              value: {
                ...value,
              },
            };
          }
          if (index < idx) {
            return {
              ...selector,
              items: [],
              value: {
                key: '',
                label: '',
              },
              dataFetched: false,
            };
          }

          return selector;
        }),
      }));
    } else {
      if (onChange) {
        onChange(value.key ? value.key : undefined);
      }
      this.setState(prevState => ({
        ...prevState,
        selectors: prevState.selectors.map(selector => {
          if (selector.key === selectorKey) {
            return {
              ...selector,
              value: {
                ...value,
              },
            };
          }
          return selector;
        }),
      }));
    }
  };

  render() {
    const { classes } = this.props;
    const { selectors } = this.state;
    return (
      <div className={classes.container}>
        {selectors.map((selector, index) => {
          if (index === selectors.length - 1) {
            return (
              <div key={selector.key} className={classes.selector}>
                <Select
                  allowClear
                  showSearch
                  labelInValue
                  filterOption={false}
                  value={selector.value}
                  loading={selector.loading}
                  onFocus={() => this.handleFocus(selector.key)}
                  onSearch={value => this.handleSearch(selector.key, value)}
                  onChange={value => this.handleChange(selector.key, value)}
                >
                  {selector.items.map(item => (
                    <Option key={item.key} value={item.key}>
                      {item.label}
                    </Option>
                  ))}
                </Select>
              </div>
            );
          }

          return (
            <React.Fragment key={selector.key}>
              <div className={classes.selector}>
                <Select
                  allowClear
                  showSearch
                  labelInValue
                  filterOption={false}
                  loading={selector.loading}
                  value={selector.value}
                  onFocus={() => this.handleFocus(selector.key)}
                  onSearch={value => this.handleSearch(selector.key, value)}
                  onChange={value => this.handleChange(selector.key, value)}
                >
                  {selector.items.map(item => (
                    <Option key={item.key} value={item.key}>
                      {item.label}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className={classes.seperator}>-</div>
            </React.Fragment>
          );
        })}
      </div>
    );
  }
}

export default withStyles(styles)(ObjectCascader);
