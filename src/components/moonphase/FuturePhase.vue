<template>
  <tr v-if="displayRow">
    <td>{{format(futurePhase.newDate, "yyyy/MM/dd hh:mm aa")}}</td>
    <td><span v-html="formatMoonPhase(futurePhase.moonPhase)"></span></td>
  </tr>
</template>

<script>

import { format } from 'date-fns-tz';

export default {
  name: "FuturePhase",
  components: {
  },
  props: {
    futurePhase: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {format};
  },
  computed:{
    displayRow(){
      if (this.options.allMoonPhases){
        return true;
      }
      if (!this.options.allMoonPhases && (this.futurePhase.moonPhase == 0 || this.futurePhase.moonPhase == 8 )){
        return true;
      }
      else if(!this.options.allMoonPhases && (this.futurePhase.moonPhase != 0 && this.futurePhase.moonPhase != 8 )){
        return false;
      }
    }
  },
  methods:{
    formatMoonPhase(phase){
      let icon = "";
      let color = "warning"
      let name = ""

      switch (phase){
        case 0:
          icon = 'moon-new'
          break;
        case 1:
        case 2:
        case 3:
          icon = 'moon-waxing-crescent'
          color="info"
          break;
        case 4:
          icon = 'moon-first-quarter'
          color="info"
          break;
        case 5:
        case 6:
        case 7:
          icon = 'moon-waxing-gibbous'
          color="info"
          break;
        case 8:
          icon = 'moon-full'
          break;
        case 9:
        case 10:
        case 11:
          icon= 'moon-waning-gibbous'
          color="danger"
          break;
        case 12:
          icon= 'moon-last-quarter'
          color="danger"
          break;
        case 13:
        case 14:
        case 15:
          icon = 'moon-waning-crescent'
          color="danger"
          break;
        default:
          icon = 'weather-night'
          break;
      }

      if(phase == 8){
        name = "FULL MOON"
      }
      else if(phase == 4 || phase == 12){
        name = "HALF MOON"
      }
      else if(phase == 0){
        name = "NEW MOON"
      }
      else if(phase > 8) {
        name = `${16-phase}/8 MOON`
      }
      else {
        name = `${phase}/8 MOON`
      }

      return `${name} <span class="o-icon icon has-text-${color}"><i class="mdi mdi-${icon} mdi-16px"></i></span>`
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
