const fs = require('fs')

const updateConfig = (func) => {
  const previous = JSON.parse(fs.readFileSync('config.json'))
  const updated = func(previous)
  fs.writeFileSync('config.json', JSON.stringify(updated, null, 2))
}

const setConfig = (path, val) => {
  const obj = path.split('.').reverse()

  updateConfig((config) => {
    let ref = config
    while (obj.length > 1) {
      const key = obj.pop()
      if (!ref[key]) ref[key] = {}
      ref = ref[key]
    }
    ref[obj.pop()] = val
    return config
  })
}

module.exports = {
  setConfig,
  updateConfig,
}
