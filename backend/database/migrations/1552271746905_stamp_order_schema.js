'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StampOrderSchema extends Schema {
  up() {
    this.create('stamp_orders', (table) => {
      table.increments()
      table.specificType('productCode', 'CHAR(2)')
      table.string('name').unique()
      table.integer('producerId').notNullable()
      table.specificType('status', 'smallint').notNullable().defaultTo(0)
      table.integer('qty').notNullable()
      table.string('url')
      table.bigInteger('increments').notNullable().defaultTo(0)
      table.timestamps()
      table.foreign('productCode').references('code').inTable('product_types').onDelete('RESTRICT').onUpdate('CASCADE')
      table.foreign('producerId').references('id').inTable('users').onDelete('RESTRICT').onUpdate('CASCADE')
    })
  }

  down() {
    this.drop('stamp_orders')
  }
}

module.exports = StampOrderSchema
