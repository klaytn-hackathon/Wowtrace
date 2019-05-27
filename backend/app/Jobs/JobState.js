const Zip = require('./Zip')

class JobState {
  static set state(state) {
    this.state = state
  }

  static get state() {
    return this.state
  }

  /**
   * Handle jobs of stamp generation
   * @param {*} type:
   * @param {*} result: Message object
   * @param {*} topic:
   */
  async StampHandler(result, topic) {
    const { stampOrderId, start, end, orderStampQty } = result
    let qty = end - start
    if (!this.state[stampOrderId]) {
      // Don't exist stamp order Id
      this.state[stampOrderId] = { [topic]: qty }

    } else if (!this.state[stampOrderId][topic]) {
      // Don't exist topic
      this.state[stampOrderId] = { ...this.state[stampOrderId], [topic]: qty }

    } else {
      // Incomplete job
      qty = this.state[stampOrderId][topic] + qty
      this.state[stampOrderId] = { ...this.state[stampOrderId], [topic]: qty }
    }

    const { ExportCsv, Generate, ExportPdf } = this.state[stampOrderId]
    if (ExportCsv === orderStampQty && Generate === orderStampQty && ExportPdf === orderStampQty) {
      // Complete all jobs
      // Execute zip
      const zip = new Zip(result)
      delete this.state[stampOrderId]
      const msg = await zip.run()
      
    }
  }
}

module.exports = new JobState()
