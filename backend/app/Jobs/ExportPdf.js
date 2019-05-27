'use strict'

const fs = require('fs')
const moment = require('moment')
const path = require('path')
const QRCode = require('qrcode')
// const htmltopdf = require('phantom-html-to-pdf')()

const pdf = require('html-pdf')

const StampOrderBusiness = use('App/Services/StampOrderBusiness')
const Env = use('Env')
const View = use('View')


class ExportPdf {
  static get topic() {
    return 'ExportPdf'
  }

  async handle(data, job) {
    // return a promise
    const { value } = data
    const result = await this.CreatePdf(value)
    await job.StampHandler(result, ExportPdf.topic)
    return result
  }

  /**
   * Export PDF file
   * @param {*} value: Message string
   */
  async CreatePdf(value) {
    const self = this
    return new Promise(async (resolve, reject) => {
      const { pageNumber, producerId, createdAt, stampOrderId } = JSON.parse(value)
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

      let stamps = []
      for (let i = 0; i < data.length; i++) {
        // Make QR code
        let stampQR = await QRCode.toDataURL(data[i].code,
          { width: 140, margin: 1 })
        stamps.push({
          src: stampQR,
          sn: data[i].increments
        })
      }

      // Render HTML
      const html = View.render('stamp', {
        stamps: stamps,
        startNumber: 1,
        pageNumber,
        publicUrl: Env.get('APP_URL')
      })
      // fs.writeFileSync("stamp.html", html, 'utf8')

      // Execute: Create PDF file
      try {
        const fileName = `STAMP ${pageNumber}.pdf`
        await self.ConvertHtmlToPdf(html, `${process.cwd()}/resources/${filePath}/${fileName}`)

        console.log(fileName)
        resolve(JSON.parse(value))
      } catch (error) {
        console.log('Cannot convert HTML to PDF:', error)
        reject(error)
      }
    })
  }

  /**
   * ConvertHtmlToPdf: Convert HTML to PDF file
   * @param {*} string
   * @param {*} file
   */
  async ConvertHtmlToPdf(html, file) {
    return new Promise((resolve, reject) => {
      const options = {
        margin: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
        format: 'A0',
        orientation: 'portrait'
      }
      pdf.create(html, options).toFile(file,
        (err, res) => {
          if (err) {
            reject(err)
            return;
          }
          resolve(res)
        })
    })
  }
}

module.exports = ExportPdf
