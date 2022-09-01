import { logout } from '../auth'

export default {
  template: 
  `<button class="secondary outline" m-on:click.prevent="logout">
    Cerrar sesión
    <img src="https://icongr.am/octicons/sign-out.svg?size=20&color=596b78&colored=false">
  </button>`,
  methods: {
    logout() {
      logout()
    }
  },
}
