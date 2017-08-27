import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Layout, Tag } from 'antd';
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
