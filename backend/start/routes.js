'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')
Route.group(() => {
  Route.post('login', 'AuthController.login')
}).prefix('api/v1')

Route.group(() => {
  Route.get('product-type', 'ProductTypeController.index')

  Route.get('stamp/order/:page', 'StampController.order')
  Route.get('stamp/get-activate/:page', 'StampController.getActivates')
  Route.post('stamp/init', 'StampController.init')
  Route.post('stamp/check-activate', 'StampController.checkActivate')
  Route.post('stamp/create-activate', 'StampController.createActivate')
  Route.post('stamp/activate', 'StampController.activate')
  Route.post('stamp/initiated', 'StampController.updateTxn')
  Route.get('stamp/:orderId/:page', 'StampController.index')
  Route.get('stamp/activate/:name/:page', 'StampController.getActivateToName')

}).prefix('api/v1').middleware(['auth', 'is:(producer)'])

