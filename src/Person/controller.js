const uuid = require("uuid")
const personService = require("../database/persons")
const router = require("../router/index")

const _validateId = (value) => {
  return uuid.validate(value) && uuid.version(value) === 4
}

// Get persons
router.get("/persons", {}, (request, response) => {
  const result = personService.getPersons()

  response.writeHead(201, { "Content-Type": "application/json" })
  response.end(JSON.stringify(result))
})

// Get person by personId
router.get("/person/${personId}", {}, (request, response) => {
  const { personId } = request.params || {}

  if (!_validateId(personId)) {
    response.writeHead(400)
    response.end(
      JSON.stringify({
        message: "Parameter 'personId' is not valid"
      })
    )
  }

  const result = personService.getPerson(personId)

  if (!result) {
    response.writeHead(404)
    response.end(
      JSON.stringify({
        message: "Person not found"
      })
    )

    return
  }

  response.writeHead(201, { "Content-Type": "application/json" })
  response.end(JSON.stringify(result))
})

// Post person
router.post("/person", {}, (request, response) => {
  const result = personService.addPerson(JSON.parse(request.body))

  response.writeHead(201, { "Content-Type": "application/json" })
  response.end(JSON.stringify(result))
})

// Put person
router.put("/person/${personId}", {}, (req, res) => {
  console.log(">> Put person", req, res)

  return ">> 4 PUT PERSON"
})

// Delete person
router.delete("/person/${personId}", {}, (req, res) => {
  console.log(">> Delete person", req, res)

  return ">> 5 DELETE PERSON"
})
