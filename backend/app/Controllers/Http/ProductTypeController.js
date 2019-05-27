'use strict'
const UserProductTypeModel = use('App/Models/UserProductType')

class ProductTypeController {
  async index({ response, auth }) {
    const user = await auth.getUser()
    const userProductType = await UserProductTypeModel.query()
      .where('userId', user.id)
      .with('productType')
      .fetch()

    response.json({
      status: 'success',
      data: userProductType
    })
  }
}

module.exports = ProductTypeController
