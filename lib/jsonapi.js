module.exports = exports = function jsonapi (input) {
  return new Promise((resolve, reject) => {
    let output = {}

    if (input instanceof Array) {
      output = {
        data: input.map((item) => {
          return single(item)
        })
      }
    } else {
      output = {
        data: single(input)
      }
    }

    return resolve(output)
  })
}

const single = function (item) {
  let output = {
    id: item.id,
    type: item.type,
    attributes: {}
  }

  delete item.id
  delete item.type
  delete item.$loki
  delete item.meta

  output.attributes = item

  return output
}
