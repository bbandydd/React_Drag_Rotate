import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Popover } from 'antd';
import Draggable from 'react-draggable';

import './Box.less';

@inject('boxStore')
@observer
export default class Box extends Component {
  static propTypes = {
    boxStore: PropTypes.object,
    index: PropTypes.number,
    data: PropTypes.object,
    onSetting: PropTypes.func,
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
  onControlledDrag = (e, position, index) => {
    this.props.onSetting(index, 'x', position.x);
    this.props.onSetting(index, 'y', position.y);
  }

  onControlledStop = (e, position, index) => {
    const {
      boxStore: { getOffsetPosition },
      data: { rotate },
    } = this.props;

    const BOX = {
      x: position.x,
      y: position.y,
      BOX_WIDTH: this.BOX_WIDTH,
      BOX_HEIGHT: this.BOX_HEIGHT,
      rotate,
    };

    const newBox = getOffsetPosition(BOX);

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
      boxStore: { getActualPosition },
      data: { rotate, x, y }
    } = this.props;

    const BOX = {
      x,
      y,
      BOX_WIDTH: this.BOX_WIDTH,
      BOX_HEIGHT: this.BOX_HEIGHT,
      rotate,
    };

    return getActualPosition(POSITION, BOX);
  }

  render() {
    const {
      index,
      boxStore: { getActualPosition },
      data: { rotate, name, x, y, overlap },
    } = this.props;

    const style = {
      transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
      width: `${this.BOX_WIDTH}px`,
      height: `${this.BOX_HEIGHT}px`,
      position: 'absolute',
    };

    const BOX = {
      x,
      y,
      BOX_WIDTH: this.BOX_WIDTH,
      BOX_HEIGHT: this.BOX_HEIGHT,
      rotate,
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
          <div className={`box ${overlap && 'overlap'}`} style={style}>
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
