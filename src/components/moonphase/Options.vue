<template>
  <div id="options" class="container">
    <o-field>
      <o-switch v-model.number="options.allMoonPhases" :leftLabel="true">
        Show All Phases
        <o-tooltip label="Show All Moon Phases" position="right">
          <o-icon size="small" icon="help-circle-outline" />
        </o-tooltip>
      </o-switch>
    </o-field>
    <o-field>
      <o-switch v-model.number="options.bonusDungeonsOnly" :leftLabel="true">
        Bonus Dungeons Only
        <o-tooltip label="Restrict the Dungeon table to only show dungeons that currently give a CP Bonus." position="right" multiline>
          <o-icon size="small" icon="help-circle-outline" />
        </o-tooltip>
      </o-switch>
    </o-field>
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
};
</script>

<style lang="scss" scoped>
input:invalid {
  border: 2px dashed red;
}
</style>
