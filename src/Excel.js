import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Excel.css';

class Excel extends Component {
  constructor(props) {
    super(props);

    this._sort = this._sort.bind(this);

    this.state = {
      data: props.initialData
    };
  }

  _sort(e) {
    const column = e.target.cellIndex;
    const data = this.state.data.slice();
    data.sort((a, b) => {
      return a[column] > b[column] ? 1 : -1;
    });

    this.setState({
      data
    });
  }

  render() {
    return (
      <table>
        <thead onClick={this._sort}>
          <tr>
            {this.props.headers.map((title, id) => {
              return <th key={id}>{title}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {this.state.data.map((row, id) => {
            return (
              <tr key={id}>
                {row.map((cell, id) => {
                  return <td key={id}>{cell}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    );
  }
}

Excel.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.string
  ),
  initialData: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.string
    )
  )
}

export default Excel;
