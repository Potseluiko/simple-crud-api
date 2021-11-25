const personService = require("../database/persons")
const router = require("../router/index")

router.get("/persons", {}, (request, response) => {
  const result = personService.getPersons()

  response.writeHead(201, { "Content-Type": "application/json" })
  response.end(JSON.stringify(result))
})

router.get("/person/${personId}", {}, (request, response) => {
  // const result = personService.addPerson(JSON.parse(request.body))
  //
  // response.writeHead(201, { "Content-Type": "application/json" })
  // response.end(JSON.stringify(result))
})

router.post("/person", {}, (request, response) => {
  const result = personService.addPerson(JSON.parse(request.body))

  response.writeHead(201, { "Content-Type": "application/json" })
  response.end(JSON.stringify(result))
})

router.put("/person/${personId}", {}, (req, res) => {
  console.log(">> Put person", req, res)

  return ">> 4 PUT PERSON"
})

router.delete("/person/${personId}", {}, (req, res) => {
  console.log(">> Delete person", req, res)

  return ">> 5 DELETE PERSON"
})
