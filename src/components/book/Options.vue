<template>
  <div id="options" class="container">
    <o-field label="Starting Class/Rank" :message="messages.start" :variant="messages.start ? 'danger' : ''">
      <o-input expanded type="number" min=0 max=10 v-model="options.startClass" v-on:keyup="validate" @input="validate"></o-input>
      <o-input expanded type="number" min=0 max=9 v-model="options.startRank" v-on:keyup="validate" @input="validate"></o-input>
    </o-field>
    <o-field label="Ending Class/Rank" :message="messages.end" :variant="messages.end ? 'danger' : ''">
      <o-input expanded type="number" min=0 max=10 v-model="options.endClass" v-on:keyup="validate" @input="validate"></o-input>
      <o-input expanded type="number" min=0 max=9 v-model="options.endRank" v-on:keyup="validate" @input="validate"></o-input>
    </o-field>
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
