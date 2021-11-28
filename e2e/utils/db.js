const { drop } = require("../../src/Person/model")

const dropDb = () => {
  drop()
}

module.exports = {
  dropDb
}
