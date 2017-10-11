import React from 'react';
import { Card } from 'antd';

export default class ComponentPoster extends React.Component {
    render() {
        return(
            <Card title={this.props.data.Name||'选择左图中的气泡'} className="componentPoster" style={{ margin: '10px'}}>
                <img src={this.props.data.Poster} width="100%" alt="海报"/>
                <p>电影名：{this.props.data.Name}</p>
                <p>上映时间：{this.props.data.Year}</p>
                <p>豆瓣评分：{this.props.data.Rating}</p>
                
            </Card>
        )
    }
}