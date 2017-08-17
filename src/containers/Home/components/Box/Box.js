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
  }

  render() {
    const {
      index, scale,
      data: { rotate, width, height, name, x, y },
    } = this.props;

    const style = {
      transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
      width: `${width / scale}px`,
      height: `${height / scale}px`
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
