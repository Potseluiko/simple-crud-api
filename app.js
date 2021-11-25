const http = require("http")
const { getRoute } = require("./src/router")

// ...
require("./src/Person/controller")

const requestListener = function (request, response) {
  const currentRoute = getRoute(request.method, request.url)

  if (!currentRoute) {
    response.writeHead(404)
    response.end(
      JSON.stringify({
        message: "Page not found"
      })
    )

    return
  }

  let body = ""

  request.on("data", (chunk) => {
    body += chunk
  })

  request.on("end", () => {
    try {
      console.log("...", body)

      request.body = body

      currentRoute.callback(request, response)
    } catch (err) {
      response.writeHead(500)
      response.end(
        JSON.stringify({
          message: "Something went wrong!"
        })
      )
    }
  })
}

const server = http.createServer(requestListener)
server.listen(9900)
