'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserProductType extends Model {
  productType() {
    return this.belongsTo('App/Models/ProductType', 'productCode', 'code')
  }
}

module.exports = UserProductType
