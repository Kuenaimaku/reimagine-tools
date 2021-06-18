<template>
  <tr>
    <th>{{dungeon.name}}</th>
    <td>{{Number(dungeon.quantity).toLocaleString()}}</td>
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
    runs(){
      return Math.ceil(this.apples / this.dungeon.quantity)
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
