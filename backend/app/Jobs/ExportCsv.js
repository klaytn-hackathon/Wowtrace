'use strict'

const fs = require('fs')
const path = require('path')
const moment = require('moment')

const StampOrderBusiness = use('App/Services/StampOrderBusiness')

class ExportCsv {
  static get topic() {
    return 'ExportCsv'
  }

  async handle(data, job) {
    // return a promise
    const { value } = data
    const result = await this.CreateCsv(value)
    await job.StampHandler(result, ExportCsv.topic)
      return result
  }

  /**
   * Export CSV file
   * @param {*} value: Message string
   */
  async CreateCsv(value) {
    return new Promise(async (resolve, reject) => {
      const { producerId, stampOrderId, createdAt } = JSON.parse(value)
      const date = moment(createdAt)
      const data = await StampOrderBusiness.CreateStampList(value)

      // Make file path
      const filePath = [
        'stamps',
        producerId.toString(),
        date.format('YYYY'),
        date.format('MM'),
        date.format('YYYYMMDDHHmmss') + stampOrderId
      ].reduce((prev, folder) => {
        const current = path.join(prev, folder, path.sep)
        if (!fs.existsSync(`${process.cwd()}/resources/${current}`)) {
          fs.mkdirSync(`${process.cwd()}/resources/${current}`)
        }
        return current
      }, '')

      let fileName = "stamp.csv"
      console.log(fileName)

      // Execute: Create CSV file
      let stream = fs.createWriteStream(`${process.cwd()}/resources/${[filePath, fileName].join('/')}`, {
        flags: 'a' // 'a' means appending (old data will be preserved)
      })

      stream.write(['Serial No.', 'Stamp Code'].join(',') + '\n')

      data.forEach(stamp => {
        stream.write([stamp.increments, stamp.code].join(',') + '\n')
      })

      stream.end()

      resolve(JSON.parse(value))
    })
  }
}

module.exports = ExportCsv
