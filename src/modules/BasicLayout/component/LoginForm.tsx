import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
const FormItem = Form.Item;

interface Props {
  handleSubmit: Function;
  form: any;
}

function hasErrors(fieldsError: {}) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginForm extends Component<Props & FormComponentProps> {

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: {}, values: {}) => {
      if (!err) {
        this.props.handleSubmit(values);
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldsError } = this.props.form;
    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: '输入用户名!'
              }
            ]
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '输入密码!'
              }
            ]
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create<Props>()(LoginForm);