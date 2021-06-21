<template>
	<div id="books">
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
              <h1 class="title">Expertise Textbook Calculator</h1>
              <p class="subtitle">For ReIMAGINE</p>
            </div>
          </div>
        </div>
      </div>
    </section>
		<section class="section">
      <div class="container">
				<div class="columns">
					<div class="column is-one-quarter">
						<div class="container">
							<div class="content">
								<h1>Input</h1>
							</div>
							<Options :options="this.options"></Options>
						</div>
					</div>
					<div class="column">
						<div class="container">
							<div class="content">
								<h1>Summary</h1>
								<h3>
                  <span style="color: gold">{{ Number(books).toLocaleString() }} <o-icon pack="mdi" class="icon has-text-info" icon="book-open-page-variant"> </o-icon></span>
                  {{ pluralize }} required to go from Class {{ options.startClass }} Rank {{ options.startRank }} to Class {{ options.endClass }} Rank {{ options.endRank }}
                </h3>
							</div>
						</div>
					</div>
				</div>
			</div>
    </section>
	</div>
</template>

<script>
import dataService from "@/services/dataService";

import Options from '@/components/book/Options.vue'

export default {
  name: "App",
  components: {
    Options
  },
  data() {
    return {
      options: {},
      experience: 0,
    };
  },
  created(){
    let hydratedOptions = dataService.getBookDefaults();
    this.options = hydratedOptions;
  },
  computed:{
		books(){
			let i = 0;
      let startingExpertise = (this.options.startClass * 1000) + (this.options.startRank * 100);
			let currentExpertise = startingExpertise;
			let endingExpertise = (this.options.endClass * 1000) + (this.options.endRank * 100);
      let modifier = this.modifier;

      for (i = 0; currentExpertise < endingExpertise; i++) {
				let raw = this.roundToThousandth(150 / (this.expertiseClass(currentExpertise) + 1) / (this.expertiseRank(currentExpertise) + 1));
				let actual = this.roundToThousandth(raw * modifier);
        currentExpertise += actual;
      }

      return i;
		},
		modifier() {
			var r = 1 + parseInt(this.options.incense) + (this.options.gearXpBoost / 100);
			return r;
		},
    pluralize(){
      if (this.books == 1)
        return 'Textbook';
      return 'Textbooks'
    }
  },
  methods: {
		reset(){
			let hydratedOptions = dataService.getBookDefaults();
			this.options = hydratedOptions;
		},
		expertiseClass(v){
			var r = Math.floor(v/1000)
			return r;
		},
		expertiseRank(v){
			var r = Math.floor((v % 1000)/100)
			return r;
		},
		roundToThousandth(v){
			return Math.round(v * 1000) / 1000
		}
	}
}
</script>