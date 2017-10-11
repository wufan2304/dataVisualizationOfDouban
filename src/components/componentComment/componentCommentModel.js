import React from 'react';
import axios from 'axios';
import { Card } from 'antd';

export default class ComponentCommentModel extends React.Component {
    constructor() {
        super();
        this.state = {
            currentMovieComment: {}
        }
    }
    componentDidMount() {
        // console.log(this.props.currentMovie)
        if (this.props.currentMovie.Id) {
            var url = '/v2/movie/subject/' + this.props.currentMovie.Id
            console.log(url)
            axios.get(url).then((res) => {
                console.log(res);
            })
        }

    }    
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.currentMovie)
        if (nextProps.currentMovie.Id) {
            var url = '/v2/movie/subject/' + nextProps.currentMovie.Id
            // console.log(url)
            axios.get(url).then((res) => {
                // console.log(res);
                this.setState({currentMovieComment: res.data})
            })
        }

    }
    render() {
        return (
            <Card title={this.props.currentMovie.Name} className="componentComment" style={{ margin: '10px' }}>
                {this.state.currentMovieComment.summary}
            </Card>
        )
    }
}