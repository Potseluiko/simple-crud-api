const uuid = require("uuid")

const records = {}

const getAll = () => Object.values(records)

const getById = (id) => {
  if (!id || !records[id]) {
    return null
  }

  return records[id]
}

const create = (data) => {
  const id = uuid.v4()

  records[id] = {
    ...(data || {}),
    id
  }

  return records[id]
}

const updateById = (id, data) => {
  if (!id || !records[id]) {
    return null
  }

  records[id] = {
    ...records[id],
    ...(data || {}),
    id
  }

  return records[id]
}

const deleteById = (id) => {
  if (!id || !records[id]) {
    return null
  }

  delete records[id]

  return { id }
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
}
