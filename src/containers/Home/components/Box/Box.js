import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popover } from 'antd';
import Draggable from 'react-draggable';
import getActualPosition from 'utils/getActualPosition';
import getOffsetPosition from 'utils/getOffsetPosition';

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
      data: { rotate },
    } = this.props;

    const { BOX_WIDTH, BOX_HEIGHT } = this.state;

    const BOX = {
      x: position.x,
      y: position.y,
      BOX_WIDTH,
      BOX_HEIGHT,
      rotate,
    };

    const newBox = getOffsetPosition(BOX, CANVAS_WIDTH, CANVAS_HEIGHT);

    this.props.onSetting(index, 'x', newBox.x);
    this.props.onSetting(index, 'y', newBox.y);
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

    return getActualPosition(POSITION, {
      x, y, BOX_WIDTH, BOX_HEIGHT, rotate
    });
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

    const BOX = {
      x, y, BOX_WIDTH, BOX_HEIGHT, rotate,
    };

    const content1 = () => {
      const position = getActualPosition(1, BOX);
      return `(${position.x}, ${position.y})`;
    };
    const content2 = () => {
      const position = getActualPosition(2, BOX);
      return `(${position.x}, ${position.y})`;
    };
    const content3 = () => {
      const position = getActualPosition(3, BOX);
      return `(${position.x}, ${position.y})`;
    };
    const content4 = () => {
      const position = getActualPosition(4, BOX);
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
