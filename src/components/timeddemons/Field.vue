<template>
  <div class="container">
		<div class="content">
			<h2>{{field.name}}</h2>
		</div>
    <Demon
      v-for="demon in field.demons"
      :key="demon.name"
      :demon="demon"
    />
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
  },
};
</script>

<style lang="scss" scoped>
input:invalid {
  border: 2px dashed red;
}
</style>
