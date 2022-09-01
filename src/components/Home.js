import companiesList from '../Companies'

import Login from './Login'
import Logout from './Logout'
import Publish from './Publish'
import List from './List'

Mutable.component('login', Login)
Mutable.component('logout', Logout)
Mutable.component('publish', Publish)
Mutable.component('list', List)

export default {
  props: ['auth', 'username', 'useremail'],
  template: 
  `<div>
    <section m-if="view.home">
      <div class="grid home">
        <article>
          <h3>¿Qué?</h3>
          <p>Esta iniciativa creada por usuarios de la comunidad DevsChile se ofrece como una vitrina de opiniones voluntarias<sup>*</sup> de profesionales que quieren dejar su reseña sobre su experiencia trabajando en diferentes empresas; esto permite entregar información a personas que quieren saber sobre ellas antes de postular o cambiarse de trabajo complementen su decisión.</p>
          <div m-if="!auth">
          <login />
          <p><small>ℹ️ <a href="#" m-on:click.prevent="toggleModal">Sobre el uso de tu información</a>.</small></p>
          </div>
          <div class="grid" m-if="auth">
            <button m-on:click.prevent="showPublish">Nueva reseña 🌟</button>
            <button class="secondary" m-on:click.prevent="showList">Ver reseñas 👀</button>
          </div>
          <logout m-if="auth" />
        </article>
      </div>
    </section>
    <section class="grid review" m-if="auth && view.publish || auth && view.list">
      <article>
        <userbox name="{{ username }}" />
        <div><button m-on:click="showPublish">Nueva reseña 🌟</button></div>
        <div><button class="secondary" m-on:click="showList">Ver reseñas 👀</button></div>
        <logout />
      </article>
      <div>
        <publish username="{{ username }}" useremail="{{ useremail }}" m-if="auth && view.publish" />
        <list username="{{ username }}" useremail="{{ useremail }}" m-if="auth && view.list" />
      </div>
    </section>
    <!-- Modal -->
    <dialog m-literal:open="modal">
      <article>
        <a href="#close" aria-label="Close" class="close" m-on:click.prevent="toggleModal"></a>
        <h3>Sobre el uso de tu información</h3>
        <p>El iniciar sesión con tu cuenta GitHub permite referenciar tu perfil con la reseña en BBDD, la cual será anónima para quien quiera leerlas a través de este sitio. Los datos recopilados son: <code>Nombre usuario</code> <code>e-mail</code>, los que no se utilizarán de ninguna otra forma (marketing por ejemplo) por los mantenedores de este proyecto ni serán entregados a terceros.</p>
        <footer>
          <a href="#close" role="button" class="secondary" m-on:click.prevent="toggleModal">Cerrar</a>
        </footer>
      </article>
    </dialog>
  </div>`,
  data() {
    return {
      companies: companiesList.data,
      user: {
        formLocation: window.location.href,
        selectedCompany: ''
      },
      view: {
        home: true,
        publish: false,
        list: false,
        selected: ''
      },
      modal: false
    }
  },
  methods: {
    showPublish() {
      this.set('view.home', false)
      this.set('view.publish', true)
      this.set('view.list', false)
    },
    showList() {
      this.set('view.home', false)
      this.set('view.publish', false)
      this.set('view.list', true)
    },  
    toggleModal() {
      this.set('modal', !this.get('modal'));
    },
  },
}
