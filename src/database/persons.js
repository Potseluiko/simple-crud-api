const uuid = require("uuid")

const persons = {}

const getPersons = () => Object.values(persons)

const getPerson = (id) => {
  if (!id || !persons[id]) {
    return null
  }

  return persons[id]
}

const addPerson = (data) => {
  const id = uuid.v4()

  persons[id] = {
    ...(data || {}),
    id
  }

  return persons[id]
}

const updatePerson = (id, data) => {
  if (!id || !persons[id]) {
    return null
  }

  persons[id] = {
    ...persons[id],
    ...(data || {}),
    id
  }

  return persons[id]
}

const removePerson = (id) => {
  if (!id || !persons[id]) {
    return null
  }

  delete persons[id]
}

module.exports = {
  getPersons,
  getPerson,
  addPerson,
  updatePerson,
  removePerson
}
