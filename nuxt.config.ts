import { resolve } from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },

  modules: [
    '@nuxtjs/google-fonts',
    'nuxt-security',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-icon',
    '@element-plus/nuxt',
    '@nuxt/image',
    '@hebilicious/authjs-nuxt',
    '@vee-validate/nuxt',
    'nuxt-swiper',
    'nuxt-schema-org',
    '@sidebase/nuxt-pdf',
    '@vueuse/nuxt',
    'nuxt-delay-hydration',
    '@nuxtjs/partytown'
  ],

  partytown: {
    forward: ['dataLayer.push']
  },

  image: {
    inject: true,
    quality: 80,
    format: ['webp'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536
    }
  },

  devServer: {
    host: '0.0.0.0',
    port: 3300
  },

  alias: {
    cookie: resolve(__dirname, 'node_modules/cookie')
  },

  site: {
    url: process.env.MAIN_BASE_URL,
    name: 'Arjunaa Academy For Achievers',
    trailingSlash: false
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Arjunaa Academy',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=1, minimum-scale=1, maximum-scale=5' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      script: [
        { innerHTML: 'document.addEventListener("DOMContentLoaded", function() { window.addEventListener(\'scroll\', function() { if (window.scrollY > 150) { document.getElementById(\'navbar\').classList.add(\'is-sticky\'); } else { document.getElementById(\'navbar\').classList.remove(\'is-sticky\'); }});});', async: true },
        { innerHTML: '!function(t,e){t.artibotApi={l:[],t:[],on:function(){this.l.push(arguments)},trigger:function(){this.t.push(arguments)}};var a=!1,i=e.createElement("script");i.async=!0,i.type="text/javascript",i.src="https://app.artibot.ai/loader.js",e.getElementsByTagName("head").item(0).appendChild(i),i.onreadystatechange=i.onload=function(){if(!(a||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState)){new window.ArtiBot({i:"2c848ffb-661a-45fc-ab7b-b7705235191f"});a=!0}}}(window,document);', async: true },
        { src: 'https://www.googletagmanager.com/gtag/js?id=GTM-N5WS2TC', async: true, type: 'text/partytown' }
      ]
    }
  },

  css: [
    '~/assets/main/bootstrap.min.css',
    '~/assets/fonts/flaticon.css',
    '~/assets/main/style.css',
    '~/assets/main/extra.css',
    // '~/assets/main/style-2.css',
    '~/assets/main/responsive.css'
  ],

  build: {
    transpile: ['vue-toastification']
  },

  runtimeConfig: {
    public: {
      apiURL: process.env.API_BASE_URL,
      mainURL: process.env.MAIN_BASE_URL,
      RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
      authJs: { // You can generate one with `openssl rand -base64 32`
        baseUrl: process.env.NUXT_NEXTAUTH_URL, // The URL of your deployed app (used for origin Check in production)
        verifyClientOnEveryRequest: false, // whether to hit the /auth/session endpoint on every client request
        guestRedirectTo: '/auth/sign-in', // The path to redirect to when a user is not authenticated
        authenticatedRedirectTo: '/profile'
      }
    },
    private: {
      apiURL: process.env.API_BASE_URL,
      mainURL: process.env.MAIN_BASE_URL,
      RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
      authJs: {
        secret: process.env.NUXT_NEXTAUTH_SECRET
      }
    }
  },

  swiper: {
    // Swiper options
    prefix: 'Swiper',
    styleLang: 'css',
    modules: ['autoplay', 'navigation', 'pagination'] // all modules are imported by default
  },

  delayHydration: {
    mode: 'mount',
    // enables nuxt-delay-hydration in dev mode for testing
    // NOTE: you should disable this once you've finished testing, it will break HMR
    debug: process.env.NODE_ENV === 'development'
  },

  security: {
    // Options
    nonce: true, // Enables HTML nonce support in SSR mode
    ssg: {
      hashScripts: true, // Enables CSP hash support for scripts in SSG mode
      hashStyles: false // Disables CSP hash support for styles in SSG mode (recommended)
    },
    headers: {
      permissionsPolicy: {
        'picture-in-picture': 'self',
        fullscreen: 'self'
      },
      crossOriginEmbedderPolicy: 'unsafe-none',
      crossOriginOpenerPolicy: 'same-origin-allow-popups',
      crossOriginResourcePolicy: 'cross-origin',
      referrerPolicy: 'strict-origin-when-cross-origin',
      xFrameOptions: 'SAMEORIGIN',
      xContentTypeOptions: 'nosniff',
      strictTransportSecurity: {
        maxAge: 15552000,
        includeSubdomains: true,
        preload: true
      },
      xXSSProtection: '1',
      contentSecurityPolicy: {
        'script-src': [
          "'self'", // Fallback value, will be ignored by most modern browsers (level 3)
          'https:', // Fallback value, will be ignored by most modern browsers (level 3)
          "'unsafe-inline'", // Fallback value, will be ignored by almost any browser (level 2)
          "'strict-dynamic'", // Strict CSP via 'strict-dynamic', supported by most modern browsers (level 3)
          "'nonce-{{nonce}}'" // Enables CSP nonce support for scripts in SSR mode, supported by almost any browser (level 2)
        ],
        'style-src': [
          "'self'", // Enables loading of stylesheets hosted on same origin
          'https:', // For increased security, replace by the specific hosting domain or file name of your external stylesheets
          "'unsafe-inline'", // Recommended default for most Nuxt apps
          'app.artibot.ai',
          'prod.artibotcdn.com'
        ],
        'img-src': ["'self'", 'data:', 'www.google.co.in', 'www.google.com', 'server-api.aaaedu.in', 'i.ytimg.com', 's3.amazonaws.com', 'www.googletagmanager.com'], // Add relevant https://... sources if you load images from external sources
        'font-src': ["'self'", 'https:', 'data:'], //  For increased security, replace by the specific sources for fonts
        'base-uri': ["'self'", 'server-api.aaaedu.in'],
        'object-src': ["'self'"],
        'script-src-attr': ["'self'"],
        'form-action': ["'self'", 'server-api.aaaedu.in'],
        'frame-ancestors': ["'self'", 'www.google.com', 'www.youtube.com'],
        'frame-src': ["'self'", 'www.google.com', 'www.youtube.com', 'td.doubleclick.net', 'api.razorpay.com', 'app.artibot.ai'],
        'connect-src': [
          "'self'",
          'server-api.aaaedu.in',
          'www.youtube.com',
          'www.google.com',
          'www.google-analytics.com',
          'analytics.google.com',
          'stats.g.doubleclick.net',
          'api.iconify.design',
          'lumberjack-metrics.razorpay.com',
          'lumberjack.razorpay.com',
          'lumberjack-cx.razorpay.com',
          'api.artibot.ai',
          'api-cdn.prod-aws.artibot.ai'
        ],
        'upgrade-insecure-requests': true
      }
      // contentSecurityPolicy: false
    },
    // headers: false,
    sri: true
  },

  sitemap: {
    enabled: true,
    xsl: false,
    xslTips: false,
    sortEntries: true,
    discoverImages: true,
    // cacheMaxAgeSeconds: 3600,
    autoLastmod: true,
    exclude: ['/profile/**'],
    sources: [
      '/api/__sitemap__/urls'
    ]
  },

  robots: {
    rules: {
      'User-agent': '*',
      Allow: '/',
      Disallow: '/admin'
      // 'Sitemap': process.env.MAIN_BASE_URL+`/sitemap.xml`
    }
  },

  googleFonts: {
    display: 'swap', // 'auto' | 'block' | 'swap' | 'fallback' | 'optional'
    families: {
      Roboto: true,
      'Josefin+Sans': true,
      Lato: [100, 300],
      Raleway: {
        wght: [100, 400],
        ital: [100]
      },
      Jost: {
        wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        ital: [100, 200, 300, 400, 500, 600, 700, 800, 900]
      }
    }
  },

  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage'
    }
  }
})
