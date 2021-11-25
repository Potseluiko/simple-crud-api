const personService = require("../database/persons")
const router = require("../router/index")

router.get("/persons", {}, (req, res) => {
  console.log(">> All persons", req, res)

  return ">> 1 GET ALL PERSONS"

  // const personDTO = req.body

  // save into DB
  // const person = personService.addPerson(personDTO)

  // return res.json()
})

router.get("/person/${personId}", {}, (req, res) => {
  console.log(">> Person", req, res)

  return ">> 2 GET PERSON"
})

router.post("/person", {}, (request, response) => {
  // const personDTO = req.body

  console.log(">> Post person", request.body)

  response.writeHead(201, { "Content-Type": "application/json" })
  response.end(JSON.stringify(request.body))
})

router.put("/person/${personId}", {}, (req, res) => {
  console.log(">> Put person", req, res)

  return ">> 4 PUT PERSON"
})

router.delete("/person/${personId}", {}, (req, res) => {
  console.log(">> Delete person", req, res)

  return ">> 5 DELETE PERSON"
})
