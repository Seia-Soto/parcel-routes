# parcel-routes

The JavaScript object based routing autofill library.

## Table of Contents

- [Installation](#installation)
- [Coverage](#coverage)
  - [Supported backend](#supported-backend)
- [Usage](#usage)
  - [Example](#example)

----

# Installation

- Yarn

```sh
yarn add parcel-routes
```

- NPM

```sh
npm install parcel-routes
```

## via git-scm

You can install this library via GitHub repository.

- Yarn

```sh
yarn add https://github.com/Seia-Soto/parcel-routes.git
```

- NPM

```sh
npm install Seia-Soto/parcel-routes
```

# Coverage

## Supported backend

- [Koa](#koa)

### Koa

- Recognizable name (use for `useFramework`): `koa`
- External body parser: `koa-body`
- External router library: `koa-router`

# Usage

This library exports one class named `ParcelRoutes`.

## Example

```js
const Koa = require('koa')
const Router = require('koa-router')
const ParcelRoutes = require('parcel-routes')
const useBody = require('koa-body')

const app = new Koa()
const router = new Router()
const parcelRouter = new ParcelRoutes({
  routePrefix: '', // NOTE: Optional, The prefix of each route.
  bodyParser: useBody, // NOTE: Optional, body-parser middleware required by backend such as Koa.
  bodyParserOptions: { // NOTE: Optional, the options to run body parser. If body parser should be configured in library level(as middleware) such as usage of `koa-body` and `koa-router`.
    multipart: true // NOTE: Example of `koa-body`.
  },
  useFramework: 'koa', // NOTE: Required, the lower case letters of framework name(ref -> #supported-backend).
  useRouter: router // NOTE: Required, the router library of the backend framework(ref -> #supported-backend).
})

const routes = {
  api: {
    get: async ctx => {
      ctx.body = 'GET: /api' // NOTE: Export these response functions to the set of handlers.
    },
    post: async ctx => {
      ctx.body = JSON.stringify(ctx.request.body)
    }
  }
}

parcelRouter.autofill(routes)

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000)
```
