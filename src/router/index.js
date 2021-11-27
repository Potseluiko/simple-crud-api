const routes = {}

const _registerRoute = (method, path, callback) => {
  routes[path] = routes[path] || {}

  routes[path][method] = {
    path,
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

const get = (path, callback) => _registerRoute("get", path, callback)

const post = (path, callback) => _registerRoute("post", path, callback)

const put = (path, callback) => _registerRoute("put", path, callback)

const deleteFn = (path, callback) => _registerRoute("delete", path, callback)

module.exports = {
  getRoute,
  get,
  post,
  put,
  delete: deleteFn
}
