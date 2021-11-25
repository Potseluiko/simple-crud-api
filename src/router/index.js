const routes = {}

const _registerRoute = (method, path, validators, callback) => {
  routes[path] = routes[path] || {}

  routes[path][method] = {
    path,
    validators,
    callback
  }
}

const getRoute = (method, path) => {
  return routes[path]?.[method.toLowerCase()] || null
}

const get = (path, validators, callback) => _registerRoute("get", path, validators, callback)

const post = (path, validators, callback) => _registerRoute("post", path, validators, callback)

const put = (path, validators, callback) => _registerRoute("put", path, validators, callback)

const deleteFn = (path, validators, callback) => _registerRoute("delete", path, validators, callback)

module.exports = {
  getRoute,
  get,
  post,
  put,
  delete: deleteFn
}
