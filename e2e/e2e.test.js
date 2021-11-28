const { deleteRequest, getRequest, postRequest, putRequest } = require("./utils/requests")
const { startServer } = require("./utils/startServer")
const { dropDb } = require("./utils/db")

let server

beforeAll(async () => {
  server = startServer()
})

beforeEach(() => dropDb())

afterAll(() => {
  server.close()
})

test("e2e scenario 1", async () => {
  const emptyPersonsResponse = await getRequest("/person")
  expect(emptyPersonsResponse.status).toBe(200)
  expect(emptyPersonsResponse.body).toEqual([])

  const personBody = { name: "Karl", age: 75, hobbies: ["shmot"] }
  const newPersonResponse = await postRequest("/person", personBody)
  expect(newPersonResponse.status).toBe(201)
  expect(newPersonResponse.body).toEqual(expect.objectContaining({ id: expect.any(String), ...personBody }))

  const personId = newPersonResponse.body.id
  const createdPeronResponse = await getRequest(`/person/${personId}`)
  expect(createdPeronResponse.status).toBe(200)
  expect(createdPeronResponse.body).toEqual({ id: personId, ...personBody })

  const updatedPersonBody = {
    ...createdPeronResponse.body,
    name: "Karl Lagerfeld"
  }
  const updatedPersonResponse = await putRequest(`/person/${personId}`, updatedPersonBody)
  expect(updatedPersonResponse.status).toBe(200)
  expect(updatedPersonResponse.body).toEqual(updatedPersonBody)

  const deleteResponse = await deleteRequest(`/person/${personId}`)
  expect(deleteResponse.status).toBe(204)
  expect(deleteResponse.body).toBeNull()

  const tryPersonResponse = await getRequest(`/person/${personId}`)
  expect(tryPersonResponse.status).toBe(404)
})

test("e2e scenario 2", async () => {
  const emptyResponse = await getRequest("/some/non/existing/resource")
  expect(emptyResponse.status).toBe(404)
  expect(emptyResponse.body).toEqual({ message: "Route not found" })
})

test("e2e scenario 3", async () => {
  // Get all persons => empty list of persons
  const emptyPersonsResponse1 = await getRequest("/person")
  expect(emptyPersonsResponse1.status).toBe(200)
  expect(emptyPersonsResponse1.body).toEqual([])

  // Add person with NOT valid data
  const personBody1 = {}
  const newPersonResponse1 = await postRequest("/person", personBody1)
  expect(newPersonResponse1.status).toBe(400)
  expect(newPersonResponse1.body).toEqual({ message: "Name is required. Age is required. Hobbies is required." })

  // Add person with NOT valid data
  const personBody2 = { name: "Karl" }
  const newPersonResponse2 = await postRequest("/person", personBody2)
  expect(newPersonResponse2.status).toBe(400)
  expect(newPersonResponse2.body).toEqual({ message: "Age is required. Hobbies is required." })

  // Add person with NOT valid data
  const personBody3 = { name: "Karl", age: 75 }
  const newPersonResponse3 = await postRequest("/person", personBody3)
  expect(newPersonResponse3.status).toBe(400)
  expect(newPersonResponse3.body).toEqual({ message: "Hobbies is required." })

  // Get all persons => empty list of persons
  const emptyPersonsResponse2 = await getRequest("/person")
  expect(emptyPersonsResponse2.status).toBe(200)
  expect(emptyPersonsResponse2.body).toEqual([])

  // Add person with valid data
  const personBody4 = { name: "Karl", age: 75, hobbies: [] }
  const newPersonResponse4 = await postRequest("/person", personBody4)
  expect(newPersonResponse4.status).toBe(201)
  expect(newPersonResponse4.body).toEqual(expect.objectContaining({ id: expect.any(String), ...personBody4 }))

  // Get all persons => person is in list
  const personsResponse3 = await getRequest("/person")
  expect(personsResponse3.status).toBe(200)
  expect(personsResponse3.body).toEqual([{ id: expect.any(String), ...personBody4 }])
})

test("e2e scenario 4", async () => {
  const emptyPersonsResponse = await getRequest("/person")
  expect(emptyPersonsResponse.status).toBe(200)
  expect(emptyPersonsResponse.body).toEqual([])

  const deleteResponse1 = await deleteRequest(`/person`)
  expect(deleteResponse1.status).toBe(404)
  expect(deleteResponse1.body).toEqual({ message: "Route not found" })

  const deleteResponse2 = await deleteRequest(`/person/123`)
  expect(deleteResponse2.status).toBe(400)
  expect(deleteResponse2.body).toEqual({ message: "Parameter 'personId' is not valid" })

  const deleteResponse3 = await deleteRequest(`/person/bdada5bc-e73b-46ed-979c-40d11b2c3229`)
  expect(deleteResponse3.status).toBe(404)
  expect(deleteResponse3.body).toEqual({ message: "Person not found" })
})
