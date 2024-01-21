import React from 'react';
import { Pagination as PaginAnt } from 'antd';

import './Pagination.css';

export default class SearchLine extends React.Component {
  state = {};

  render() {
    return <PaginAnt current={this.props.current} onChange={this.props.onChange} total={this.props.pages} />;
  }
}
