const personService = require("../database/persons")
const route = require("../route/index")

route.get("/", {}, (req, res, next) => {
  console.log(">> 1) GET /", req, res)

  return ">> 2) GET /"

  // const personDTO = req.body

  // save into DB
  // const person = personService.addPerson(personDTO)

  // return res.json()
})
