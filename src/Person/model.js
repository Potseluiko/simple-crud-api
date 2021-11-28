const uuid = require("uuid")

const records = {}

// Now Tests and App have one shared database!
// In a real project this should be improved.
const drop = () => {
  for (const id in records) {
    if (records.hasOwnProperty(id)) {
      delete records[id]
    }
  }
}

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
  drop,
  getAll,
  getById,
  create,
  updateById,
  deleteById
}
