import React, { Component } from 'react';
import { Popover, InputNumber } from 'antd';

export default class Box extends Component {
  state = {
    rotate: 0,
  }

  handleChange = (value) => {
    if (value === '') value = 0;

    this.setState({ rotate: value });
  }

  render() {
    const { rotate } = this.state;

    const content = (
      <div>
        旋轉角度：<InputNumber min="0" max="360" onChange={this.handleChange} value={rotate} />
      </div>
    );

    const style = {
      transform: `rotate(${rotate}deg)`
    };

    return (
      <div>
        <Popover content={content} title="設定">
          <div className="box" style={style}>
            旋轉角度：{rotate}
          </div>
        </Popover>
      </div>
    );
  }
}
