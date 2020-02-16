const functions = require('./functions')

class ParcelRoutes {
  constructor (opts) {
    opts = opts || {}

    this.opts = opts
    this.opts.routePrefix = opts.routePrefix || ''
    // this.opts.bodyParser = opts.bodyParser
    // this.opts.bodyParserOptions = opts.bodyParserOptions
    // this.opts.useFramework = opts.useFramework
    // this.opts.useRouter = opts.useRouter

    if (!this.opts.useFramework) {
      throw new Error('Backend framework not specified!')
    }
    if (!this.opts.useRouter) {
      throw new Error('Backend router framework not specified!')
    }
  }

  autofill (parcel, prefix) {
    prefix = prefix || this.opts.routePrefix || ''

    // NOTE: Allow JSON strings
    if (typeof parcel === 'string') {
      parcel = JSON.parse(parcel)
    }

    const routes = Object.keys(parcel)

    for (let i = 0; i < routes.length; i++) {
      const key = routes[i]
      const seq = parcel[key]

      // NOTE: New subseq route
      if (typeof seq === 'object' && seq !== null) {
        this.autofill(seq, prefix + '/' + key)
      } else if (typeof seq === 'function') {
        const routingOpts = {
          router: this.opts.useRouter,
          route: prefix,
          method: key,
          fn: seq,
          bodyParser: 0,
          bodyParserOptions: 0
        }

        if (this.opts.bodyParser) {
          routingOpts.bodyParser = this.opts.bodyParser
          routingOpts.bodyParserOptions = this.opts.bodyParserOptions
        }

        functions[this.opts.useFramework].registerRoute(routingOpts)
      }
    }
  }
}

module.exports = ParcelRoutes
