export default class Analyte {
  constructor(analyte) {
    this.analyte = analyte;
  }

  getResults() {
    return typeof this.analyte.res.userResults === 'string'
      ? []
      : _.values(this.analyte.res.userResults);
  }

  getNumericResults() {
    return this.getResults()
      .filter((r) => r.result !== null && r.result !== '' && !isNaN(r.result))
      .map((r) =>
        Object.assign({}, r, {
          result: parseFloat(r.result),
        })
      )
      .sort((a, b) => a.result - b.result);
  }

  getNumericResultValues() {
    return this.getNumericResults().map((r) => r.result);
  }

  /**
   * Returns the stats from the analyte
   * Makes sure all values are numbers
   */
  getStatistics() {
    const statistics = Object.assign({}, this.analyte.res.statistics);
    for (let key in statistics) {
      statistics[key] = parseFloat(statistics[key]);
    }
    return statistics;
  }
}
