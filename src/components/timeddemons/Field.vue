<template>
  <div class="container field">
		<table class="table is-striped">
      <thead>
        <tr>
          <th>{{field.name}}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <Demon
          v-for="demon in field.demons"
          :key="demon.name"
          :demon="demon"
          :mttime="mttime"
          :mtphase="mtphase"
          :japan="japan"
          :options="options"
        />
      </tbody>
    </table>
  </div>
</template>

<script>

import Demon from "@/components/timeddemons/Demon.vue";

export default {
  name: "Field",
  components: {
    Demon
  },
  props: {
    field: {
      type: Object,
      required: true,
    },
    mttime: {
      type: String,
    },
    mtphase: {
      type: Number,
    },
    japan: {
      type: Date,
      required: true,
    },
    options: {
      type: Object,
    }
  },
};
</script>

<style lang="scss" scoped>
.field table thead tr th{
  font-size:22px;
  background-color: #1a181b;
}
</style>
