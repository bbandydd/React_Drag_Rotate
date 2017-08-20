import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popover } from 'antd';
import Draggable from 'react-draggable';

import './Box.less';

export default class Box extends Component {
  static propTypes = {
    index: PropTypes.number,
    data: PropTypes.object,
    scale: PropTypes.object,
    onSetting: PropTypes.func,
    CANVAS_WIDTH: PropTypes.number,
    CANVAS_HEIGHT: PropTypes.number,
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

  onControlledDrag = (e, position, index) => {
    const {
      CANVAS_WIDTH, CANVAS_HEIGHT,
    } = this.props;

    const { BOX_WIDTH, BOX_HEIGHT } = this.state;

    const BOX = {
      x: position.x,
      y: position.y,
    };

    // 防止超出左方邊線
    if (BOX.x < 0) BOX.x = 0;

    // 防止超出上方邊線
    if (BOX.y < 0) BOX.y = 0;

    // 防止超出右方邊線
    if (BOX.x + BOX_WIDTH > CANVAS_WIDTH) BOX.x = CANVAS_WIDTH - BOX_WIDTH;

    // 防止超出下方邊線
    if (BOX.y + BOX_HEIGHT > CANVAS_HEIGHT) BOX.y = CANVAS_HEIGHT - BOX_HEIGHT;

    this.props.onSetting(index, 'x', BOX.x);
    this.props.onSetting(index, 'y', BOX.y);

    // 旋轉公式 以中心點為圓心，逆時針旋轉
    // x' = cos * x - sin * y
    // 中心點x + Math.round(Math.cos(90 / 180 * Math.PI) * 100) / 100 * 50 - Math.round(Math.sin(90 / 180 * Math.PI) * 100) / 100 * 50
    // y' = sin * x + cos * y
    // 中心點y + Math.round(Math.sin(90 / 180 * Math.PI) * 100) / 100 * 50 + Math.round(Math.cos(90 / 180 * Math.PI) * 100) / 100 * 50
  }

  render() {
    const {
      index, scale,
      data: { rotate, width, height, name, x, y },
    } = this.props;

    const { BOX_WIDTH, BOX_HEIGHT } = this.state;

    const style = {
      transform: `translate(${x}px, ${y}px) rotate(${rotate * -1}deg)`,
      width: `${width / scale}px`,
      height: `${height / scale}px`,
      position: 'absolute',
    };

    const content1 = `(${x}, ${y})`;
    const content2 = `(${x + BOX_WIDTH}, ${y})`;
    const content3 = `(${x}, ${y + BOX_HEIGHT})`;
    const content4 = `(${x + BOX_WIDTH}, ${y + BOX_HEIGHT})`;

    return (
      <Draggable
        bounds="parent"
        onDrag={(e, position) => this.onControlledDrag(e, position, index)}
        position={{ x, y }}
      >
        <span>
          <div className="box" style={style}>
            <Popover content={content1} trigger="hover">
              <div className="pop position1" />
            </Popover>
            <Popover content={content2} trigger="hover">
              <div className="pop position2" />
            </Popover>
            <Popover content={content3} trigger="hover">
              <div className="pop position3" />
            </Popover>
            <Popover content={content4} trigger="hover">
              <div className="pop position4" />
            </Popover>
            <span>{name}</span>
          </div>
        </span>
      </Draggable>
    );
  }
}
