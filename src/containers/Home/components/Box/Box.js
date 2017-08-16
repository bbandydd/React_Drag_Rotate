import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Box.less';

export default class Box extends Component {
  static propTypes = {
    index: PropTypes.number,
    data: PropTypes.object,
    scale: PropTypes.object,
  }

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  }

  render() {
    const {
      index, scale,
      data: { rotate, width, height },
    } = this.props;

    const style = {
      transform: `rotate(${rotate}deg)`,
      width: `${width / scale}px`,
      height: `${height / scale}px`
    };

    return (
      <div className="box" style={style}>
        {index + 1}
      </div>
    );
  }
}
