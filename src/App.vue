<template>
  <div id="app">
    <Navbar></Navbar>
    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column is-2 has-text-centered">
              <figure class="image is-128x128 is-inline-block">
                <img alt="ReIMAGINE logo" src="./assets/logo.png" />
              </figure>
            </div>
            <div class="column is-10">
              <!-- Left side -->
              <h1 class="title">Golden Apple Calculator</h1>
              <p class="subtitle">For ReIMAGINE</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container"><div class="columns">
        <div class="column is-one-quarter">
          <div class="container">
            <div class="content">
              <h1>Input</h1>
            </div>
            <Options :options="this.options"></Options>
          </div>
        </div>
        <div class="column">
          <div class="container" v-if="validation">
            <div class="content">
              <h1>Summary</h1>
              <h3><span style="color:gold">{{Number(apples).toLocaleString()}} <o-icon pack="mdi" icon="food-apple"> </o-icon></span> {{pluralize}} required to level from {{options.start}} to {{options.end}}</h3>
              <h4><span style="color:gold">{{Number(experience).toLocaleString()}}</span> experience in total</h4>
            </div>
            <table class="table is-hoverable is-striped is-fullwidth">
              <thead>
                <tr>
                  <th>Dungeon</th>
                  <th>Apples</th>
                  <th>Runs</th>
                </tr>
              </thead>
              <tbody>
                <Dungeon
                  v-for="item in tablesort"
                  :key="item.name"
                  :dungeon="item"
                  :apples="this.apples"
                />
              </tbody>
            </table>
          </div>
          <div class="container" v-else>
            <div class="content">
              <h1>Summary</h1>
              <h3><span style="color:red">{{Number(1/0).toLocaleString()}} <o-icon pack="mdi" icon="food-apple"> </o-icon></span> {{pluralize}}. You broke it.</h3>
            </div>
          </div>
        </div>
      </div></div>
    </section>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Golden Apple Calculator</strong> by
          <a href="https://github.com/kuenaimaku">Kuenaimaku</a>. The
          <a href="https://github.com/Kuenaimaku/apple-calculator"
            >source code</a
          >
          is licensed
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import dataService from "./services/dataService";

import Options from './components/Options.vue'
import Dungeon from './components/Dungeon.vue'
import Navbar from './components/Navbar.vue'

export default {
  name: "App",
  components: {
    Options,
    Dungeon,
    Navbar
  },
  data() {
    return {
      options: {},
      levels:{},
      dungeons:[],
      experience: 0,
    };
  },
  created(){
    let hydratedValues = dataService.reset();
    this.options = hydratedValues.options;
    this.levels = hydratedValues.levels;
    this.dungeons = hydratedValues.dungeons;
  },
  computed:{
    apples() {
      const values = Object.values(this.levels);
      let i = 0;
      let expRequired = 0;
      let appleExp = 10000;
      let modifier = this.modifier;
      const min = this.options.start - 1;
      const max = this.options.end - 1;

      if(max < min){
        this.experience = 0;
        return 0;
      }

      for (i = min; i < max; i++) {
        expRequired += values[i]
      }
      this.experience = expRequired;
      let applesRequired = Math.ceil(expRequired / (appleExp * modifier));

      return applesRequired;
    },
    modifier(){
      let modifier = 1;
      var r = modifier + parseInt(this.options.incense) + (this.options.gearXpBoost / 100);
      return r;
    },
    pluralize(){
      if (this.apples == 1)
        return 'Apple';
      return 'Apples'
    },
    tablesort(){
      let hydratedValues = dataService.reset();
      if (!this.options.sort){
        return hydratedValues.dungeons;
      }
      return this.dungeons.sort((a, b) => b.quantity - a.quantity)
    },
    validation(){
      if(isNaN(this.apples)){ return false};
      if(this.options.gearXpBoost < 0){return false};
      return this.options.start < this.options.end;
    }
  },
  methods: {
      reset(){
        let hydratedValues = dataService.reset();
        this.options = hydratedValues.options;
      }
    }
}
</script>

<style>
</style>
