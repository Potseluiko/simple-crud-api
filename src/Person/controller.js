const personService = require("../database/persons")
const router = require("../router/index")

router.get("/persons", {}, (req, res, next) => {
  console.log(">> All persons", req, res)

  return ">> 1 GET ALL PERSONS"

  // const personDTO = req.body

  // save into DB
  // const person = personService.addPerson(personDTO)

  // return res.json()
})

router.get("/person/${personId}", {}, (req, res, next) => {
  console.log(">> Person", req, res)

  return ">> 2 GET PERSON"
})

router.post("/person", {}, (req, res, next) => {
  console.log(">> Post person", req, res)

  return ">> 3 POST PERSON"
})

router.put("/person/${personId}", {}, (req, res, next) => {
  console.log(">> Put person", req, res)

  return ">> 4 PUT PERSON"
})

router.delete("/person/${personId}", {}, (req, res, next) => {
  console.log(">> Delete person", req, res)

  return ">> 5 DELETE PERSON"
})
