<template>
  <div id="options" class="container">
    <div class="columns">
      <div class="column">
        <o-field label="From:" :message="messages.start" :variant="messages.start ? 'danger' : ''">
          <o-input type="number" min=1 max=99 v-model="options.start" v-on:keyup="validate" @input="validate"></o-input>
        </o-field>
      </div>
      <div class="column">
        <o-field label="To:" :message="messages.end" :variant="messages.end ? 'danger' : ''">
          <o-input type="number" min=1 max=99 v-model="options.end" v-on:keyup="validate" @input="validate"></o-input>
        </o-field>
      </div>
    </div>
    <o-field label="Incense">
      <o-select v-model="options.incense" class="is-fullwidth">
        <option value=0>No Incense</option>
        <option value=1>x2</option>
        <option value=4>x5</option>
        <option value=9>x10</option>
        <option value=20.10>x2010</option>
      </o-select>
    </o-field>
    <o-field label="Gear XP Boosts" :message="messages.xp" :variant="messages.xp ? 'danger' : ''">
      <o-input type="number" min=0 v-model="options.gearXpBoost" id="xpboost" icon-right="percent" v-on:keyup="validate" @input="validate"></o-input>
    </o-field>
    <o-field label="Dame-Du-Lac-Emblem">
      <o-switch v-model="options.talisman"></o-switch>
    </o-field>
    <o-field label="Sort Table by Apples">
      <o-switch v-model="options.sort"></o-switch>
    </o-field>
    <o-button @click.prevent="reset" icon-left="refresh">Reset Options</o-button>
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
    return {
      messages: {},
    };
  },
  methods: {
    reset(){
      this.$parent.reset();
    },
    validate(){
      this.messages = {};
      if(this.options.start > this.options.end){
          this.messages.start = "You idiot.";
          this.messages.end = "You absolute buffoon.";
      }
      else{
        if (this.options.start <= 0 || this.options.start >= 100) {
          this.messages.start = "Levels 1-99 only";
        }
        if (this.options.end <= 0 || this.options.end >= 100) {
          this.messages.end = "Levels 1-99 only";
        }
      }

      if (this.options.gearXpBoost < 0 ) {
        this.messages.xp = "Gear XP Boost can't be negative";
      }
      this.messages = Object.assign({}, { ...this.messages });
    }
  }
};
</script>

<style lang="scss" scoped>
input:invalid {
  border: 2px dashed red;
}
</style>
