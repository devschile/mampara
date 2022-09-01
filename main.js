import './css/style.css'
import './src/Log'

import createAuth0Client from '@auth0/auth0-spa-js'

import Footer from './src/components/Footer'
import Menu from './src/components/Menu'
import Home from './src/components/Home'

Mutable.component('menu', Menu)
Mutable.component('foot', Footer)
Mutable.component('home', Home)

const auth0 = await createAuth0Client({
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  client_id: import.meta.env.VITE_AUTH0_CLIENTID,
  redirect_uri: window.location.origin,
})

new Mutable({
  el: '#app',
  data: {
    is_auth: false,
    site: {
      title: 'Mampara',
      description: 'Clon de Glassdoor criollo',
      copyright: 'Pero más humilde y honesto. Por DevsChile. 💪',
    },
    user: {
      name: '',
      email: '',
    },
  },
  methods: {
    getParams: async function() {
      const query = window.location.search
      const shouldParseResult = query.includes("code=") && query.includes("state=")

      if (shouldParseResult) {
        await auth0.handleRedirectCallback()
        window.history.replaceState({}, document.title, '/')
        this.callMethod('isAuth', [])
      }
    },
    isAuth: async function() {
      const isAuthenticated = await auth0.isAuthenticated()
      this.callMethod('getParams', [])

      if (isAuthenticated) {
        const userProfile = await auth0.getUser()
        // set data
        this.set('is_auth', true)
        this.set('user.name', userProfile.name)
        this.set('user.email', userProfile.email)
      }
    },
  },
  hooks: {
    mounted() {
      this.callMethod('isAuth', [])
    }
  }
})
