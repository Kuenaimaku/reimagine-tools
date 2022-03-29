<template>
  <div class="box field">
		<table class="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th style="width:50%">{{field.name}}</th>
          <th style="width:50%"></th>
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
}
</style>
