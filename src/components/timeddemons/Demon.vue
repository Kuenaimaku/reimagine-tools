<template>
  <tr class="demon">
    <th><a :href="demon.link">{{demon.name}}</a></th>
    <td><span v-html="appearance()"></span></td>
  </tr>
</template>

<script>
export default {
  name: "Demon",
  components: {
  },
  props: {
    demon: {
      type: Object,
      required: true,
    },
  },
  methods:{
    appearance(){
      if (this.demon.startHour){
        return `From ${this.demon.startHour}:00 to ${this.demon.endHour}:00`
      }
      if(this.demon.phases.length != 0){
        var response = "";
        this.demon.phases.forEach(e => response += `During ${this.formatMoonPhase(e)}</br>`)
        return response;
      }
    },
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
.demon th{
  vertical-align: middle !important;
}
</style>
