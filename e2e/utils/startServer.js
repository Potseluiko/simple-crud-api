const http = require("http")
const app = require("../../app")
const { port } = require("./const")

const startServer = () => {
  const server = http.createServer(app)
  server.listen(port)

  return server
}

module.exports = { startServer }
