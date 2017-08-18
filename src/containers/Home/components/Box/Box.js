import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

import './Box.less';

export default class Box extends Component {
  static propTypes = {
    index: PropTypes.number,
    data: PropTypes.object,
    scale: PropTypes.object,
    onSetting: PropTypes.func,
  }

  onControlledDrag = (e, position, index) => {
    const { x, y } = position;

    this.props.onSetting(index, 'x', x);
    this.props.onSetting(index, 'y', y);

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

    const style = {
      transform: `translate(${x}px, ${y}px) rotate(${rotate * -1}deg)`,
      width: `${width / scale}px`,
      height: `${height / scale}px`,
      position: 'absolute',
    };

    return (
      <Draggable
        bounds="parent"
        onDrag={(e, position) => this.onControlledDrag(e, position, index)}
        position={{ x, y }}
      >
        <span>
          <div className="box" style={style}>
            {name}
          </div>
        </span>
      </Draggable>
    );
  }
}
