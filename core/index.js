'use strict'

/**
 * Dependencies.
 */

const pino = require('pino')
const Emitter = require('events')
const Loki = require('lokijs')
const seeders = require('../seeders/orders')

/**
 * Expose `Application` class.
 * Inherits from `Emitter.prototype`.
 */

module.exports = class Core extends Emitter {
  /**
   * Initialize a new `Core`.
   *
   * @api public
   */

  constructor () {
    super()

    this.config = require('../config')
    this.log = pino({
      name: 'api',
      timestamp: false,
      level: this.config.logLevel
    })

    let db = new Loki('orders.db')
    db.orders = db.addCollection('orders')
    seeders.forEach(seeder => {
      db.orders.insert(seeder)
    })

    this.db = {
      list () {
        return new Promise((resolve, reject) => {
          return resolve(db.orders.find({
            'type': 'orders'
          }))
        })
      },
      get (id) {
        return new Promise((resolve, reject) => {
          return resolve(db.orders.findOne({id: id}))
        })
      }
    }
  }
}
