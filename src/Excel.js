import React, { Component } from 'react';
import './Excel.css';

class Excel extends Component {
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
      </table>
    );
  }
}

export default Excel;
