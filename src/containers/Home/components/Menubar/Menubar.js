import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Button, Modal, InputNumber } from 'antd';

import './Menubar.less';

const { Header } = Layout;

const DEFAULT_BOX = {
  rotate: 0,
  x: 0,
  y: 0,
  width: 1000,
  height: 1000,
};

export default class Menubar extends Component {
  static propTypes = {
    onAdd: PropTypes.func,
  }

  state = {
    visible: false,
    ...DEFAULT_BOX,
  }

  onSetting = (key, value) => {
    this.setState({
      [key]: value,
    });
  }

  toggle = () => {
    this.setState({
      visible: !this.state.visible,
      ...DEFAULT_BOX,
    });
  }

  handleAdd = () => {
    const { rotate, x, y, width, height } = this.state;

    this.props.onAdd({
      rotate,
      x,
      y,
      width,
      height,
    });

    this.toggle();
  }

  render() {
    const { x, y, width, height } = this.state;

    return (
      <div className="menubar">
        <Header>
          <Button
            shape="circle"
            icon="plus"
            size="large"
            onClick={this.toggle}
          />
        </Header>
        <Modal
          title="新增"
          okText="確定"
          cancelText="取消"
          visible={this.state.visible}
          onOk={this.handleAdd}
          onCancel={this.toggle}
        >
          <div className="addContent">
            <div className="row">
              <div className="column">
                X：<InputNumber min={0} onChange={value => this.onSetting('x', value)} value={x} />
              </div>
              <div className="column">
                Y：<InputNumber min={0} onChange={value => this.onSetting('y', value)} value={y} />
              </div>
            </div>
            <div className="row">
              <div className="column">
                寬度：<InputNumber min={1} onChange={value => this.onSetting('width', value)} value={width} />
              </div>
              <div className="column">
                高度：<InputNumber min={1} onChange={value => this.onSetting('height', value)} value={height} />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
