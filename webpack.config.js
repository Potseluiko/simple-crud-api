const path = require("path")

module.exports = {
  target: "node",
  entry: "./app.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist"),
    clean: true
  }
}
