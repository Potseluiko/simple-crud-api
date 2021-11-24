const http = require("http")

// ...
require("./src/Person/controller")
const { routes } = require("./src/route")

const DB_PERSONS = require("./src/database/persons")

const requestListener = function (req, res) {
  // const urlParts = req.url.split("/")
  console.log("START! req = ", req.method, req.url)

  if (req.method === "GET") {
    const currentRoute = routes.get[req.url]

    if (!currentRoute) {
      res.writeHead(404)
      res.end("Page not found")
    } else {
      console.log("EMD! req = ", currentRoute.callback(req, res))

      res.writeHead(200)
      res.end(currentRoute.callback(req, res))
    }
  } else {
    res.writeHead(200)
    res.end()
  }
}

const server = http.createServer(requestListener)
server.listen(9900)
