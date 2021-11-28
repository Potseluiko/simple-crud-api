const { request } = require("http")
const { port } = require("./const")

const wrappedRequest = (options, data) => {
  return new Promise((resolve) => {
    const req = request(options, (res) => {
      let buffer = ""

      res.on("data", (d) => {
        buffer += d
      })

      res.on("end", () => {
        if (buffer) {
          try {
            resolve({
              status: res.statusCode,
              body: JSON.parse(buffer.toString())
            })
          } catch (error) {
            resolve({
              status: res.statusCode,
              body: buffer.toString()
            })
          }
        } else {
          resolve({ status: res.statusCode, body: null })
        }
      })
    })

    req.on("error", (error) => {
      console.error(error)
    })

    if (data) {
      req.write(data)
    }
    req.end()
  })
}

const getRequest = (path) => {
  return wrappedRequest({
    hostname: "localhost",
    port,
    path,
    method: "GET"
  })
}

const postRequest = (path, data) => {
  const body = JSON.stringify(data)

  return wrappedRequest(
    {
      hostname: "localhost",
      port,
      path,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": body.length
      }
    },
    body
  )
}

const putRequest = (path, data) => {
  const body = JSON.stringify(data)

  return wrappedRequest(
    {
      hostname: "localhost",
      port,
      path,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": body.length
      }
    },
    body
  )
}

const deleteRequest = (path) => {
  return wrappedRequest({
    hostname: "localhost",
    port,
    path,
    method: "DELETE"
  })
}

module.exports = {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest
}
