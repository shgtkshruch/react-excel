import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Excel.css';

class Excel extends Component {
  constructor(props) {
    super(props);

    this._sort = this._sort.bind(this);
    this._showEditor = this._showEditor.bind(this);
    this._save = this._save.bind(this);

    this.state = {
      data: props.initialData,
      sortby: null,
      decending: false,
      edit: null, // {row: 行番号, cell: 列番号}
    };
  }

  _sort(e) {
    const column = e.target.cellIndex;
    const data = this.state.data.slice();
    const decending = this.state.sortby === column && !this.state.decending;

    data.sort((a, b) => {
      return decending
        ? (a[column] < b[column] ? 1 : -1)
        : (a[column] > b[column] ? 1 : -1)
    });

    this.setState({
      data,
      sortby: column,
      decending,
    });
  }

  _showEditor(e) {
    this.setState({
      edit: {
        row: parseInt(e.target.dataset.row, 10),
        cell: e.target.cellIndex,
      }
    });
  }

  _save(e) {
    e.preventDefault();
    const input = e.target.firstChild;
    const data = this.state.data.slice();
    data[this.state.edit.row][this.state.edit.cell] = input.value;

    this.setState({
      data,
      edit: null,
    });
  }

  render() {
    return (
      <table>
        <thead onClick={this._sort}>
          <tr>
            {this.props.headers.map((title, id) => {
              if (this.state.sortby === id) {
                title += this.state.decending ? '\u2191' : '\u2193';
              }
              return <th key={id}>{title}</th>
            })}
          </tr>
        </thead>
        <tbody onDoubleClick={this._showEditor}>
          {this.state.data.map((row, rowidx) => {
            return (
              <tr key={rowidx}>
                {row.map((cell, id) => {
                  let content = cell
                  const edit = this.state.edit;
                  if (edit && edit.row === rowidx && edit.cell === id) {
                    content = (
                      <form onSubmit={this._save}>
                        <input type="text" defaultValue={content} />
                      </form>
                    )
                  }
                  return <td key={id} data-row={rowidx}>{content}</td>
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
