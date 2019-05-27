'use strict'

class AuthController {
  async login({ request, response, auth }) {

    const { username, password } = request.all()

    const token = await auth.withRefreshToken().query(builder => {
      builder
        .innerJoin('role_user', 'users.id', 'role_user.user_id')
        .innerJoin('roles', 'role_user.role_id', 'roles.id')
    }).attempt(username, password, true)

    response.json({
      status: 'success',
      data: token
    })
  }
}

module.exports = AuthController
