import createAuth0Client from '@auth0/auth0-spa-js'

const auth0 = await createAuth0Client({
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  client_id: import.meta.env.VITE_AUTH0_CLIENTID,
  redirect_uri: window.location.origin,
})

const login = async () => {
  await auth0.loginWithRedirect({
    redirect_uri: window.location.origin
  })
}

const logout = () => {
  auth0.logout({
    returnTo: window.location.origin
  })
}

export { login, logout }
