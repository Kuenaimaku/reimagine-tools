<template>
  <tr class="demon" v-if="displayRow()">
    <th><a :href="demon.link">{{demon.name}}</a></th>
    <td><span v-html="appearance()"></span></td>
  </tr>
</template>

<script>

import { format } from 'date-fns-tz';

export default {
  name: "Demon",
  components: {
  },
  props: {
    demon: {
      type: Object,
      required: true,
    },
    mttime: {
      type: String,
      required: true,
    },
    mtphase: {
      type: Number,
      required:true,
    },
    japan: {
      type: Date,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    }
  },
  methods:{
    appearance(){
      var response = "";
      if (this.demon.startHour){
        response = `From ${this.demon.startHour}:00 to ${this.demon.endHour}:00</br>`
      }
      if(this.demon.phases.length != 0){
        this.demon.phases.forEach(e => response += `During ${this.formatMoonPhase(e)}</br>`)
      }
      if(this.demon.days.length != 0){       
        if (this.demon.days.every(item => [1,2,3,4,5].includes(item)) && [1,2,3,4,5].every(item => this.demon.days.includes(item))){
          response += "Available on Weekdays </br>"
        }
        else if(this.demon.days.every(item => [6,7].includes(item))&& [6,7].every(item => this.demon.days.includes(item))){
          response += "Available on Weekends </br>"
        }
        else {
          this.demon.days.forEach(e => {
            switch (e){
              case 1:
                response += "Available on Mondays</br>"
                break;
              case 2:
                response += "Available on Tuesdays</br>"
                break;
              case 3:
                response += "Available on Wednesdays</br>"
                break;
              case 4:
                response += "Available on Thursdays</br>"
                break;
              case 5:
                response += "Available on Fridays</br>"
                break;
              case 6:
                response += "Available on Saturdays</br>"
                break;
              case 7:
                response += "Available on Sundays</br>"
                break;
              default:
                break;
            }
          })
        }
      }
      return response;
    },
    displayRow(){
      if(!this.options.hideUnavailableDemons){
        return true
      }
      if(this.demon.startHour){
        let hour = parseInt(this.mttime.substring(0,2))
        let min = parseInt(this.mttime.substring(5,3))

        if (this.demon.startHour > this.demon.endHour){
          if (hour >= this.demon.startHour){
            return true;
          }
          else if(hour < this.demon.endHour){
            return true;
          }
          else if(hour == this.demon.endHour && min == 0){
            return true;
          }
          return false;
        }
        if (this.demon.startHour < this.demon.endHour){
          if (this.demon.startHour <= hour && hour < this.demon.endHour){
            return true;
          }
          if (hour == this.demon.endHour && min == 0){
            return true;
          }
          return false;
        }
      }
      if(this.demon.phases.length != 0){
        let phase = this.mtphase;
        return this.demon.phases.includes(phase)
      }
      if(this.demon.days.length != 0){
        let dayOfWeek = parseInt(format(this.japan, "i"));
        return this.demon.days.includes(dayOfWeek)
      }

      return false
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
