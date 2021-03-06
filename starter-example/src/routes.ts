import { Router, CustomCacheKey } from '@xdn/core/router'
import { CACHE_SERVICE_WORKER } from './cache'
import JSONP_QUERY_PARAM_WHITELIST from './JSONP_QUERY_PARAM_WHITELIST'

export default new Router()
  .match('/service-worker.js', ({ serveStatic, cache }) => {
    cache(CACHE_SERVICE_WORKER)
    serveStatic('dist/service-worker.js')
  })
  .match('/main.js', ({ serveStatic, cache }) => {
    cache({
      browser: {
        maxAgeSeconds: 0,
      },
      edge: {
        maxAgeSeconds: 60 * 60 * 365,
      },
    })
    serveStatic('dist/browser.js')
  })
  // jsonp from service worker
  .match(
    {
      path: '/fetch-data',
      headers: {
        'x-xdn-from-sw': /1/,
      },
    },
    async ({ cache, send, removeRequestHeader }) => {
      cache({
        browser: {
          maxAgeSeconds: 0,
          serviceWorkerSeconds: 60 * 60,
        },
        edge: {
          maxAgeSeconds: 60 * 60,
          key: new CustomCacheKey().excludeAllQueryParametersExcept(
            ...Array.from(JSONP_QUERY_PARAM_WHITELIST)
          ),
        },
      })

      removeRequestHeader('x-xdn-from-sw')

      send(`jQuery35106546810873918889_1589791355847(${JSON.stringify({ success: true })})`)
    }
  )
  // jsonp without service worker
  .match('/fetch-data', async ({ cache, send }) => {
    send(`jQuery35106546810873918889_1589791355847(${JSON.stringify({ success: true })})`)
  })
  .match('/', ({ serveStatic }) => {
    serveStatic('public/index.html')
  })
  .fallback(({ proxy }) => {
    proxy('origin')
  })
