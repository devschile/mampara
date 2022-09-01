import { login } from '../auth'

export default {
  template: 
  `<button m-on:click="login">
    Iniciar sesión 
    <img src="https://icongr.am/simple/github.svg?size=22&color=ffffff&colored=false">
  </button>`,
  methods: {
    login() {
      login()
    }
  },
}
