const routes = {}

const _registerRoute = (method, path, validators, callback) => {
  routes[path] = routes[path] || {}

  routes[path][method] = {
    path,
    validators,
    callback
  }
}

const getRoute = (path, method) => {
  // Exact match
  let route = routes[path]?.[method.toLowerCase()]

  if (route) {
    return {
      ...route,
      params: {}
    }
  }

  // Match with parameters
  const pathParts = path.split("/").slice(1)
  let params = {}

  const routeKey = Object.keys(routes).find((route) => {
    const routePathParts = route.split("/").slice(1)

    if (pathParts.length !== routePathParts.length) {
      return false
    }

    let allMatch = true
    params = {}

    routePathParts.forEach((part, index) => {
      const matchParam = part.match(/^\${([A-z\d-]+)}$/)

      if (!!matchParam && !!matchParam[1]) {
        params[matchParam[1]] = pathParts[index]
      } else {
        if (pathParts[index] !== part) {
          allMatch = false
        }
      }
    })

    return allMatch
  })

  route = routes[routeKey]?.[method.toLowerCase()]

  if (route) {
    return {
      ...route,
      params
    }
  }

  return null
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
