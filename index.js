const { getPersons, getPerson, addPerson, updatePerson, removePerson } = require("./src/database/persons")

console.log("Get persons:", getPersons())

// Add person 1
const dataPerson1 = {
  name: "Alex",
  age: 12,
  hobbies: ["surfing", "reading"]
}
const person1 = addPerson(dataPerson1)
console.log("Add person:", dataPerson1)
console.log(" >>> Person is added: ", person1)

// Add person 2
const dataPerson2 = { id: "ABC-2222", name: "Sasha Potseluiko" }
const person2 = addPerson(dataPerson2)
console.log("Add person:", dataPerson2)
console.log(" >>> Person is added: ", person2)

console.log("Get persons:", getPersons())

// Get person
console.log("Get person:", person1.id)
console.log(" >>> Person is: ", getPerson(person1.id))

// Update person
const newDataPerson2 = { id: "ABC-2222", name: "Sasha Ilyashenko" }
const newPerson2 = updatePerson(person2.id, newDataPerson2)
console.log("Update person:", person2.id, newDataPerson2)
console.log(" >>> Person is updated: ", newPerson2)

console.log("Get persons:", getPersons())

// Remove person
console.log("Delete person 1:", person1.id)
console.log(" >>> Person is removed: ", removePerson(person1.id))

console.log("Get persons:", getPersons())
