import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
// import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import Form from 'antd/lib/form';
import 'antd/lib/form/style';
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style';
import Input from 'antd/lib/input';
import 'antd/lib/input/style';
import Button from 'antd/lib/button';
import 'antd/lib/button/style';
import Checkbox from 'antd/lib/checkbox';
import 'antd/lib/checkbox/style';
import Row from 'antd/lib/row';
import 'antd/lib/row/style';
import Col from 'antd/lib/col';
import 'antd/lib/col/style';
import { connect } from '@ixinwu-ngp/web-core';
import { withStyles } from '@ixinwu-ngp/web-styles';
import styles from './styles';

const FormItem = Form.Item;

class Login extends Component {
  static propTypes = {
    classes: PropTypes.object,
    login: PropTypes.func.isRequired,
    logStatus: PropTypes.bool,
  };

  handleSubmit = e => {
    e.preventDefault();

    const { login } = this.props;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { userName, password } = values;
        login(userName, password || '');
      }
    });
  };

  render() {
    const { title, logStatus, classes } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <div className={classes.container}>
        <div className={classes.header}>
          <p className={classes.title}>{title}</p>
        </div>
        <div>
          <div className={classes.formContainer}>
            <Form onSubmit={this.handleSubmit} className={classes.from}>
              <FormItem>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: '请输入用户名!' }],
                  initialValue: Cookies.get('userName'),
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                    size="large"
                  />,
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  // rules: [{ required: true, message: '请输入密码!' }],
                  initialValue: '',
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                    size="large"
                  />,
                )}
              </FormItem>
              <Row className={classes.formItem}>
                <Col span={12}>
                  {getFieldDecorator('autoLogin', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(<Checkbox>自动登录</Checkbox>)}
                </Col>
                <Col span={12} className={classes.forgetPassword}>
                  <a href="/#">忘记密码</a>
                </Col>
              </Row>
              <FormItem>
                <Button
                  disabled={logStatus}
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className={classes.loginButton}
                >
                  {logStatus ? '登录中...' : '登录'}
                </Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  logStatus: state[ownProps.identity].logStatus,
  apiConfig: state.apiConfig,
});

export default connect(mapStateToProps)(Form.create()(withStyles(styles)(Login)));
