import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Excel.css';

class Excel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.initialData
    };
  }

  render() {
    return (
      <table>
        <thead>
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
