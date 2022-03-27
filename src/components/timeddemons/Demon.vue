<template>
  <li><a :href="demon.link">{{demon.name}}</a> - <span v-html="appearance()"></span></li>
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
        return `During ${this.formatMoonPhase(this.demon.phases[0])}`
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
          break;
        case 4:
          icon = 'moon-first-quarter'
          break;
        case 5:
        case 6:
        case 7:
          icon = 'moon-waxing-gibbous'
          break;
        case 8:
          icon = 'moon-full'
          break;
        case 9:
        case 10:
        case 11:
          icon= 'moon-waning-gibbous'
          break;
        case 12:
          icon= 'moon-last-quarter'
          break;
        case 13:
        case 14:
        case 15:
          icon = 'moon-waning-crescent'
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
input:invalid {
  border: 2px dashed red;
}
</style>
