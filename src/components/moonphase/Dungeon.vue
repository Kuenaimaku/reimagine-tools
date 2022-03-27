<template>
  <tr v-bind:class="{bonus: isBonusDay}" v-if="displayRow">
    <th>{{dungeon.name}}</th>
    <td>{{dungeon.cavePoints}}</td>
    <td>{{dungeon.cavePointsBonus}}</td>
    <td>{{dayOfWeek}}</td>
    <td>{{dungeon.levelRequirement}}</td>
    <td>{{dungeon.licenseRequirement}}</td>
  </tr>
</template>

<script>

import { format } from 'date-fns-tz';

export default {
  name: "Dungeon",
  components: {
  },
  props: {
    dungeon: {
      type: Object,
      required: true,
    },
    japan: {
      type: Date,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {format};
  },
  computed:{
    dayOfWeek: function(){
      switch (this.dungeon.bonusDay){
        case 1:
          return "Monday"
        case 2:
          return "Tuesday"
        case 3:
          return "Wednesday"
        case 4:
          return "Thursday"
        case 5:
          return "Friday"
        case 6:
          return "Saturday"
        case 7:
          return "Sunday"
        default:
          return "-"
          break;
      }
    },
    isBonusDay: function(){
      return format(this.japan, "i") == this.dungeon.bonusDay
    },
    displayRow: function(){
      if(!this.options.bonusDungeonsOnly){
        return true;
      }
      if(this.options.bonusDungeonsOnly && format(this.japan, "i") == this.dungeon.bonusDay){
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>

.table.is-hoverable.is-striped tbody tr.bonus:nth-child(odd) {
    background-color: #3c3046;
}
.table.is-hoverable.is-striped tbody tr.bonus:nth-child(even) {
    background-color: #483b52;
}
.table.is-hoverable.is-striped tbody tr.bonus:hover:nth-child(odd) {
    background-color: #69527a;
}
.table.is-hoverable.is-striped tbody tr.bonus:hover:nth-child(even) {
    background-color: #69527a;
}
</style>
