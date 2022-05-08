import {Component} from "react";

export class CsvRawTable extends Component {
  constructor(props) {
    super(props);
    console.log('csv table', props)
  }

  render() {
    const { headers, rows } = this.props.data;

    const headerCells = headers.map((header, index) => {
      return (
        <th key={`h_${index}`}>{header}</th>
      );
    });

    const bodyRows = rows.map((row, rowIndex) => {
      const cells = row.map((cell, cellIndex) => {
        return (
          <td key={`cell_${rowIndex}_${cellIndex}`}>{cell}</td>
        );
      });

      return (
        <tr key={`row_${rowIndex}`}>{cells}</tr>
      );
    })

    return (
      <details className="csv-raw-table-container">
        <summary>Raw data</summary>
        <table>
          <thead>
          <tr>
            {headerCells}
          </tr>
          </thead>
          <tbody>
          {bodyRows}
          </tbody>
        </table>
      </details>

    );
  }

}
