'use strict'
const generate = require('nanoid/generate')
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

// Factory.blueprint('App/Models/User', (faker) => {
//   return {
//     username: faker.username()
//   }
// })

Factory.blueprint('App/Models/User', (faker, i, data) => {
  return {
    code: data.code || generate(alphabet, 4),
    username: data.username || faker.username(),
    email: data.email || faker.email(),
    password: data.password || '111111',
    firstname: data.firstname || faker.first(),
    lastname: data.lastname || faker.last(),
    title: data.title || faker.prefix(),
    phone: data.phone || faker.phone(),
    address: data.address || faker.address(),
    etherAddress: data.ether_address || null
  }
})

Factory.blueprint('App/Models/ProductType', (faker, i, data) => {
  return {
    code: data.code || generate(alphabet, 4),
    name: data.name || faker.name(),
    description: data.description || generate(alphabet, 128),
  }
})

Factory.blueprint('App/Models/UserProductType', (faker, i, data) => {
  return {
    userId: data.userId || 0,
    productCode: data.productCode || 0,
  }
})
