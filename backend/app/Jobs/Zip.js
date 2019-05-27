const fs = require('fs')
const path = require('path')
const archiver = require('archiver')
const moment = require('moment')

const Env = use('Env')

const StampOrderModel = use('App/Models/StampOrder')

class Zip {
  constructor(data) {
    this.data = data
  }
  async run() {
    return new Promise((resolve) => {
      const { producerId, stampOrderId, createdAt } = this.data
      const date = moment(createdAt)
      const fileName = date.format('YYYYMMDDHHmmss') + stampOrderId

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

      if (!fs.existsSync(`${process.cwd()}/public/archives`)) {
        fs.mkdirSync(`${process.cwd()}/public/archives`)
      }

      // create a file to stream archive data to.
      let output = fs.createWriteStream(`${process.cwd()}/public/archives/${fileName}.zip`)
      const archive = archiver('zip', {
        zlib: { level: 6 } // Sets the compression level.
      })

      // listen for all archive data to be written
      // 'close' event is fired only when a file descriptor is involved
      output.on('close', async function () {
        console.log(`Generated ${Env.get('APP_URL')}/archives/${fileName}.zip - File size: ${archive.pointer()} bytes`)
        await StampOrderModel.query().where('id', stampOrderId).update({
          status: StampOrderModel.GENERATED,
          url: `${Env.get('APP_URL')}/archives/${fileName}.zip`
        })
        resolve(`${Env.get('APP_URL')}/archives/${fileName}.zip`)
      })

      // This event is fired when the data source is drained no matter what was the data source.
      // It is not part of this library but rather from the NodeJS Stream API.
      // @see: https://nodejs.org/api/stream.html#stream_event_end
      output.on('end', function () {
        console.log('Data has been drained')
      })

      // good practice to catch warnings (ie stat failures and other non-blocking errors)
      archive.on('warning', function (err) {
        if (err.code === 'ENOENT') {
          // log warning
        } else {
          // throw error
          throw err
        }
      })

      // good practice to catch this error explicitly
      archive.on('error', function (err) {
        throw err
      })

      // pipe archive data to the file
      archive.pipe(output)

      // append files from a sub-directory, putting its contents at the root of archive
      archive.directory(`${process.cwd()}/resources/${filePath}`, false)

      // finalize the archive (ie we are done appending files but streams have to finish yet)
      // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
      archive.finalize()
    })
  }
}

module.exports = Zip
