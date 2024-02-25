import React from 'react';
import { Tabs } from 'antd';

import SearchLine from '../SearchLine/SearchLine';
import './Header.css';

const items = [
  {
    key: 'Search',
    label: 'Search',
  },
  {
    key: 'Rated',
    label: 'Rated',
  },
];

export default class Header extends React.Component {
  state = {};

  onKeyChanged = (activeKey) => {
    if (activeKey === 'Search') {
      this.props.changeListMode(activeKey);
    }

    if (activeKey === 'Rated') {
      this.props.changeListMode(activeKey);
    }
  };

  render() {
    const { inputRequestFilms, activeSearch } = this.props;

    return (
      <header>
        <Tabs className="tabs" onChange={this.onKeyChanged} items={items} defaultActiveKey="Search" />
        {activeSearch ? <SearchLine className="searchLine" inputRequestFilms={inputRequestFilms} /> : null}
      </header>
    );
  }
}
