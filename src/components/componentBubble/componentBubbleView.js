import React from 'react';
import createG2 from 'g2-react';

// import { Stat } from 'g2';
// import axios from 'axios';

export default class ComponentBubbleView extends React.Component {
    constructor() {
        super();
        this.state = {
            width: 600,
            height: 300,
            plotCfg: {
                margin: [50, 50, 50, 100],
                // padding: [20, 20, 20, 20]
            },
            forceFit: true,
        }
    }
    componentDidMount() {
        this.setState({
            width: this.props.width,
            height: this.props.height
        })
    }

    handleSelectedItem(data) {
        this.props.showSelectedItem(data)
        
    }
    render() {
        var that = this;
        const Bubble = createG2(chart => {
            chart.cols({
                'Name': { alias: '电影名' },
                'Year': { alias: '上映时间(年)' },
                'Rating': { alias: '评分(10)' },
                'Count': { alias: '评价数' },
                'Id': { alias: 'ID' },
                'Poster': { alias: '海报' }
            })
            chart.tooltip({
                title: '豆瓣电影TOP250评分'
            })
            chart.legend('Count', false);
            chart.legend('Id', false);
            chart.point()
                .position('Year*Rating')
                .size('Count', 35, 5)
                .color('Id')
                .opacity(0.65)
                .shape('circle')
                .tooltip('Year*Rating*Name*Count')
                .selected(true);
            chart.on('itemselectedchange', function (e) {
                console.log(e.data._origin.Id)
                that.handleSelectedItem(e.data._origin)
            })
            chart.render();
        })

        return (
            <div className="App" >
                <div id="c1">
                    <Bubble data={this.props.data}
                        width={this.state.width}
                        height={this.state.height}
                        plotCfg={this.state.plotCfg}
                        forceFit={this.state.forceFit}
                        ref="myChart">
                    </Bubble>
                </div>
            </div>
        );
    }
}