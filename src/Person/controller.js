const uuid = require("uuid")
const router = require("../router/index")
const personModel = require("./model")
const personValidator = require("./validator")

const _validateId = (value) => {
  return uuid.validate(value) && uuid.version(value) === 4
}

// Get persons
router.get("/person", (request, response) => {
  const result = personModel.getAll()

  response.writeHead(200, { "Content-Type": "application/json" })
  response.end(JSON.stringify(result))
})

// Get person by personId
router.get("/person/${personId}", (request, response) => {
  const { personId } = request.params || {}

  if (!_validateId(personId)) {
    response.writeHead(400)
    response.end(JSON.stringify({ message: "Parameter 'personId' is not valid" }))

    return
  }

  const result = personModel.getById(personId)

  if (!result) {
    response.writeHead(404)
    response.end(JSON.stringify({ message: "Person not found" }))

    return
  }

  response.writeHead(200, { "Content-Type": "application/json" })
  response.end(JSON.stringify(result))
})

// Post person
router.post("/person", (request, response) => {
  const data = JSON.parse(request.body) || {}
  const errors = personValidator.validate(data)

  if (errors.length) {
    response.writeHead(400)
    response.end(JSON.stringify({ message: errors.join(" ") }))

    return
  }

  const result = personModel.create(data)

  response.writeHead(200, { "Content-Type": "application/json" })
  response.end(JSON.stringify(result))
})

// Put person
router.put("/person/${personId}", (request, response) => {
  const { personId } = request.params || {}
  const data = JSON.parse(request.body) || {}

  if (!_validateId(personId)) {
    response.writeHead(400)
    response.end(JSON.stringify({ message: "Parameter 'personId' is not valid" }))

    return
  }

  const errors = personValidator.validate(data)

  if (errors.length) {
    response.writeHead(400)
    response.end(JSON.stringify({ message: errors.join(" ") }))

    return
  }

  const result = personModel.updateById(personId, data)

  if (!result) {
    response.writeHead(404)
    response.end(JSON.stringify({ message: "Person not found" }))

    return
  }

  response.writeHead(200, { "Content-Type": "application/json" })
  response.end(JSON.stringify(result))
})

// Delete person
router.delete("/person/${personId}", (request, response) => {
  const { personId } = request.params || {}

  if (!_validateId(personId)) {
    response.writeHead(400)
    response.end(JSON.stringify({ message: "Parameter 'personId' is not valid" }))

    return
  }

  const result = personModel.deleteById(personId)

  if (!result) {
    response.writeHead(404)
    response.end(JSON.stringify({ message: "Person not found" }))

    return
  }

  response.writeHead(204, { "Content-Type": "application/json" })
  response.end(JSON.stringify(result))
})
