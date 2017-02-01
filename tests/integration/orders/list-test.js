'use strict'

const test = require('tape')
const request = require('supertest')
const api = require('../../../api')

test('GET /orders', assert => {
  request(api)
    .get('/orders')
    .end((error, res) => {
      if (error) {
        assert.fail(error)
        assert.end()
      }

      console.log(res)
      assert.end()
    })
})
