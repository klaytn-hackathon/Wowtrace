'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserProductTypeSchema extends Schema {
  up() {
    this.create('user_product_types', (table) => {
      table.increments()
      table.integer('userId')
      table.specificType('productCode', 'CHAR(2)')
      table.foreign('userId').references('id').inTable('users').onDelete('RESTRICT').onUpdate('CASCADE')
      table.foreign('productCode').references('code').inTable('product_types').onDelete('RESTRICT').onUpdate('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('user_product_types')
  }
}

module.exports = UserProductTypeSchema
