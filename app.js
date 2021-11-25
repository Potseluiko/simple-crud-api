const http = require("http")

// ...
require("./src/Person/controller")
const { getRoute } = require("./src/router")

const requestListener = function (req, res) {
  // const urlParts = req.url.split("/")
  console.log("START! req = ", req.method, req.url)

  const currentRoute = getRoute(req.method, req.url)

  if (!currentRoute) {
    res.writeHead(404)
    res.end(
      JSON.stringify({
        message: "Page not found"
      })
    )
  } else {
    console.log("EMD! req = ", currentRoute.callback(req, res))

    res.writeHead(200)
    res.end(currentRoute.callback(req, res))
  }
}

const server = http.createServer(requestListener)
server.listen(9900)
