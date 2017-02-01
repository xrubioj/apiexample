const test = require('tape')
const Core = require('../../core')
const core = new Core()

test('log', async assert => {
  const expected = 7
  const actual = await core.db.list()

  assert.equal(actual.length, expected)
  assert.end()
})
