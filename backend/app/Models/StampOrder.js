'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class StampOrder extends Model {
  static get NEWLY() { return 0 }
  static get GENERATED() { return 1 }

  // static scopeInit(query, qty, producerId, productCode) {
  //   return query.create({
  //     productCode,
  //     producerId,
  //     qty,
  //     status: StampOrder.NEWLY,
  //     created_at: new Date(),
  //     updated_at: new Date()
  //   })
  // }
}

module.exports = StampOrder
