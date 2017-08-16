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
        <div className="title">
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
          <p>旋轉角度： <InputNumber min={0} max={360} onChange={value => onSetting(index, 'rotate', value)} value={rotate} /></p>
          <p>X： <InputNumber min={0} onChange={value => onSetting(index, 'x', value)} value={x} /></p>
          <p>Y： <InputNumber min={0} onChange={value => onSetting(index, 'y', value)} value={y} /></p>
          <p>寬度： { width }</p>
          <p>高度： { height }</p>
        </div>
      </div>
    );
  }
}
