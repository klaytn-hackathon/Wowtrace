'use strict'

const Database = use('Database')

const StampOrderBusiness = use('App/Services/StampOrderBusiness')

class Generate {
  static get topic() {
    return 'Generate'
  }

  async handle(data, job) {
    // return a promise
    const { value } = data
    const result = await this.InsertDatabase(value)
    await job.StampHandler(result, Generate.topic)
    return result
  }
  /**
   * Insert the object of stamp lists in database
   * @param {*} value: Message string
   */
  async InsertDatabase(value) {
    const data = await StampOrderBusiness.CreateStampList(value)
    await Database.table('stamps').insert(data)
    return JSON.parse(value)
  }


}

module.exports = Generate
