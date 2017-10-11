import React from 'react';
// import axios from 'axios';
import ComponentBubbleView from './componentBubbleView';
import { Card } from 'antd';
import getDataFromDouban from '../../utils/getFromDouban';

export default class ComponentBubbleModel extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            currentMovie: '',
            currentMoviesType: 'top250'
        }
    }

    dataProcess(data, type = 'top250') {
        // 将获取的数据进行处理
        var length = data.count;
        var subjects = data.subjects;
        var temps = [];
        for (var i = 0; i < length; i++) {
            var item = subjects[i];
            if (item && item.rating && item.rating.average !== 0) {
                var rating = item.rating.average;
                var year = item.year;
                var collectionCount = item.collect_count;
                var title = item.title;
                var id = item.id;
                var poster = item.images.large;
                var genres = item.genres;
                console.log(genres)
                var temp = { Rating: rating, Year: year, Count: collectionCount, Name: title, Id: id, Poster: poster, Genres: genres };
                temps.push(temp)
            }
        }
        // 按上映日期排序
        temps.sort((a, b) => {
            return (a.Year - b.Year)
        })
        this.setState({
            data: temps,
            currentMoviesType: type
        })
        window.localStorage.setItem(type, JSON.stringify(temps));
    }

    componentWillReceiveProps(nextProps) {
        var data = [];
        var movieType = nextProps.dataSource;
        getDataFromDouban(movieType).then((value) => {
            data = value;
            this.setState({
                data: data,
                currentMoviesType: movieType
            })
        });
    }

    // 该函数用于向父组件传递参数
    showSelectedItem(param) {
        this.props.showSelectedItem(param)
    }

    componentDidMount() {
        // var promise = new Promise();
        var data = []
        getDataFromDouban(this.state.currentMoviesType).then((value) => {
            data = value;
            this.setState({ data: data });
        });
    }

    render() {
        return (
            <div className="App" >
                <Card title={this.props.dataSource} style={{ margin: '10px' }}>
                    <ComponentBubbleView data={this.state.data}
                        showSelectedItem={this.showSelectedItem.bind(this)}
                        width={this.props.width}
                        height={this.props.height} />
                </Card>
            </div>
        );
    }
}