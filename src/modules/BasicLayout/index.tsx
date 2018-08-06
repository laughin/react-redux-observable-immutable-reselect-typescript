import React, { PureComponent, ReactNode } from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch, Action } from 'redux';
import { Layout, Menu, Breadcrumb, Icon, Modal } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
import { createStructuredSelector } from 'reselect';

import './index.css';
import LoginForm from './component/LoginForm';
import { loginActions } from './actions';
import reducer from './reducer';
import injectReducer from '../../utils/injectReducer';
import { ILoginForm, ILoginUser } from './model';
import { selectLoginUser, selectLoading } from './selector';
import { injectEpics } from '../../store';
import basicEpics from './epics';

interface BasicProps {
  loginForm: (loginForm: ILoginForm) => void;
  loginUser: ILoginUser;
  loading: boolean;
}

class BasicLayout extends PureComponent<BasicProps> {

  state = {
    visible: true,
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  showModal = () => {
    this.setState({ visible: true });
  }

  handleSubmit = (loginForm: ILoginForm) => {
    this.props.loginForm(loginForm);
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.loginUser && nextProps.loginUser.login === 'laughin') {
      this.handleCancel();
    }
  }

  render(): ReactNode {
    return (
      <div>
        <Modal
          width={300}
          key={Math.random()}
          title="登录"
          visible={this.state.visible}
          footer={null}
          closable={false}
          maskClosable={false}
        >
          <LoginForm handleSubmit={this.handleSubmit} />
        </Modal>
        <Layout>
          <Sider
            trigger={null}
            collapsible={true}
            collapsed={this.state.collapsed}
          >
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1">
                <Icon type="pie-chart" />
                <span>Option 1</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="desktop" />
                <span>Option 2</span>
              </Menu.Item>
              <SubMenu
                key="sub1"
                title={<span><Icon type="user" /><span>User</span></span>}
              >
                <Menu.Item key="3">Tom</Menu.Item>
                <Menu.Item key="4">Bill</Menu.Item>
                <Menu.Item key="5">Alex</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={<span><Icon type="team" /><span>Team</span></span>}
              >
                <Menu.Item key="6">Team 1</Menu.Item>
                <Menu.Item key="8">Team 2</Menu.Item>
              </SubMenu>
              <Menu.Item key="9">
                <Icon type="file" />
                <span>File</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
              <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                Content
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                Copyright <Icon type="copyright" /> 2017 互爱科技出品
              </Footer>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}

injectEpics('basic', basicEpics);

const mapStateToProps = () => createStructuredSelector({
  loginUser: selectLoginUser(),
  loading: selectLoading(),
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  loginForm: (loginForm: ILoginForm) => dispatch(loginActions.login(loginForm))
});

function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
  return Object.assign({}, ownProps, stateProps, dispatchProps);
}

const withReducer = injectReducer({ key: 'basic', reducer });
const withConnect = connect(mapStateToProps, mapDispatchToProps, mergeProps);

export default compose(withReducer, withConnect)(BasicLayout);
