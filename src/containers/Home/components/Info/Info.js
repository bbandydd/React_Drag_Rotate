import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Button, InputNumber } from 'antd';
import getOffsetPosition from 'utils/getOffsetPosition';

import './Info.less';

@inject('boxStore')
@observer
export default class Info extends Component {
  static propTypes = {
    boxStore: PropTypes.object,
    index: PropTypes.number,
    data: PropTypes.object,
    onSetting: PropTypes.func,
    onClose: PropTypes.func,
  }

  @observable BOX_WIDTH = 0;
  @observable BOX_HEIGHT = 0;

  @action
  componentDidMount() {
    const {
      boxStore: { CANVAS },
      data: { width, height },
    } = this.props;

    this.BOX_WIDTH = width / CANVAS.scale;
    this.BOX_HEIGHT = height / CANVAS.scale;
  }

  changeRotate = (index, rotate) => {
    const {
      onSetting,
      boxStore: { CANVAS },
      data: { x, y },
    } = this.props;

    const BOX = {
      x,
      y,
      BOX_WIDTH: this.BOX_WIDTH,
      BOX_HEIGHT: this.BOX_HEIGHT,
      rotate,
    };

    const newBox = getOffsetPosition(BOX, CANVAS.width, CANVAS.height);

    onSetting(index, 'rotate', rotate);
    onSetting(index, 'x', newBox.x);
    onSetting(index, 'y', newBox.y);
  }

  render() {
    const {
      index, onSetting, onClose,
      data: { rotate, x, y, width, height, name },
    } = this.props;

    return (
      <div className="info">
        <div className="header">
          <span>
            { name }
          </span>
          <Button
            shape="circle"
            icon="close"
            onClick={() => onClose(index)}
          />
        </div>
        <div>
          <p className="row">
            <span className="title">旋轉角度：</span>
            <InputNumber min={0} max={360} onChange={value => this.changeRotate(index, value)} value={rotate} />
          </p>
          <p className="row">
            <span className="title">X：</span>
            <InputNumber min={0} onChange={value => onSetting(index, 'x', value)} value={x} /></p>
          <p className="row">
            <span className="title">Y：</span>
            <InputNumber min={0} onChange={value => onSetting(index, 'y', value)} value={y} />
          </p>
          <p className="row">
            <span className="title">寬度：</span>
            { width }
          </p>
          <p className="row">
            <span className="title">高度：</span>
            { height }
          </p>
        </div>
      </div>
    );
  }
}
