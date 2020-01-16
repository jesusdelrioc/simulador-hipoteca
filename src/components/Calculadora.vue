<template>
  <div class="row-x70-30 release-container">
    <div class="col-x70">
      <form @submit.prevent="handleSubmit">
      <CampoTexto :validating="'required|numeric'" :error="errors.first('preciocasa')" :label="'Precio del inmueble'" :icon="'fa-euro-sign'" :id="'preciocasa'" v-model="preciocasa" :default="preciocasa" :placeholder="'150000'" @field-update="fieldUpdate" />
      <Radio :label="'¿Qué tipo de vivienda te interesa?'" :id="'casa'" v-model="casa" :items="{ 'casanueva': {'label': 'Casa nueva', 'value': 0}, 'segundamano':  {'label': 'Segunda mano', 'value': 1}}" :checked="'12pagas'" @field-update="fieldUpdate" />
        <div class="field level">
        <label class="field-label has-text-grey is-size-6">Provincia</label>
        <div class="field-body control has-icons-left" >
          <div class="select" :class="{'is-danger': errors.first('queciudad') }">
            <v-select :options='ciudad' :class="{'is-danger': errors.first('queciudad') }" v-validate="'required'" name="queciudad" v-model="queciudad" placeholder="Escoge tu provincia" label='name' ><span slot="no-options">No coincide con ninguna opción</span ></v-select>
          </div>
        </div>
        </div>
      <CampoTexto :validating="'required|numeric'" :error="errors.first('ahorros')" :label="'Dinero aportado'" :icon="'fa-euro-sign'" :id="'ahorros'" v-model="ahorros" :default="ahorros" :placeholder="'25000'" @field-update="fieldUpdate" />
      <div v-if="this.preciocasa != '' && this.ahorros < this.todoslosgastos" v-show="p" class="has-text-grey informacion">Necesitas al menos {{this.todoslosgastos.toFixed(2)}}€ para cubrir los gastos de compraventa</div>
      <br v-if="this.preciocasa != '' && this.ahorros < this.todoslosgastos" v-show="p">
      <CampoTexto  :error="errors.first('interes')" :title="'Este tipo de interés es una referencia media del mercado hipotecario.  BBVA:2,55%   Santander:3,38%   ING:2,33%'" :label="'Intereses'" :step="'0.25'"  :icon="'fas fa-percent'" :id="'interes'" v-model="interes" :default="interes" :placeholder="'2.25'" @field-update="fieldUpdate" />
      <CampoTexto  :error="errors.first('edad')" :min="'18'" :max="'75'" :title="'La mayoría de las entidades en España fijan 75 años como límite.'" :label="'Edad'" :icon="'fas fa-male'" :id="'edad'" v-model="edad" :default="edad" :placeholder="'35'" @field-update="fieldUpdate" />
      <CampoTexto  :error="errors.first('plazo')" :label="'Plazo en años'" :max="'40'" :min="'5'" :icon="'far fa-calendar-alt'" :id="'plazo'" v-model="plazo" :default="plazo" :placeholder="'30'" @field-update="fieldUpdate" />
      <div v-if="this.edadmaxima < 40 && this.plazo > this.edadmaxima && this.edad !== ''" v-show="p" class="has-text-grey informacion ">Tu plazo máximo de años sera de {{this.edadmaxima}} según la mayoría de los bancos</div>
      <br v-if="this.edadmaxima < 40 && this.plazo > this.edadmaxima && this.edad !== ''" v-show="p">
       <Radio :label="'¿Cuántos titulares va a tener tu hipoteca?'" :id="'titulares'" v-model="titulares" :items="{ 'solo': {'label': 'Un único titular', 'value': 0}, 'dosomas':  {'label': 'Dos o más titulares', 'value': 1}}" :checked="'12pagas'" @field-update="fieldUpdate" />
      <div class="opciones-sueldo">
        <CampoTexto v-if="this.titulares == 0" :validating="'required|numeric'" :error="errors.first('ingresosmensual')" :label="'¿Cuáles son tus ingresos mensuales?'" :icon="'fa-euro-sign'" :id="'ingresosmensual'" v-model="ingresosmensual" :default="ingresosmensual" :placeholder="'Ingresos'" @field-update="fieldUpdate" />
        <CampoTexto v-else :validating="'required|numeric'" :error="errors.first('ingresosmensual')" :label="'Ingresos mensuales de todos los titulares'" :icon="'fa-euro-sign'" :id="'ingresosmensual'" v-model="ingresosmensual" :default="ingresosmensual" :placeholder="'Ingresos'" @field-update="fieldUpdate" />
      </div>
      <br>
      <div class="opciones-gastos">
        <CampoTexto v-if="this.titulares == 0" :validating="'required|numeric'" :error="errors.first('gastos')" :label="'Tengo gastos mensuales de:'" :icon="'fa-euro-sign'" :id="'gastos'" v-model="gastos" :default="gastos" :placeholder="'Otros préstamos, hipotecas...'" @field-update="fieldUpdate" />
        <CampoTexto v-else :validating="'required|numeric'" :error="errors.first('gastos')" :label="'Tenemos gastos mensuales de:'" :icon="'fa-euro-sign'" :id="'gastos'" v-model="gastos" :default="gastos" :placeholder="'Otros préstamos, hipotecas...'" @field-update="fieldUpdate" />
      </div>
      <br>
      <div v-if="this.ingresosmenosgastos < this.total && this.ingresosmensual != ''" v-show="p" class="has-text-grey informacion">El nivel de ingresos mensuales no es suficiente.</div>
      <br v-if="this.ingresosmenosgastos < this.total && this.ingresosmensual != ''" v-show="p">
    <div class="level" id="c2a">
      <div class="field-label has-text-grey is-size-6">
        <!-- <p class="help is-7 has-text-grey">* Campo requerido</p> -->
        <p class="help is-7 has-text-grey">Se declina toda responsabilidad sobre el uso de los resultados.</p>
      </div>
      <div class="level-right">
        <div class="field-body control has-icon">
          <button class="button is-large is-success is-expanded is-fullwidth" @click="mostrarResultado" type="submit" :disabled="errors.first('plazo')||errors.first('preciocasa')||this.ingresosmenosgastos<this.total ">Simular</button>
        </div>
      </div>
    </div>
  <!-- <pre>{{$data}}</pre> -->
      </form>
    </div>
      <div class="col-x30">
         <TablaResultados :resultado="resultado" :total="total" :notaria="notaria" :mesestotal="mesestotal" :preciocasa="preciocasa" :resultadoregistro="resultadoregistro" :gestoria="gestoria" :impuestos="impuestos" :todoslosgastosmascasa="todoslosgastosmascasa" :ingresosgastos="ingresosgastos"/>
         <div id="ad_521792040" class="ad-holder ad-320x200 ad-dfp" >
            <div id="bbt-ad-slot-Right1" class="ad bbt-adv-container"></div><!-- #Right1 -->
    </div><!-- .ad-holder -->
  </div>
  </div>
</template>
<script>
import CampoTexto from './CampoTexto'
import Radio from './Radio'
import TablaResultados from './TablaResultados'
export default {
  name: 'Calculadora',
  components: {TablaResultados, CampoTexto, Radio},
  data () {
    return {
      resultado: {
        ok: false,
        ko: true
      },
      mesestotal: '',
      todoslosgastos: null,
      todoslosgastosmascasa: '',
      plazo: 30,
      p: true,
      ingresosmenosgastos: '',
      submitted: false,
      porcentajedinero: '',
      preciocasa: '',
      queciudad: '',
      casa: '',
      porcentajevieja: '',
      porcentajenueva: '',
      titulares: '',
      gastos: '',
      ahorros: '',
      interes: 2.25,
      edad: '',
      edadmaxima: '',
      ingresosmensual: '',
      interesestotal: '',
      interesmasuno: '',
      elevado: '',
      tantoporciento: '',
      porcentajetotal: '',
      precioprestamo: '',
      elevadomenosuno: '',
      casaahorros: '',
      impuestos: '',
      total: '',
      ingresosgastos: '',
      cuantosmiles: '',
      sumanotariamenos: '',
      sumanotariamas: '',
      notaria: '',
      gestoria: 300,
      resultadoregistro: '',
      ciudad: [
        {
          name: 'A coruña',
          porcentaje: 10,
          porcentajecasanueva: 10
        },
        {
          name: 'Alava',
          porcentaje: 4,
          porcentajecasanueva: 10
        },
        {
          name: 'Albacete',
          porcentaje: 9,
          porcentajecasanueva: 10
        },
        {
          name: 'Alicante',
          porcentaje: 10,
          porcentajecasanueva: 10
        },
        {
          name: 'Almería',
          porcentaje: 8,
          porcentajecasanueva: 10
        },
        {
          name: 'Asturias',
          porcentaje: 8,
          porcentajecasanueva: 10
        },
        {
          name: 'Ávila',
          porcentaje: 8,
          porcentajecasanueva: 10
        },
        {
          name: 'Badajoz',
          porcentaje: 8,
          porcentajecasanueva: 10
        },
        {
          name: 'Balears',
          porcentaje: 8,
          porcentajecasanueva: 10
        },
        {
          name: 'Barcelona',
          porcentaje: 10,
          porcentajecasanueva: 10
        },
        {
          name: 'Burgos',
          porcentaje: 8,
          porcentajecasanueva: 10
        },
        {
          name: 'Cáceres',
          porcentaje: 8,
          porcentajecasanueva: 10
        },
        {
          name: 'Cádiz',
          porcentaje: 8,
          porcentajecasanueva: 10
        },
        {
          name: 'Cantabria',
          porcentaje: 10,
          porcentajecasanueva: 10
        },
        {
          name: 'Castellón',
          porcentaje: 10,
          porcentajecasanueva: 10
        },
        {
          name: 'Ceuta',
          porcentaje: 6,
          porcentajecasanueva: 10
        },
        {
          name: 'Ciudad real',
          porcentaje: 9,
          porcentajecasanueva: 10
        },
        {
          name: 'Córdoba',
          porcentaje: 8,
          porcentajecasanueva: 10
        },
        {
          name: 'Cuenca',
          porcentaje: 9,
          porcentajecasanueva: 10
        },
        {
          name: 'Girona',
          porcentaje: 10,
          porcentajecasanueva: 10
        },
        {
          name: 'Granada',
          porcentaje: 8,
          porcentajecasanueva: 10
        },
        {
          name: 'Guadalajara',
          porcentaje: 9,
          porcentajecasanueva: 10
        },
        {
          name: 'Guipúzcoa',
          porcentaje: 4,
          porcentajecasanueva: 10
        },
        {
          name: 'Huelva',
          porcentaje: 8,
          porcentajecasanueva: 10
        },
        {
          name: 'Huesca',
          porcentaje: 8,
          porcentajecasanueva: 10
        },
        {
          name: 'Jaén',
          porcentaje: 8,
          porcentajecasanueva: 10
        },
        {
          name: 'La rioja',
          porcentaje: 7,
          porcentajecasanueva: 10
        },
        {
          name: 'Las palmas',
          porcentaje: 6.5,
          porcentajecasanueva: 7
        },
        {
          name: 'León',
          porcentaje: 8,
          porcentajecasanueva: 10
        },
        {
          name: 'Lleida',
          porcentaje: 10,
          porcentajecasanueva: 10
        },
        {
          name: 'Lugo',
          porcentaje: 10,
          porcentajecasanueva: 10
        },
        {
          name: 'Madrid',
          porcentaje: 6,
          porcentajecasanueva: 10
        },
        {
          name: 'Málaga',
          porcentaje: 8,
          porcentajecasanueva: 10
        },
        {
          name: 'Melilla',
          porcentaje: 6,
          porcentajecasanueva: 10
        },
        {
          name: 'Murcia',
          porcentaje: 8,
          porcentajecasanueva: 10
        },
        {
          name: 'Navarra',
          porcentaje: 6,
          porcentajecasanueva: 10
        },
        {
          name: 'Ourense',
          porcentaje: 10,
          porcentajecasanueva: 10
        },
        {
          name: 'Palencia',
          porcentaje: 8,
          porcentajecasanueva: 10
        },
        {
          name: 'Pontevedra',
          porcentaje: 10,
          porcentajecasanueva: 10
        },
        {
          name: 'Salamanca',
          porcentaje: 8,
          porcentajecasanueva: 10
        },
        {
          name: 'Santa Cruz de Tenerife',
          porcentaje: 6.5,
          porcentajecasanueva: 7
        },
        {
          name: 'Segovia',
          porcentaje: 8,
          porcentajecasanueva: 10
        },
        {
          name: 'Sevilla',
          porcentaje: 8,
          porcentajecasanueva: 10
        },
        {
          name: 'Soria',
          porcentaje: 8,
          porcentajecasanueva: 10
        },
        {
          name: 'Tarragona',
          porcentaje: 10,
          porcentajecasanueva: 10
        },
        {
          name: 'Teruel',
          porcentaje: 8,
          porcentajecasanueva: 10
        },
        {
          name: 'Toledo',
          porcentaje: 9,
          porcentajecasanueva: 10
        },
        {
          name: 'València',
          porcentaje: 10,
          porcentajecasanueva: 10
        },
        {
          name: 'Valladolid',
          porcentaje: 8,
          porcentajecasanueva: 10
        },
        {
          name: 'Vizcaya',
          porcentaje: 4,
          porcentajecasanueva: 10
        },
        {
          name: 'Zamora',
          porcentaje: 8,
          porcentajecasanueva: 10
        },
        {
          name: 'Zaragoza',
          porcentaje: 8,
          porcentajecasanueva: 10
        }
      ]
    }
  },
  methods: {
    fieldUpdate (id, value) {
      this[id] = value
      this.runData()
    },
    runData () {
      this.mesestotal = 12 * this.plazo
      this.tantoporciento = (20 / 100) * this.preciocasa
      this.porcentajevieja = this.queciudad.porcentaje
      this.porcentajenueva = this.queciudad.porcentajecasanueva
      this.porcentajedinero = (this.ahorros / this.preciocasa) * 100
      this.porcentajetotal = this.preciocasa - this.tantoporciento
      this.casaahorros = this.preciocasa - this.ahorros
      this.edadmaxima = 75 - this.edad
      this.interesestotal = this.interes / 100 / 12
      this.interesmasuno = this.interesestotal + 1
      this.elevado = Math.pow(this.interesmasuno, this.mesestotal)
      this.precioprestamo = this.casaahorros * this.elevado * this.interesestotal
      this.elevadomenosuno = this.elevado - 1
      this.total = (this.precioprestamo / this.elevadomenosuno).toFixed(2)
      if (this.casa === '1') {
        this.impuestos = (this.queciudad.porcentaje / 100) * this.preciocasa
      } else {
        this.impuestos = (this.queciudad.porcentajecasanueva / 100) * this.preciocasa
      }
      this.cuantosmiles = this.preciocasa / 10000
      this.sumanotariamenos = this.cuantosmiles * 10
      this.sumanotariamas = (this.cuantosmiles - 15) * 6
      if (this.preciocasa >= 150000) {
        this.notaria = 907 + this.sumanotariamas
      } else {
        this.notaria = 752 + this.sumanotariamenos
      }
      if (this.preciocasa < 200000) {
        this.resultadoregistro = (this.cuantosmiles * 8) + 320
      } else if (this.preciocasa > 200000 && this.preciocasa < 300000) {
        this.resultadoregistro = ((this.cuantosmiles - 20) * 4) + 478
      } else {
        this.resultadoregistro = ((this.cuantosmiles - 30) * 3) + 512
      }
      this.ingresosgastos = (this.ingresosmensual - this.gastos) - this.total
      this.ingresosmenosgastos = this.ingresosmensual - this.gastos
      this.todoslosgastos = this.notaria + this.gestoria + this.resultadoregistro + this.impuestos
      this.todoslosgastosmascasa = (this.preciocasa * 1) + this.todoslosgastos
    },
    validate (param) {
      console.log(param)
      this.mostrarResultado()
      this.$validator.validate(param)
    },
    handleSubmit (e) {
      this.submitted = true
      this.$validator.validate().then(valid => {
        if (valid) {
        }
      })
    },
    mostrarResultado () {
      this.resultado.ok = (this.gastos !== '')
    }
  }
}
</script>
