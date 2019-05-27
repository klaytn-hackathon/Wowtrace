'use strict'

const StampModel = use('App/Models/Stamp')
const StampOrderModel = use('App/Models/StampOrder')
const StampActivateModel = use('App/Models/StampActivate')
const Generate = use('App/Events/Generate')
const crypto = require('crypto')

class StampController {
  async init({ request, response, auth }) {
    const user = await auth.getUser()
    const { qty, productCode } = request.all()

    try {
      const stampOrder =
        await Generate.FireEventGeneration(typeof qty === 'number' ? qty : parseInt(qty), user.id, productCode)

      return response.ok(stampOrder)
    } catch (error) {
      return response.internalServerError(error)
    }
  }

  async activate({ request, response }) {
    try {
      const { stamp } = request.all()
      const result = await StampModel.query()
        .where('code', stamp.code)
        .update({ status: StampModel.ACTIVATED })

      await StampActivateModel.query()
        .where('code', stamp.code)
        .update({ txn: stamp.txn })

      return response.ok({
        status: 'success',
        data: result
      })
    } catch (error) {
      return response.ok({
        status: 'fail',
        data: error
      })
    }
  }

  async checkActivate({ request, response }) {
    try {
      const { codes } = request.all()
      const stamps = await StampModel.query()
        .whereIn('code', codes)
        .where('status', StampModel.ACTIVATE)
        .fetch()

      response.json({
        status: 'success',
        data: stamps
      })
    } catch (error) {
      response.json({
        status: 'fail',
        data: error
      })
    }
  }

  async createActivate({ request, response, auth }) {
    const user = await auth.getUser()

    try {
      const { codes } = request.all()
      const hash = crypto.createHash('sha256')
      hash.update(codes.toString())
      const name = hash.digest('hex').slice(-16).toLocaleUpperCase()
      const data = codes.map(code => ({ code, name, ownerId: user.id }))
      const activate = await StampActivateModel.createMany(data)

      return response.ok({
        status: 'success',
        data: activate
      })
    } catch (error) {
      return response.error({
        status: 'fail',
        data: error
      })
    }
  }

  async getActivates({ params, response, auth }) {
    const user = await auth.getUser()
    const { page } = params
    const result = await StampActivateModel.query()
      .where('ownerId', user.id)
      .count('name as qty')
      .groupBy('name')
      .select('name')
      .paginate(page, 10)

    return response.ok({
      status: 'success',
      data: result
    })
  }

  async getActivateToName({ params, response }) {
    const { name, page } = params
    const result = await StampActivateModel.query()
      .where('name', name)
      .paginate(page, 10)

    return response.ok({
      status: 'success',
      data: result
    })
  }

  async order({ params, response, auth }) {
    const user = await auth.getUser()
    const { page } = params

    const result = await StampOrderModel.query()
      .where('producerId', user.id)
      .orderBy('created_at', 'desc')
      .paginate(page, 10)

    return response.json({
      status: 'success',
      data: result
    })
  }

  async index({ params, response, auth }) {
    const { orderId, page } = params
    const user = await auth.getUser()

    const stamps = await StampModel.query()
      .where('stampOrderId', orderId)
      .where('producerId', user.id)
      .orderBy('increments', 'asc')
      .paginate(page, 10)

    return response.json({
      status: 'success',
      data: stamps
    })
  }

  async updateTxn({ request, response }) {
    const { stamp } = request.all()
    await StampModel.query()
      .where('code', stamp.code)
      .update({
        "txn": stamp.txn,
        "status": StampModel.INITIATED
      })

    return response.ok()
  }
}

module.exports = StampController
