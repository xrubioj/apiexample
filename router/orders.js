'use strict'

const Router = require('koa-router')
const jsonapi = require('../lib/jsonapi')

module.exports = (api, core) => {
  let router = Router({
    prefix: '/orders'
  })

  api
    .use(router.routes())
    .use(router.allowedMethods())

  router.get('/', async (ctx) => {
    try {
      const list = await core.db.list()
      const transformed = await jsonapi(list)

      ctx.body = transformed
    } catch (e) {
      ctx.body = e
    }
  })

  router.get('/:id', async (ctx) => {
    try {
      const order = await core.db.get(ctx.params.id)
      const transformed = await jsonapi(order)

      ctx.body = transformed
    } catch (e) {
      ctx.body = e
    }
  })
}
