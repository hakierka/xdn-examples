// This file was automatically added by xdn deploy.
// You should commit this file to source control.
const { Router } = require('@xdn/core/router')
const { nextRoutes, renderNextPage } = require('@xdn/next')

const router = new Router()
  .match('/service-worker.js', ({ serviceWorker }) => {
    serviceWorker('.next/static/service-worker.js')
  })
  .match('/_next/data/:build/p/:id.json', ({ cache }) => {
    cache({
      edge: {
        maxAgeSeconds: 60 * 60 * 24,
      },
      browser: {
        serviceWorkerSeconds: 60 * 60,
      },
    })
  })
  .get('/sale', (res) => {
    renderNextPage('/p/[productId]', res, { productId: '1' })
  })
  .get('/compute', ({ compute, send }) => {
    compute((req, res) => {
      send(JSON.stringify({ query: req.query }))
    })
  })
  .use(nextRoutes)
  .fallback((res) => {
    renderNextPage('fallback', res)
  })

module.exports = router
