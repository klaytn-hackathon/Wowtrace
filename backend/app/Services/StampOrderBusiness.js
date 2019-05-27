const crypto = require('crypto')
const StampModel = use('App/Models/Stamp')
const moment = require('moment')

class StampOrderBusiness {
  async generateStampCode(data) {
    return new Promise((resolve) => {
      const hash = crypto.createHash('sha256')
      hash.update(data)
      resolve(hash.digest('hex').slice(-16).toLocaleUpperCase())
    })
  }

  /**
   * Create the object of stamp lists
   * @param {*} value: Message string
   */
  async CreateStampList(value) {
    return new Promise(async (resolve) => {
      const data = JSON.parse(value)
      const { start, end, createdAt, stampOrderId, productCode, producerId } = data
      const date = moment(createdAt).format('DD/MM/YYYY')
      let stampList = []

      for (let i = start; i < end; i++) {
        let stampInfo = {
          stampOrderId,
          date,
          producerId,
          productCode,
          increments: i
        }

        const stampCode = await this.generateStampCode(JSON.stringify(stampInfo))
        let stamp = {
          code: stampCode,
          producerId,
          ownerId: producerId,
          productCode,
          stampOrderId,
          increments: i,
          status: StampModel.NEWLY
        }
        stampList.push(stamp)
      }
      // ///
      resolve(stampList)
    })
  }
}

module.exports = new StampOrderBusiness()
