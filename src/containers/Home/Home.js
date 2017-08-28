import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Layout, Tag, Button } from 'antd';
import 'antd/dist/antd.css';

import Menubar from './components/Menubar';
import Box from './components/Box';
import Info from './components/Info';

import './Home.less';

const { Sider, Content } = Layout;

@inject('boxStore')
@observer
export default class Home extends Component {
  static propTypes = {
    boxStore: PropTypes.object,
  }

  @observable boxList = [];

  @action
  handleAddBox = (box) => {
    this.boxList.push(box);
  }

  @action
  handleaRemoveBox = (index) => {
    this.boxList.splice(index, 1);
  }

  @action
  handleSetting = (index, key, value) => {
    this.boxList[index][key] = value;
  }

  @action
  handleCheckOverlap = () => {
    const {
      boxStore: { getActualPosition, CANVAS }
    } = this.props;

    this.boxList.forEach((point, index) => {
      let isOverlap = false;

      this.boxList[index].overlap = false;

      const checkOverlap = (mx, my) => {
        const otherBoxList = this.boxList.filter((x, idx) => idx !== index);

        otherBoxList.forEach((box) => {
          const BOX = {
            x: box.x,
            y: box.y,
            BOX_WIDTH: box.width / CANVAS.scale,
            BOX_HEIGHT: box.height / CANVAS.scale,
            rotate: box.rotate,
          };

          if (this.props.boxStore.isOverlap(BOX, mx, my)) isOverlap = true;
        });
      };

      const POINT = {
        x: point.x,
        y: point.y,
        BOX_WIDTH: point.width / CANVAS.scale,
        BOX_HEIGHT: point.height / CANVAS.scale,
        rotate: point.rotate,
      };

      const position1 = getActualPosition(1, POINT);
      const position2 = getActualPosition(2, POINT);
      const position3 = getActualPosition(3, POINT);
      const position4 = getActualPosition(4, POINT);

      checkOverlap(position1.x, position1.y);
      checkOverlap(position2.x, position2.y);
      checkOverlap(position3.x, position3.y);
      checkOverlap(position4.x, position4.y);

      this.boxList[index].overlap = isOverlap;
    });
  }

  render() {
    const { boxStore: { CANVAS } } = this.props;

    return (
      <Layout className="home">
        <Sider>
          <div>
            {
              this.boxList.map((data, index) =>
                <Info
                  index={index}
                  data={data}
                  onSetting={this.handleSetting}
                  onClose={this.handleaRemoveBox}
                />
              )
            }
          </div>
        </Sider>
        <Layout>
          <Menubar
            onAdd={this.handleAddBox}
          />
          <Content>
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              <Tag color="#404040">1 : {CANVAS.scale}</Tag>
            </div>
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              <Button onClick={this.handleCheckOverlap}>檢查重疊</Button>
            </div>
            <div className="canvas" style={{ position: 'relative' }}>
              {
                this.boxList.map((data, index) =>
                  <Box
                    index={index}
                    data={data}
                    onSetting={this.handleSetting}
                  />
                )
              }
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
