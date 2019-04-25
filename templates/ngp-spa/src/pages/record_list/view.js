import React, { Component } from 'react';
import { qsStringify } from '@ixinwu-ngp/web-framework';
import { withStyles } from '@ixinwu-ngp/web-styles';
import debounce from 'debounce';
import { Button } from 'antd';
import { ListSearch, ListTable } from '@ixinwu-ngp/materials-component';
import styles from './styles';

class AaaList extends Component {
  constructor(props) {
    super(props);

    // 搜索节流，默认800毫秒间隔
    this.handleSearch = debounce(this.handleSearch, 800);
  }

  componentDidMount() {
    const { initPage } = this.props;

    initPage();
  }

  handleSearch = values => {
    const { params, paramsChange } = this.props;
    paramsChange({
      ...params,
      ...values,
    });
  };

  handleTableChange = ({ current, pageSize }, filters, { field, order }) => {
    const { params, paramsChange } = this.props;
    paramsChange({
      ...params,
      pageNumber: current,
      pageSize,
      sortField: field,
      sortDirection: order === 'ascend' ? 'asc' : 'desc',
    });
  };

  onTableSelectChange = selectedPrimaryKeys => {
    this.props.setSelectedPrimaryKeys(selectedPrimaryKeys);
  };

  handleAdd = () => {
    const { history, pagePath } = this.props;
    history.push({
      pathname: `${pagePath}/aaa_add`,
    });
  };

  handleEdit = record => {
    const { history, pagePath } = this.props;
    history.push({
      pathname: `${pagePath}/aaa_edit`,
      search: qsStringify({ aaaId: record.aaa__id }),
    });
  };

  handleDelete = record => {
    this.props.deleteData([record.aaa__id]);
  };

  handleCellClick = (field, value, record) => {
    const { history, pagePath } = this.props;
    if (field.key === 'aaa__name') {
      history.push({
        pathname: `${pagePath}/aaa_detail`,
        search: qsStringify({ aaaId: record.aaa__id }),
      });
    }
  };

  handleBatchDelete = () => {
    const { selectedPrimaryKeys } = this.props;
    this.props.deleteData(selectedPrimaryKeys);
  };

  render() {
    const {
      classes,
      title,
      primaryFieldKey,
      params,
      fields: fieldConfigs,
      data: { count, data },
      dataLoading,
      selectedPrimaryKeys,
    } = this.props;

    const { pageNumber, pageSize } = params;
    // 为大小分类（枚举）字段绑定选择数据
    const fields = fieldConfigs.map(fieldConfig => {
      if (fieldConfig.displayType === 'groupType') {
        return {
          ...fieldConfig,
          types: this.props[fieldConfig.groupKey] || [],
        };
      }
      return fieldConfig;
    });

    const searchFields = [
      ...fields,
      {
        key: 'fuzzySearch',
        searchable: true,
        text: '模糊搜索',
        placeholder: '模糊搜索',
      },
    ];

    const tableFields = [
      ...fields,
      {
        key: 'op',
        text: '操作',
        visible: true,
        render: (value, record) => (
          <span className={classes.operateColumn}>
            <span className={classes.op} onClick={() => this.handleEdit(record)}>
              编辑
            </span>
            <span className={classes.op} onClick={() => this.handleDelete(record)}>
              删除
            </span>
          </span>
        ),
      },
    ];

    return (
      <div className={classes.container}>
        <div className={classes.header}>{title}</div>
        <div className={classes.body}>
          <div className={classes.section}>
            <ListSearch data={params} fields={searchFields} onChange={this.handleSearch} />
          </div>
          <div className={classes.section}>
            <div className={classes.sectionHeader}>
              <Button type="primary" onClick={this.handleAdd}>
                新建
              </Button>
              <Button onClick={this.handleBatchDelete}>删除</Button>
            </div>
            <div className={classes.sectionBody}>
              <ListTable
                rowKey={primaryFieldKey}
                loading={dataLoading}
                locale={{
                  emptyText: '暂无数据',
                }}
                pagination={{
                  current: pageNumber,
                  pageSize,
                  total: count,
                }}
                rowSelection={{
                  selectedRowKeys: selectedPrimaryKeys,
                  onChange: this.onTableSelectChange,
                }}
                onChange={this.handleTableChange}
                fields={tableFields}
                onCellClick={this.handleCellClick}
                dataSource={data}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AaaList);
