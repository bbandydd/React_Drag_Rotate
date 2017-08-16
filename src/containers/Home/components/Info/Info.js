import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, InputNumber } from 'antd';

import './Info.less';

export default class Info extends Component {
  static propTypes = {
    index: PropTypes.number,
    data: PropTypes.object,
    onSetting: PropTypes.func,
    onClose: PropTypes.func,
  }

  render() {
    const {
      index, onSetting, onClose,
      data: { rotate, x, y, width, height, },
    } = this.props;

    return (
      <div className="info">
        <div className="header">
          <span>
            { index + 1 }
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
            <InputNumber min={0} max={360} onChange={value => onSetting(index, 'rotate', value)} value={rotate} />
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
