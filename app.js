const http = require("http")
require("dotenv").config()
const router = require("./src/router")

require("./src/Person")

const requestListener = function (request, response) {
  const currentRoute = router.getRoute(request.url, request.method)

  if (!currentRoute) {
    response.writeHead(404)
    response.end(JSON.stringify({ message: "Route not found" }))

    return
  }

  let body = ""

  request.on("data", (chunk) => {
    body += chunk
  })

  request.on("end", () => {
    try {
      request.body = body
      request.params = currentRoute.params

      currentRoute.callback(request, response)
    } catch (err) {
      response.writeHead(500)
      response.end(JSON.stringify({ message: "Something went wrong!" }))
    }
  })
}

const server = http.createServer(requestListener)
server.listen(process.env.PORT || 8080)
