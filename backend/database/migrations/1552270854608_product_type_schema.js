'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductTypeSchema extends Schema {
  up() {
    this.create('product_types', (table) => {
      table.increments()
      table.specificType('code', 'CHAR(2)').unique()
      table.string('name')
      table.string('description')
      table.timestamps()
    })
  }

  down() {
    this.drop('product_types')
  }
}

module.exports = ProductTypeSchema
