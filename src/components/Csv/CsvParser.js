export class CsvParser {
  /**
   *
   * @param {InputEvent} event
   * @returns {Promise<unknown>}
   */
  getFileContent(event) {
    return new Promise((res, rej) => {
      if (!event.target.files?.length) {
        return;
      }

      const file = event.target.files[0];
      const fr = new FileReader();
      fr.onload = () => {
        res(fr.result || '');
      }
      fr.onerror = () => {
        rej('Failed to read file');
      }

      fr.readAsText(file);
    });
  }

  /**
   * @param {string} content
   * @param {string} delimiter
   * @return {CsvData}
   */
  parseCSV(content, delimiter = ',') {
    const lines = content.split(/\r?\n/);
    const headerLine = lines[0];

    const headers = this.parseLine(headerLine, delimiter);
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
      const row = this.parseLine(lines[i], delimiter);
      if (row.length !== headers.length) {
        console.log(`row ${i} has different length than header`, row);
      }

      rows.push(row);
    }

    return {
      headers,
      rows,
    };
  }

  /**
   *
   * @param {string} line
   * @param {string} delimiter
   * @private
   */
  parseLine(line, delimiter) {
    try {
      const values = line.replaceAll('"', '').split(delimiter);
      return values;
    } catch (e) {
      throw new Error(`Failed to parse line ${line} - ${e}`);
    }
  }

  /**
   *
   * @param {CsvData} a
   * @param {CsvData} b
   */
  tryMergeData(a, b) {
    if (!b) {
      return a;
    }

    if (a.headers.length !== b.headers.length) {
      throw new Error("Could not merge data because CSV format is different.");
    }

    for (let i = 0; i < a.headers.length; i++) {
      if (a.headers[i] !== b.headers[i]) {
        throw new Error(`${a.headers[i]} is not same as ${b.headers[i]}`);
      }
    }

    a.rows.push(...b.rows);
    a.rows.sort((A, Z) => {
      // Find the first date!
      for (let i = 0; i < A.length; i++) {
        const aDate = new Date(A[i]);
        if (isNaN(+aDate)) {
          continue;
        }

        const zDate = new Date(Z[i]);

        return aDate - zDate;
      }
    });

    return a;
  }


}
