<template>
	<div id="expertise">
		<section class="hero is-warning is-bold">
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
              <h1 class="title">Expertise Calculator</h1>
              <p class="subtitle">This is a BETA</p>
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
                <h1>Input</h1>
              </div>
              <o-tabs v-model="activeTab" :expanded="true">
                <o-tab-item value="0" label="Expertise">
                  <ExpertiseInput
                    v-for="item in this.expertise"
                    :key="item.queryParam"
                    :expertise="item"
                  />
                </o-tab-item>
                <o-tab-item value="1" label="Options">
                  <options :options="this.options" />
                </o-tab-item>
              </o-tabs>
            </div>
          </div>
          <div class="column">
            <div class="container">
              <div class="content">
                <h1>Summary</h1>
                <h4 class="title is-4">Expertise Limit</h4>
                <progressbar
                  :type="this.progressType"
                  size="is-large"
                  :value="this.currentExpertise"
                  :max="expertiseFloor + bonusExpertise"
                  show-value>
                  {{ currentExpertise }}/{{expertiseFloor + bonusExpertise}}
                </progressbar>
              </div>
              <expertise-summary :expertise="Object.values(this.expertise)" />
            </div>
          </div>
        </div>
      </div>
    </section>
	</div>
</template>

<script>
import dataService from "@/services/dataService";

import ExpertiseInput from '@/components/expertise/ExpertiseInput.vue'
import Options from '@/components/expertise/Options.vue'

import Progressbar from '@/components/Progressbar.vue'
import ExpertiseSummary from '@/components/expertise/ExpertiseSummary.vue'

export default {
  name: "App",
  components: {
    ExpertiseInput,
    Options,
    Progressbar,
    ExpertiseSummary
  },
  data() {
    return {
      activeTab: "0",
      stickySummary: true,
      expertiseFloor: 17000,
      expertise: {},
      options: {},
    };
  },
  created(){
    let uri = window.location.search.substring(0);
    let params = new URLSearchParams(uri);
    let hydratedValues = dataService.getData();
    let hydratedOptions = dataService.getExpertiseDefaults();
    this.expertise = hydratedValues.expertise;
    this.options = hydratedOptions;

    
  },
  computed:{
		currentExpertise() {
      const values = Object.values(this.expertise);
      let e = 0;
      values.forEach(function (v) {
        e += v.value;
      });
      return e;
    },
    bonusExpertise() {
      const values = Object.values(this.options);
      let e = 0;
      values.forEach(function (v) {
        e += v.value;
      });
      e -= this.options.level.value;
      if (this.options.level.value !== 1) {
        e += Math.floor(this.options.level.value / 10) * 1000;
      }
      if (this.options.level.value === 99) {
        e += 1000;
      }
      return e;
    },
    progressType() {
      if (this.currentExpertise <= this.expertiseFloor + this.bonusExpertise)
        return "is-warning";
      else return "is-danger";
    },
  },
  methods: {
		reset(){
      let hydratedValues = dataService.getData();
			let hydratedOptions = dataService.getBookDefaults();
      this.expertise = hydratedValues.expertise;
			this.options = hydratedOptions;
		}
	}
}
</script>

<style lang="scss">

.o-tabs__content{
  padding: 0px;
}
</style>