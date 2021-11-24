const routes = {
  get: {},
  post: {},
  put: {},
  delete: {}
}

const get = (path, validators, callback) => {
  routes.get[path] = {
    path,
    validators,
    callback
  }
}

const post = (path, validators, callback) => {
  routes.post[path] = {
    path,
    validators,
    callback
  }
}

const patch = (path, validators, callback) => {
  routes.put[path] = {
    path,
    validators,
    callback
  }
}

const deleteFn = (path, validators, callback) => {
  routes.delete[path] = {
    path,
    validators,
    callback
  }
}

module.exports = {
  routes,
  get,
  post,
  patch,
  delete: deleteFn
}
