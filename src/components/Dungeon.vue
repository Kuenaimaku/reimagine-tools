<template>
  <tr>
    <th>{{dungeon.name}}</th>
    <td>{{Number(dungeon.quantity* modifier).toLocaleString()}}</td>
    <td>{{Number(runs).toLocaleString()}}</td>
  </tr>
</template>

<script>
export default {
  name: "Dungeon",
  components: {
  },
  props: {
    dungeon: {
      type: Object,
      required: true,
    },
    apples:{
      type: Number,
      required: true
    }
  },
  data() {
    return {};
  },
  computed:{
    modifier(){
      return this.$parent.options.talisman ? 1.2 : 1;
    },
    runs(){
      return Math.ceil(this.apples / (this.dungeon.quantity * this.modifier))
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
