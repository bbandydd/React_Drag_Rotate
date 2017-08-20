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
    this.props.onSetting(index, 'x', position.x);
    this.props.onSetting(index, 'y', position.y);
  }

  onControlledStop = (e, position, index) => {
    const {
      CANVAS_WIDTH, CANVAS_HEIGHT,
    } = this.props;

    const { BOX_WIDTH, BOX_HEIGHT } = this.state;

    const BOX = {
      x: position.x,
      y: position.y,
    };

    const position1 = this.getActualPosition(1);
    const position2 = this.getActualPosition(2);
    const position3 = this.getActualPosition(3);
    const position4 = this.getActualPosition(4);

    const MIN = {
      x: Math.min(position1.x, position2.x, position3.x, position4.x),
      y: Math.min(position1.y, position2.y, position3.y, position4.y)
    };

    const MAX = {
      x: Math.max(position1.x, position2.x, position3.x, position4.x),
      y: Math.max(position1.y, position2.y, position3.y, position4.y)
    };

    // 防止超出左方邊線
    if (MIN.x < 0) BOX.x = Math.abs(MIN.x);

    // 防止超出上方邊線
    if (MIN.y < 0) BOX.y = Math.abs(MIN.y);

    // 防止超出右方邊線
    if (MAX.x > CANVAS_WIDTH) BOX.x -= MAX.x - CANVAS_WIDTH;

    // 防止超出下方邊線
    if (MAX.y > CANVAS_HEIGHT) BOX.y -= MAX.y - CANVAS_HEIGHT;

    this.props.onSetting(index, 'x', BOX.x);
    this.props.onSetting(index, 'y', BOX.y);
  }

  /**
   * 旋轉公式 以中心點為圓心，逆時針旋轉
   * x' = cos * x - sin * y
   * y' = sin * x + cos * y
   */
  getActualPosition = (POSITION) => {
    const {
      data: { rotate, x, y }
    } = this.props;

    const { BOX_WIDTH, BOX_HEIGHT } = this.state;

    // 以中心點為圓心計算旋轉角度
    const CENTER_POSITION = {
      x: x + (BOX_WIDTH / 2),
      y: y + (BOX_HEIGHT / 2),
    };

    // 以中心點為圓心，計算原座標於新圓心的座標
    let NEW_POSITION;

    if (POSITION === 1) { // 左上
      NEW_POSITION = {
        x: x - CENTER_POSITION.x,
        y: y - CENTER_POSITION.y,
      };
    } else if (POSITION === 2) { // 右上
      NEW_POSITION = {
        x: CENTER_POSITION.x - x,
        y: y - CENTER_POSITION.y,
      };
    } else if (POSITION === 3) { // 左下
      NEW_POSITION = {
        x: x - CENTER_POSITION.x,
        y: CENTER_POSITION.y - y,
      };
    } else if (POSITION === 4) { // 右下
      NEW_POSITION = {
        x: CENTER_POSITION.x - x,
        y: CENTER_POSITION.y - y,
      };
    }

    const cos = deg => Math.round(Math.cos((deg / 180) * Math.PI) * 100) / 100;
    const sin = deg => Math.round(Math.sin((deg / 180) * Math.PI) * 100) / 100;

    // 套用旋轉公式計算
    const ROTATE_POSITION = {
      x: (cos(rotate) * NEW_POSITION.x) - (sin(rotate) * NEW_POSITION.y),
      y: (sin(rotate) * NEW_POSITION.x) + (cos(rotate) * NEW_POSITION.y),
    };

    return {
      x: Math.ceil(CENTER_POSITION.x + ROTATE_POSITION.x),
      y: Math.ceil(CENTER_POSITION.y + ROTATE_POSITION.y),
    };
  }

  render() {
    const {
      index,
      data: { rotate, name, x, y },
    } = this.props;

    const { BOX_WIDTH, BOX_HEIGHT } = this.state;

    const style = {
      transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
      width: `${BOX_WIDTH}px`,
      height: `${BOX_HEIGHT}px`,
      position: 'absolute',
    };

    const content1 = () => {
      const position = this.getActualPosition(1);
      return `(${position.x}, ${position.y})`;
    };
    const content2 = () => {
      const position = this.getActualPosition(2);
      return `(${position.x}, ${position.y})`;
    };
    const content3 = () => {
      const position = this.getActualPosition(3);
      return `(${position.x}, ${position.y})`;
    };
    const content4 = () => {
      const position = this.getActualPosition(4);
      return `(${position.x}, ${position.y})`;
    };

    return (
      <Draggable
        bounds="parent"
        onDrag={(e, position) => this.onControlledDrag(e, position, index)}
        onStop={(e, position) => this.onControlledStop(e, position, index)}
        position={{ x, y }}
      >
        <span>
          <div className="box" style={style}>
            <Popover content={content1()} trigger="hover">
              <div className="pop position1" />
            </Popover>
            <Popover content={content2()} trigger="hover">
              <div className="pop position2" />
            </Popover>
            <Popover content={content3()} trigger="hover">
              <div className="pop position3" />
            </Popover>
            <Popover content={content4()} trigger="hover">
              <div className="pop position4" />
            </Popover>
            <span>{name}</span>
          </div>
        </span>
      </Draggable>
    );
  }
}
