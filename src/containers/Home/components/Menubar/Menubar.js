import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Layout, Button, Modal, Input, InputNumber } from 'antd';

import './Menubar.less';

const { Header } = Layout;

const DEFAULT_BOX = {
  rotate: 0,
  name: '',
  x: 0,
  y: 0,
  width: 1000,
  height: 1000,
  overlap: false,
};

@inject('boxStore')
@observer
export default class Menubar extends Component {
  static propTypes = {
    boxStore: PropTypes.object,
    onAdd: PropTypes.func,
  }

  @observable visible = false;
  @observable BOX = { ...DEFAULT_BOX };

  @action
  onSetting = (key, value) => {
    this.BOX[key] = value;
  }

  @action
  toggle = () => {
    this.visible = !this.visible;
    this.BOX = { ...DEFAULT_BOX };
  }

  handleAdd = () => {
    const {
      boxStore: { CANVAS, getOffsetPosition },
    } = this.props;

    const { rotate, name, x, y, width, height } = this.BOX;

    const BOX = {
      x,
      y,
      BOX_WIDTH: width / CANVAS.scale,
      BOX_HEIGHT: height / CANVAS.scale,
      rotate,
    };

    const newBOX = getOffsetPosition(BOX);

    this.props.onAdd({
      rotate,
      name,
      x: newBOX.x,
      y: newBOX.y,
      width,
      height,
    });

    this.toggle();
  }

  render() {
    const { rotate, name, x, y, width, height } = this.BOX;

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
          visible={this.visible}
          onOk={this.handleAdd}
          onCancel={this.toggle}
        >
          <div className="addContent">
            <div className="row">
              <div className="column">
                名稱：<Input onChange={e => this.onSetting('name', e.target.value)} value={name} />
              </div>
              <div className="column">
                旋轉角度：<InputNumber min={0} onChange={value => this.onSetting('rotate', value)} value={rotate} />
              </div>
            </div>
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
