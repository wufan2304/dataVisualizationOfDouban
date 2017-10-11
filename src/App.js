import React, { Component } from 'react';
// import axios from 'axios';
import './app.css';
import ComponentBubbleModel from './components/componentBubble/componentBubbleModel';
import ComponentPoster from './components/componentPoster/componentPoster';
import ComponentCommentModel from './components/componentComment/componentCommentModel';
import ComponentGenresRating from './components/componentGenresRating/componentGenresRating';
import { processDataByGenres } from './utils/getFromDouban';

import { Button, Col, Row, Layout, Card } from 'antd';
const { Header, Footer, Content } = Layout;


class App extends Component {
  constructor() {
    super();
    this.state = {
      currentMovie: {},
      currentMoviesType: 'top250',
      genresRatingData: []
    }
  }
  componentDidMount() {
    processDataByGenres().then((res) => {
      this.setState({
        genresRatingData: res
      })

    })
  }
  showSelectedItem(data) {
    // console.log(data)
    this.setState({ currentMovie: data })
  }
  handleClick(e) {
    this.setState({ currentMoviesType: e.target.value })
  }
  render() {

    return (
      <div className="App">
        <Layout>
          <Header className="headerStyle">豆瓣电影数据可视化</Header>
          <Layout>
            <Card title="豆瓣电影评分，上映时间，评论数的可视化" style={{margin: '10px'}}>
              <Content>
                <Row>
                  <Col span={16}>
                    <ComponentBubbleModel
                      dataSource={this.state.currentMoviesType}
                      showSelectedItem={this.showSelectedItem.bind(this)}
                      height={450}
                    />
                    <ComponentCommentModel currentMovie={this.state.currentMovie} />
                  </Col>
                  <Col span={8}>
                    <ComponentPoster data={this.state.currentMovie} />
                  </Col>
                </Row>
                <Row>
                  <Button onClick={this.handleClick.bind(this)} value="top250">TOP250</Button>
                  <Button onClick={this.handleClick.bind(this)} value="in_theaters">正在上映</Button>
                </Row>

              </Content>
            </Card>
            <Content>
              <ComponentGenresRating data={this.state.genresRatingData} />
            </Content>
          </Layout>
          <Footer className="footerStyle">Copyright&copy;2017, Made by Fan Wu, All rights reversed</Footer>
        </Layout>
      </div >
    );
  }
}


export default App;
