<template>
  <div id="options" class="container">
    <div class="columns">
      <div class="column">
        <o-field label="From:">
          <o-input type="number" min=1 max=99 v-model="options.start"></o-input>
        </o-field>
      </div>
      <div class="column">
        <o-field label="To:">
          <o-input type="number" min=1 max=99 v-model="options.end"></o-input>
        </o-field>
      </div>
    </div>
    <o-field label="Incense">
      <o-select v-model="options.incense" class="is-fullwidth">
        <option value="1">No Incense</option>
        <option value="2">x2</option>
        <option value="5">x5</option>
        <option value="10">x10</option>
        <option value="2010">x2010</option>
      </o-select>
    </o-field>
    <o-field label="Gear XP Boosts">
      <o-input type="number" min=100 v-model="options.gearXpBoost" id="xpboost" icon-right="percent"></o-input>
    </o-field>
    <o-field label="Happy Hour">
      <o-switch v-model="options.happyHour" true-value=2 false-value=1></o-switch>
    </o-field>
    <o-field label="Sort Table by Apples">
      <o-switch v-model="options.sort"></o-switch>
    </o-field>
    <o-button @click="reset" icon-left="refresh">Reset Options</o-button>
  </div>
</template>

<script>
export default {
  name: "Options",
  components: {
  },
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    reset(){
      this.$parent.reset();
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
