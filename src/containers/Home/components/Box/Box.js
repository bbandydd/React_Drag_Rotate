import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popover, InputNumber } from 'antd';

import './Box.less';

export default class Box extends Component {
  static propTypes = {
    index: PropTypes.number,
    data: PropTypes.object,
    scale: PropTypes.object,
    onSetting: PropTypes.func,
  }

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  }

  render() {
    const {
      index, onSetting, scale,
      data: { rotate, width, height, x, y },
    } = this.props;

    const content = (
      <div>
        <div>
          旋轉角度： <InputNumber min={0} max={360} onChange={value => onSetting(index, 'rotate', value)} value={rotate} />
        </div>
        <div>
          X: <InputNumber min={0} onChange={value => onSetting(index, 'x', value)} value={x} />
        </div>
        <div>
          Y: <InputNumber min={0} onChange={value => onSetting(index, 'y', value)} value={y} />
        </div>
        <div>寬度： {width}</div>
        <div>高度： {height}</div>
      </div>
    );

    const style = {
      transform: `rotate(${rotate}deg)`,
      width: `${width / scale}px`,
      height: `${height / scale}px`
    };

    return (
      <div className="box">
        <Popover content={content} title="設定">
          <div className="content" style={style}>
            { index + 1 }
          </div>
        </Popover>
      </div>
    );
  }
}
