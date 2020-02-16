const definitions = require('../../definitions')
const log = require('../../log')

const registerRoute = opts => {
  log('defined route for ' + opts.method + ': ' + opts.route)

  if (opts.bodyParser && definitions.methodsRequiresBody.includes(opts.method)) {
    opts.router[opts.method](opts.route, opts.bodyParser(opts.bodyParserOptions), opts.fn)
  } else {
    opts.router[opts.method](opts.route, opts.fn)
  }
}

module.exports = registerRoute
