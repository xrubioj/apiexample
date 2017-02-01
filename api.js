'use strict'

/**
 * Dependencies.
 */

const Koa = require('koa')
const convert = require('koa-convert')
const handleError = require('koa-handle-error')
const body = require('koa-better-body')
const json = require('koa-json')
const conditional = require('koa-conditional-get')

/**
 * Prototype.
 */

const Core = require('./core')
const Router = require('./router')

const app = new Koa()
const core = new Core()

const onError = err => {
  core.log.error(err)
}

/**
 * Middleware.
 */

app
  .use(handleError(onError))
  .use(convert(body()))
  .use(convert(json()))
  .use(conditional())

Router(app, core)

app.listen(3000, () => console.log('server started 3000'))

module.exports = exports = app
