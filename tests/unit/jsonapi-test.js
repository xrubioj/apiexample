const test = require('tape')
const jsonapi = require('../../lib/jsonapi')

test('single object format', async assert => {
  const expected = {
    data: {
      id: '5890a3196d6e65f237d499c8',
      type: 'orders',
      attributes: {
        company: 'PROGENEX',
        email: 'marianacunningham@progenex.com',
        value: 245.05,
        currency: 'EUR',
        tags: ['a', 'b', 'c']
      }
    }
  }

  const actual = await jsonapi({
    id: '5890a3196d6e65f237d499c8',
    type: 'orders',
    company: 'PROGENEX',
    email: 'marianacunningham@progenex.com',
    value: 245.05,
    currency: 'EUR',
    tags: ['a', 'b', 'c'],
    meta: [{}],
    '$loki': 7
  })

  assert.deepEqual(actual, expected, 'json api transformation')
  assert.end()
})

test('list format', async assert => {
  const expected = {
    data: [{
      id: '1',
      type: 'orders',
      attributes: {
        company: 'CMP1'
      }
    },
      {
        id: '2',
        type: 'orders',
        attributes: {
          company: 'CMP2'
        }
      }
    ]
  }

  const actual = await jsonapi([{
    id: '1',
    type: 'orders',
    company: 'CMP1'
  }, {
    id: '2',
    type: 'orders',
    company: 'CMP2'
  }])

  assert.deepEqual(actual, expected, 'json api transformation')
  assert.end()
})
