let webpack

try {
  require('dotenv').config();
  webpack = require('webpack')
} catch (e) {
  // will get here in the cloud, but we can just catch this error because webpack is only needed during the build phase
}

export default {
  mode: 'universal',
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport',
        content: 'width=device-width, initial-scale=1' },
      { hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico' }
    ],
    script: []
  },
  loading: { color: '#fff' },
  router: {
    middleware: ['checkout']
  },
  buildModules: [
    // to core
    '@nuxt/typescript-build',
    ['@vue-storefront/nuxt', {
      coreDevelopment: true,
      useRawSource: {
        dev: [
          '@vue-storefront/commercetools',
          '@vue-storefront/core'
        ],
        prod: [
          '@vue-storefront/commercetools',
          '@vue-storefront/core'
        ]
      }
    }],
    ['@vue-storefront/nuxt-theme'],
    ['@vue-storefront/commercetools/nuxt', {
      api: {
        uri: 'https://api.commercetools.com/vsf-ct-dev/graphql',
        authHost: 'https://auth.sphere.io',
        projectKey: 'vsf-ct-dev',
        clientId: 'xlea3xo3vcavMN5kmDlFP4nu',
        clientSecret: 'JejrKtQgU_KkNxPn_96UEAaEoPocNFqy',
        scopes: [
          'create_anonymous_token:vsf-ct-dev',
          'manage_my_orders:vsf-ct-dev',
          'manage_my_profile:vsf-ct-dev',
          'manage_my_shopping_lists:vsf-ct-dev',
          'manage_my_payments:vsf-ct-dev',
          'view_products:vsf-ct-dev',
          'view_published_products:vsf-ct-dev'
        ]
      },
      i18n: {
        useNuxtI18nConfig: true
      },
    }],
    'nuxt-i18n',
    'cookie-universal-nuxt',
    'vue-scrollto/nuxt',
    '@xdn/nuxt/module'
  ],
  modules: [
  ],
  i18n: {
    currency: 'USD',
    country: 'US',
    countries: [
      { name: 'US',
        label: 'United States' },
      { name: 'AT',
        label: 'Austria' },
      { name: 'DE',
        label: 'Germany' },
      { name: 'NL',
        label: 'Netherlands' }
    ],
    currencies: [
      { name: 'EUR',
        label: 'Euro' },
      { name: 'USD',
        label: 'Dollar' }
    ],
    locales: [
      {
        code: 'en',
        label: 'English',
        file: 'en.js',
        iso: 'en'
      },
      {
        code: 'de',
        label: 'German',
        file: 'de.js',
        iso: 'de'
      }
    ],
    defaultLocale: 'en',
    lazy: true,
    seo: true,
    langDir: 'lang/',
    vueI18n: {
      fallbackLocale: 'en'
    },
    detectBrowserLanguage: {
      cookieKey: 'vsf-locale'
    }
  },
  build: webpack && {
    transpile: [
      'vee-validate/dist/rules'
    ],
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': JSON.stringify({
          // eslint-disable-next-line global-require
          version: require('./package.json').version,
          lastCommit: process.env.LAST_COMMIT || ''
        })
      })
    ]
  }
};
