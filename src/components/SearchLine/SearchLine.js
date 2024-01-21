import React from 'react';
import { Input } from 'antd';
import debounce from 'lodash.debounce';

import './SearchLine.css';

export default class SearchLine extends React.Component {
  state = {
    inputValue: '',
  };

  debouncedInputRequestFilms = debounce((value) => {
    this.props.inputRequestFilms(value);
  }, 600);

  onInputChange = (evt) => {
    this.setState(() => ({
      inputValue: evt.target.value,
    }));
    this.debouncedInputRequestFilms(evt.target.value);
  };

  render() {
    return (
      <div>
        <Input
          className="inputClass"
          placeholder="Basic usage"
          onChange={this.onInputChange}
          value={this.state.inputValue}
          autoFocus
        />
      </div>
    );
  }
}
