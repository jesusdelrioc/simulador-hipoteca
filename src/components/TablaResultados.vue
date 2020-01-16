<template>
    <table :class="{'table box message is-success': true, 'is-invisible': !resultado.ok}">
            <tbody class="is-size-7">
            <tr class="mensual">
                <td class="is-size-5">Cuota mensual</td>
                <td class="is-size-2 has-text-success">{{total}}&euro;</td>
            </tr>
         </tbody>
         <tbody class="is-size-7">
              <tr>
                 <td>Dinero disponible cada mes</td>
                 <td class="derecha" v-if="total">{{ingresosgastos.toFixed(2)}}&euro;</td>
                 <td v-else> -- &euro;</td>
                </tr>
              <tr>
                 <td>Numero de cuotas</td>
                 <td class="derecha" v-if="total">{{mesestotal}}</td>
                 <td v-else> -- &euro;</td>
             </tr>
             </tbody>
              <tbody class="is-size-7 gastos">
              <tr class="desglose">
                 <td>Gastos notaría</td>
                 <td class="derecha" v-if="total">{{notaria}}&euro;</td>
                 <td v-else> -- &euro;</td>
             </tr>
              <tr class="desglose">
                 <td>Gastos registro</td>
                 <td class="derecha" v-if="total">{{resultadoregistro}}&euro;</td>
                 <td v-else> -- &euro;</td>
             </tr>
              <tr class="desglose">
                 <td>Gastos gestoría</td>
                 <td class="derecha" v-if="total">{{gestoria}}&euro;</td>
                 <td v-else> -- &euro;</td>
             </tr>
              <tr class="desglose">
                 <td>Impuestos</td>
                 <td class="derecha" v-if="total">{{impuestos}}&euro;</td>
                 <td v-else> -- &euro;</td>
             </tr>
              <tr>
                 <td><b>Coste total de la hipoteca</b></td>
                 <td class="derecha" v-if="total"><b>{{todoslosgastosmascasa}}&euro;</b></td>
                 <td v-else> -- &euro;</td>
             </tr>
         </tbody>
    </table>
</template>
<script>
export default {
  name: 'TablaResultados',
  props: [
    'todoslosgastosmascasa',
    'total',
    'preciocasa',
    'resultado',
    'mesestotal',
    'notaria',
    'resultadoregistro',
    'gestoria',
    'impuestos',
    'ingresosgastos'

  ]
}
</script>
