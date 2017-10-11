import React from 'react';
import { Card } from 'antd';

export default class ComponentCommentView extends React.Component {
    render() {
        return(
            <Card title={this.props.data.Name} className="componentComment" style={{ margin: '10px'}}>
                
            
            </Card>
        )
    }
}