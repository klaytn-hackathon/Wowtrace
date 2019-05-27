const moment = require('moment')
const Kafka = use('App/Addons/Kafka')
const StampOrder = use('App/Models/StampOrder')

const Env = use('Env')
const generationTopic = Env.get('KAFKA_GENERATION_TOPIC', 'Generate')
const exportPdfTopic = Env.get('KAFKA_EXPORT_PDF_TOPIC', 'ExportPdf')
const exportCsvTopic = Env.get('KAFKA_EXPORT_CSV_TOPIC', 'ExportCsv')
const genTickTime = +Env.get('TICK_TIME_GENERATION', 500)
const genPerTime = +Env.get('STAMP_PER_TIME_GENERATION', 2000)
const pdfTickTime = +Env.get('TICK_TIME_EXPORT_PDF', 2000)
const pdfPerTime = +Env.get('STAMP_PER_TIME_EXPORT_PDF', 500)

class Generate {

  /**
   * Make the stamp generation events
   * @param {*} stampOrder: A stamp order object
   */
  async FireEventGeneration(qty, producerId, productCode) {
    /// ///////
    const lastIndex = await this.GetStartedStamp(producerId, productCode)
    // Create a stamp order
    const order = await StampOrder.create({
      productCode,
      producerId,
      qty,
      increments: lastIndex + qty,
      status: StampOrder.NEWLY
    })

    await StampOrder.query()
      .where('id', order.id)
      .update({ "name": moment(order.created_at).format('YYYYMMDDHHmmss') + order.id })

    const msgObj = {
      createdAt: order.created_at,
      stampOrderId: order.id,
      orderStampQty: qty,
      productCode,
      producerId
    }

    // Insert Database
    let genStart = lastIndex + 1
    let genRemain = qty
    const genInterval = setInterval(() => {
      const end = genStart + (genRemain > genPerTime ? genPerTime : genRemain)
      Kafka.produce(JSON.stringify({
        ...msgObj,
        start: genStart,
        end
      }), generationTopic)

      genRemain -= genPerTime
      genStart += genPerTime
      if (genRemain <= 0) clearInterval(genInterval)
    }, genTickTime)

    // Export Csv
    Kafka.produce(JSON.stringify({
      ...msgObj,
      start: lastIndex + 1,
      end: lastIndex + qty + 1
    }), exportCsvTopic)

    // Export Pdf
    let pdfRemain = qty
    let pdfStart = lastIndex + 1
    let num = 1
    const pdfInterval = setInterval(() => {
      const end = pdfStart + (pdfRemain > pdfPerTime ? pdfPerTime : pdfRemain)
      Kafka.produce(JSON.stringify({
        ...msgObj,
        start: pdfStart,
        end,
        pageNumber: num
      }), exportPdfTopic)
      num++
      pdfRemain -= pdfPerTime
      pdfStart += pdfPerTime
      if (pdfRemain <= 0) clearInterval(pdfInterval)
    }, pdfTickTime)

    return order
  }

  /**
   *
   * @param {*} producerId
   * @param {*} productCode
   */
  async GetStartedStamp(producerId, productCode) {
    let start = 0
    try {
      start = parseInt((await StampOrder.query()
        .where('productCode', productCode)
        .where('producerId', producerId)
        .orderBy('increments', 'desc')
        .first()).increments)

    } catch (error) {
      start = 0
    }

    return start
  }

}

module.exports = new Generate()
