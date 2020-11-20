'use strict'

// This file was automatically added by xdn deploy.
// You should commit this file to source control.

module.exports = {
  server: {
    path: 'dist/spartacus-ex/server/main.js',
    export: 'app',
  },
  backends: {
    commerce: {
      domainOrIp: 'aemspartacusapi.tmg.codes',
      hostHeader: 'aemspartacusapi.tmg.codes',
    },
  },
}