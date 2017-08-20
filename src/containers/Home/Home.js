import React, { Component } from 'react';
import { Layout, Tag } from 'antd';
import 'antd/dist/antd.css';

import Menubar from './components/Menubar';
import Box from './components/Box';
import Info from './components/Info';

import './Home.less';

const { Sider, Content } = Layout;

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 600;

export default class Home extends Component {
  state = {
    boxList: [],
    scale: 10,
  }

  handleAddBox = (box) => {
    const newBoxList = this.state.boxList;
    newBoxList.push(box);

    this.setState({
      boxList: newBoxList,
    });
  }

  handleaRemoveBox = (index) => {
    const newBoxList = this.state.boxList;
    newBoxList.splice(index, 1);

    this.setState({
      boxList: newBoxList,
    });
  }

  handleSetting = (index, key, value) => {
    const newBoxList = this.state.boxList;
    newBoxList[index][key] = value;

    this.setState({
      boxList: newBoxList,
    });
  }

  render() {
    const { boxList, scale } = this.state;

    return (
      <Layout className="home">
        <Sider>
          <div>
            {
              boxList.map((data, index) =>
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
              <Tag color="#404040">1 : {scale}</Tag>
            </div>
            <div className="canvas" style={{ position: 'relative' }}>
              {
                boxList.map((data, index) =>
                  <Box
                    index={index}
                    data={data}
                    scale={scale}
                    onSetting={this.handleSetting}
                    CANVAS_WIDTH={CANVAS_WIDTH}
                    CANVAS_HEIGHT={CANVAS_HEIGHT}
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
