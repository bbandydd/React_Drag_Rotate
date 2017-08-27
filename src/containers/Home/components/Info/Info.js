import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, InputNumber } from 'antd';
import getOffsetPosition from 'utils/getOffsetPosition';

import './Info.less';

export default class Info extends Component {
  static propTypes = {
    index: PropTypes.number,
    data: PropTypes.object,
    onSetting: PropTypes.func,
    onClose: PropTypes.func,
    CANVAS_WIDTH: PropTypes.number,
    CANVAS_HEIGHT: PropTypes.number,
    scale: PropTypes.number,
  }

  constructor(props) {
    super(props);

    const {
      scale,
      data: { width, height },
    } = props;

    this.state = {
      BOX_WIDTH: width / scale,
      BOX_HEIGHT: height / scale,
    };
  }

  changeRotate = (index, rotate) => {
    const {
      onSetting, CANVAS_WIDTH, CANVAS_HEIGHT,
      data: { x, y },
    } = this.props;

    const { BOX_WIDTH, BOX_HEIGHT } = this.state;

    const BOX = {
      x,
      y,
      BOX_WIDTH,
      BOX_HEIGHT,
      rotate,
    };

    const newBox = getOffsetPosition(BOX, CANVAS_WIDTH, CANVAS_HEIGHT);

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
