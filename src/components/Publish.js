import companiesList from '../Companies'
import UserBox from './UserBox'
import Logout from './Logout'

Mutable.component('userbox', UserBox)
Mutable.component('logout', Logout)

export default {
  props: ['username', 'useremail'],
  template: 
  `<article>
    <h2>Agregar nueva reseña:</h2>
    <p>Escribe el nombre de la empresa que trabajaste; si ya existe en la BBDD se autocompletará, si no la encuentras la puedes agregar como nueva:</p>
    <input m-model="user.selectedCompany" id="companies" list="list-companies" type="text" placeholder="{{ placeholder }}" />
    <datalist id="list-companies">
      <option m-for="company in companies" value="{{ company }}">{{ company }}</option>
    </datalist>
    <button data-tally-open="w44o7d" data-tally-layout="modal" data-tally-hide-title="1" data-tally-align-left="1" data-tally-emoji-text="🤘🏼" data-tally-emoji-animation="head-shake" data-empresa="{{ user.selectedCompany }}" data-quien="{{ username }}" data-como="{{ useremail }}" data-donde="{{ user.formLocation }}" disabled="{{ user.selectedCompany === '' }}">Dar mi reseña</button>
  </article>`,
  data() {
    return {
      companies: companiesList.data,
      placeholder: 'Cargando...',
      user: {
        formLocation: window.location.href,
        selectedCompany: ''
      },
    }
  },
  hooks: {
    mounted() {
      this.set('placeholder', 'Nombre empresa:')
    }
  }
}
