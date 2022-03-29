<template>
  <div id="apples">
    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column is-2 has-text-centered">
              <figure class="image is-128x128 is-inline-block">
                <img alt="ReIMAGINE logo" src="@/assets/logo.png" />
              </figure>
            </div>
            <div class="column is-10">
              <!-- Left side -->
              <h1 class="title">Timed Demon Schedule</h1>
              <p class="subtitle">For ReIMAGINE</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-one-third">
            <div class="container">
              <div class="content">
                <h1>Current Time</h1>
              </div>
              <table class="table is-hoverable is-striped is-fullwidth">
                <tbody>
                  <tr>
                    <th>Tokyo</th>
                    <td>{{format(this.japan, "EEEE, yyyy/MM/dd hh:mm:ss aa")}}</td>
                  </tr>
                  <tr>
                    <th>Local</th>
                    <td>{{format(this.local, "EEEE, yyyy/MM/dd hh:mm:ss aa")}}</td>
                  </tr>
                  <tr>
                    <th>IMAGINE</th>
                    <td>{{this.imagineTime}} <span v-html="formatMoonPhase(this.imaginePhase)"></span></td>
                  </tr>
                </tbody>
              </table>
              <div class="container">
                <div class="content">
                  <h1>Options</h1>
                </div>
                <Options :options="this.options"></Options>
              </div> 
              <div class="content">
                <h1>
                  Moon Phases
                  <o-tooltip label="Phase Changes are in Local Time Zone" position="right" multiline>
                    <o-icon  icon="help-circle-outline" />
                  </o-tooltip>
                </h1>
              </div>
              <table class="table is-hoverable is-striped is-fullwidth">
                <thead>
                  <tr>
                    <th>Phase Change</th>
                    <th>Moon Phase</th>
                  </tr>
                </thead>
                <tbody>
                  <FuturePhase
                    v-for="future in this.futurePhases"
                    :key="future.dateTime"
                    :futurePhase="future"
                    :options="this.options"
                  />
                </tbody>
              </table>
            </div>
          </div>
          <div class="column is-two-thirds">
            <div class="container">
              <div class="content">
                <h1>
                  Fields
                  <o-tooltip label="Day Rotates at 12:00 AM JST" position="right" multiline>
                    <o-icon  icon="help-circle-outline" />
                  </o-tooltip>
                </h1>
              </div>
              <Field
                v-for="item in fields"
                :key="item.name"
                :field="item"
                :mttime="imagineTime"
                :mtphase="this.imaginePhase"
                :japan="this.japan"
                :options="options"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import dataService from "@/services/dataService";

import Options from "@/components/timeddemons/Options.vue";
import Field from "@/components/timeddemons/Field.vue";
import FuturePhase from "@/components/timeddemons/FuturePhase.vue";

import { utcToZonedTime, format } from 'date-fns-tz';


export default {
  name: "Timed Demon Schedule",
  components: {
    Options,
    Field,
    FuturePhase
  },
  data() {
    return {
      format,
      options: {},
      fields: [],
      japan: "",
      local: "",
      imagineTime: "",
      imaginePhase: 0,
      futurePhases: [{newDate: new Date(Date.now()), moonPhase: 0}]
    };
  },
  created() {
    // load static data
    this.options  = dataService.getTimedDemonDefaults();
    this.fields = dataService.getFields();

    //set initial datetimes
    let nowUTCTime = Date.now() // UTC millisecond
    let nowUTCDate = new Date(nowUTCTime) // local date
    const timezone = 'Japan'
    this.japan = utcToZonedTime(nowUTCDate, timezone);
    this.local = nowUTCDate;
  },
  mounted() {
    this.updateClock();
    this.interval = setInterval(this.updateClock, 1000);
  },
  computed: {
  },
  methods: {
    updateClock(){
      const time = Date.now() // UTC millisecond
      const date = new Date(time) // local date
      const timezone = 'Japan'
      this.japan = utcToZonedTime(date, timezone);
      this.local = date;
      this.imagineTime = this.getMegatenTime();
      this.imaginePhase = this.getMoonPhase();
      this.updateMoonPhaseList();
    },
    updateMoonPhaseList(){
      const baseUTCTime = 1201633907855
      const baseMoonPhase = 4

      let nowUTCDate  = new Date();
      let nowUTCTime  = nowUTCDate.getTime();
      let stepMinute, stepSecond;

      stepMinute = 24 - Math.floor((nowUTCTime - baseUTCTime ) / 1000 / 60) % 24;   
      stepSecond = 60 - Math.floor((nowUTCTime - baseUTCTime ) / 1000     ) % 60;

      let phases = [];

      for (let i = 0; i < 60; i++) {
        let d = new Date(
          nowUTCDate.getFullYear(), 
          nowUTCDate.getMonth(), 
          nowUTCDate.getDate(), 
          nowUTCDate.getHours(), 
          nowUTCDate.getMinutes() + stepMinute + (24 * i), 
          nowUTCDate.getSeconds() + stepSecond
        );
        let time = d.getTime();
        let moon = Math.floor(baseMoonPhase + (time - baseUTCTime) / 24 / 60 / 1000) % 16;
        phases.push({newDate: d, moonPhase: moon})
      }

      this.futurePhases = phases;
    },
    getMegatenTime(){
      const baseUTCTime = 1201633907855
      let nowUTCDate  = new Date();
      let nowUTCTime  = nowUTCDate.getTime();

      let min  = Math.floor(((nowUTCTime - baseUTCTime) / 1000 / 2 )) % 60; 
      let hour = Math.floor(((nowUTCTime - baseUTCTime) / 1000 / 2 / 60 )) % 24;

      if (hour  < 10) hour  = "0" + hour;
      if (min   < 10) min   = "0" + min;

      return `${hour}:${min}`
    },
    getMoonPhase(){
      const baseUTCTime = 1201633907855
      const baseMoonPhase = 4
      
      let nowDate  = new Date();
      let nowTime  = nowDate.getTime();

      return Math.floor(baseMoonPhase + (nowTime - baseUTCTime) / 24 / 60 / 1000) % 16;
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

<style lang="scss">

.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 1em;
  align-items: flex-start;
  justify-content: left;
}

</style>