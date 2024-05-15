require('dotenv').config()

export default {
  head: {
    title: 'the-bridge',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap'
      }
    ]
  },

  loading: {
    color: '#1374f6'
  },

  css: ['element-ui/lib/theme-chalk/index.css', '@/theme/main.scss'],

  components: {
    dirs: [
      '~/components',
      { path: '~/components/admin/', prefix: '' },
      { path: '~/components/ui/navbar/', prefix: '' },
      { path: '~/components/ui/others/', prefix: '' },
      { path: '~/components/ui/filters/', prefix: '' },
      { path: '~/components/ui/user/', prefix: '' },
      { path: '~/components/ui/aside/', prefix: '' },
      { path: '~/components/ui/footer/', prefix: '' },
      { path: '~/components/ui/posts/', prefix: '' },
      { path: '~/components/ui/wrap/', prefix: '' },
      { path: '~/components/ui/messages/', prefix: '' },
      { path: '~/components/ui/form/', prefix: '' },
      { path: '~/components/ui/selects/', prefix: '' },
      { path: '~/components/ui/sort/', prefix: '' },
      { path: '~/components/ui/popup/', prefix: '' }
    ]
  },

  plugins: [
    '@/plugins/globals',
    '@/plugins/axios',
    { src: '@/plugins/vue-awesome-swiper', mode: 'client' },
    { src: '@/plugins/socket', mode: 'client' }
  ],

  styleResources: {
    scss: ['@/theme/vars.scss'],
    hoistUseStatements: true
  },

  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/style-resources',
    '@nuxtjs/moment'
  ],

  moment: {
    locales: ['ru']
  },

  image: {
    presets: {
      comments: {
        modifiers: {
          fit: 'cover',
          format: 'webp',
          width: 40,
          height: 40
        }
      },
      settings: {
        modifiers: {
          fit: 'cover',
          format: 'webp',
          width: 34,
          height: 34
        }
      },
      offer: {
        modifiers: {
          fit: 'cover',
          format: 'webp',
          width: 56,
          height: 56
        }
      },
      work: {
        modifiers: {
          fit: 'cover',
          format: 'webp',
          width: 282,
          height: 180
        }
      },
      avatar: {
        modifiers: {
          fit: 'cover',
          format: 'webp',
          width: 150,
          height: 150
        }
      }
    }
  },

  serverMiddleware: {
    '/_ipx': '~/api/ipx',
    '/api': '~/api',
    '/': '~/api/socket'
  },

  modules: [
    '@nuxt/image',
    'nuxt-clipboard',
    '@nuxtjs/i18n',
    '@nuxtjs/axios',
    '@nuxtjs/svg',
    'vue-scrollto/nuxt',
    ['vue-scrollto/nuxt', { duration: 300 }],
    '@nuxtjs/dotenv'
  ],

  clipboard: {
    autoSetContainer: true
  },

  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000'
  },

  env: {
    appName: 'Lavzee'
  },

  build: {
    transpile: [/^element-ui/],
    extend: function (config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
      config.node = {
        fs: 'empty'
      }
    }
  }
}
