import React from 'react';
import createG2 from 'g2-react';
import G2 from 'g2';
import { Card, Row, Col } from 'antd';

const Frame = G2.Frame;

export default class ComponentGenresRating extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            width: 800,
            height: 450,
            plotCfg: {
                margin: [50, 50, 50, 100],
                // padding: [20, 20, 20, 20]
            },
            forceFit: true,
            movieRatings: [],
            selectedMovieType: ''
        }
    }

    componentDidMount() {
        this.setState({
            data: this.props.data
        })
    }
    handleSelectedItem(data) {
        this.setState({
            movieRatings: data.movieRatings.split(','),
            selectedMovieType: data.movieType
        })
        console.log(this.state.movieRatings)
    }

    render() {
        var that = this;
        const Bubble = createG2(chart => {
            chart.cols({
                'movieType': { alias: '电影类型' },
                'movieRating': { alias: '电影评分' },
                'movieCount': { alias: 'TOP100电影数量' },
            })
            chart.tooltip({
                title: '豆瓣电影TOP250评分'
            })
            chart.point()
                .position('movieType*movieRating')
                .size('movieCount', 100, 2)
                .color('Id')
                .opacity(0.65)
                .shape('circle')
                .tooltip('movieType*movieRating*movieCount')
                .selected(true);
            chart.legend('movieCount', false);

            chart.on('itemselectedchange', function (e) {
                // console.log(e.data._origin)
                that.handleSelectedItem(e.data._origin)
            })
            chart.render();
        })

        var movieList =
            this.state.movieRatings.map((item) => {
                return (
                    <li>
                        <p>{item}</p>
                    </li>
                )
            })


        return (
            <div className="App" >

                <Row>
                    <Col span={16}>
                        <Card title="不同电影类型的豆瓣评分" style={{ margin: '10px' }}>
                            <Bubble data={this.props.data}
                                width={this.state.width}
                                height={this.state.height}
                                plotCfg={this.state.plotCfg}
                                forceFit={this.state.forceFit}
                                ref="myChart2">
                            </Bubble>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title={this.state.selectedMovieType || '选择左图中的气泡'} style={{ margin: '10px' }}>
                            <ul style={{ height: '455px', overflow: 'auto' }}>{movieList}</ul>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}