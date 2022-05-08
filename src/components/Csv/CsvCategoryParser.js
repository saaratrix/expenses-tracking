export class CsvCategoryParser {

  /**
   *
   * @param {string} contents
   * @returns {CsvSettings}
   */
  getCategoryData(contents) {
    try {
      const obj = JSON.parse(contents);

      /** @type {CsvCategory[]} */
      const categories = obj.categories.map((c, index) => {
        const messageRegex = c.messageRegex ? new RegExp(c.messageRegex, c.messageRegexFlags ?? 'i') : undefined;
        const recipientRegex = c.recipientRegex ? new RegExp(c.recipientRegex, c.recipientRegexFlags ?? 'i') : undefined;

        return {
          name: c.name,
          messageRegex,
          recipientRegex,
          sortOrder: index,
        };
      });

      return {
        columnIds: obj.columnIds,
        dateColumn: obj.dateColumn,
        amountColumn: obj.amountColumn,
        recipientColumn: obj.recipientColumn,
        messageColumn: obj.messageColumn,
        locale: obj.locale,
        flipAmount: !!obj.flipAmount,
        categories,
      };
    } catch (e) {
      throw new Error(`Failed to get category data ${e}`);
    }
  }
}
