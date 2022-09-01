import { table, minifyItems } from '../ConnectTable'
import UserBox from './UserBox'
import Logout from './Logout'

Mutable.component('userbox', UserBox)
Mutable.component('logout', Logout)

export default {
  props: ['username', 'useremail'],
  template: 
  `<article>
    <p>Esta es la lista de empresas con reseñas guardadas voluntariamente por usuarios. Selecciona una empresa para revisar el detalle:</p>
    <select m-on:change="getResult">
      <option value="" disabled selected>Seleccione una empresa:</option>
      <option m-for="company in companies">{{ company }}</option>
    </select>
    <div class="grid" m-if="selectedCompany">
      <h2>
        <kbd>{{ selectedCompany }}</kbd> 
      </h2>
      <p class="average-data">
        <small>Reseñas: <kbd>{{ companyData.length }}</kbd></small>
        <br>
        <small>Puntaje:</small> <kbd>{{ averageCompany }} / 5</kbd>
      </p>
    </div>
    <details m-for="company in companyData">
      <summary role="button">Año <b>{{ company.fields['Año'] }}</b></summary>
      <div>
        <table>
          <tbody>
            <tr>
              <th scope="row">Cargo ejercido:</th>
              <td>{{ company.fields['Cargo'] }}</td>
            </tr>
            <tr>
              <th scope="row">Sueldo líquido:</th>
              <td>{{ formatCurrency(company.fields['Sueldo liq.']) }}</td>
            </tr>
            <tr>
              <th scope="row">Modalidad:</th>
              <td>{{ company.fields['Modalidad trabajo'] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <table class="review-range">
          <thead>
            <tr>
              <th scope="col">General</th>
              <th scope="col">Horario</th>
              <th scope="col">Ambiente</th>
              <th scope="col">Entrevista</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <progress m-if="typeof company.fields['General'] !== 'undefined'" value="{{ company.fields['General'] }}" max="5"></progress>
                <span m-if="typeof company.fields['General'] === 'undefined'">❌</span>
              </td>
              <td>
                <progress m-if="typeof company.fields['Horario'] !== 'undefined'" value="{{ company.fields['Horario'] }}" max="5"></progress>
                <span m-if="typeof company.fields['Horario'] === 'undefined'">❌</span>
              </td>
              <td>
                <progress m-if="typeof company.fields['Ambiente'] !== 'undefined'" value="{{ company.fields['Ambiente'] }}" max="5"></progress>
                <span m-if="typeof company.fields['Ambiente'] === 'undefined'">❌</span>
              </td>
              <td>
                <progress m-if="typeof company.fields['Entrevista'] !== 'undefined'" value="{{ company.fields['Entrevista'] }}" max="5"></progress>
                <span m-if="typeof company.fields['Entrevista'] === 'undefined'">❌</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="review-addons">
        <div m-show="typeof company.fields['Lo bueno'] !== 'undefined'">
          <h5>👍🏻 Lo bueno</h5>
          <pre>{{ company.fields['Lo bueno'] }}</pre>
        </div>
        <div m-show="typeof company.fields['Lo malo'] !== 'undefined'">
          <h5>💥 Lo malo</h5>
          <pre>{{ company.fields['Lo malo'] }}</pre>
        </div>
        <div m-show="typeof company.fields['Beneficios'] !== 'undefined'">
          <h5>🎁 Beneficios</h5>
          <pre>{{ company.fields['Beneficios'] }}</pre>
        </div>
      </div>
    </details>
  </article>`,
  data() {
    return {
      totalRecords: null,
      companies: [],
      selectedCompany: null,
      averageCompany: null,
      companyData: [],
    }
  },
  methods: {
    getRecords: async function(_req, res) {
      const records = await table.select({
        sort: [
            {field: 'Empresa', direction: 'asc'}
        ]
      }).firstPage()
      return minifyItems(records)
    },
    listRecord: async function(array, field) {
      return array.map(({fields}) => fields[field])
    },
    removeDuplicatedCompanies(array) {
      return [...new Set(array)]
    },
    filterRecord: async function(array, field, name) {
      return array.filter(obj => obj.fields[field].includes(name))
    },
    getResult: async function(e) {
      this.set('selectedCompany', e.target.value)
      const companyData = await this.callMethod('filterRecord', [this.get('totalRecords'), 'Empresa', e.target.value])
      this.set('companyData', companyData)
      const averageCompany = await this.callMethod('listRecord', [this.get('companyData'), 'General'])
      this.set('averageCompany', averageCompany.reduce((a, b) => a + b, 0) / averageCompany.length)
    },
    formatCurrency(value) {
      return `$ ${value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`
    }
  },
  hooks: {
    mounted: async function() {
      this.set('totalRecords', await this.callMethod('getRecords'))
      const companies = await this.callMethod('listRecord', [this.get('totalRecords'), 'Empresa'])
      this.set('companies', this.callMethod('removeDuplicatedCompanies', [companies]))
    }
  }
}
