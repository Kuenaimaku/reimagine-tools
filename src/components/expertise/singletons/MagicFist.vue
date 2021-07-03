<template>
  <chain-expertise
    :expertise="this.expertise"
    :options="this.options"
    :visible="isVisible"
    :classRank="classRank"
    @setValues="setValues"
    name="Magic Fist"
  >
    <template v-slot:content>
      <table class="table is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Expertise</th>
            <th>Minimum</th>
            <th>Percent</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Rush</th>
            <td>Class 1 Rank 0</td>
            <td>30%</td>
            <td>{{ parseExpertise(expertise.rush.value * 0.3) }}</td>
          </tr>
          <tr>
            <th>Destruction Magic</th>
            <td>Class 1 Rank 0</td>
            <td>30%</td>
            <td>
              {{ parseExpertise(expertise.destructionMagic.value * 0.3) }}
            </td>
          </tr>
          <tr>
            <th>Magic Control</th>
            <td>Class 1 Rank 0</td>
            <td>40%</td>
            <td>{{ parseExpertise(expertise.magicControl.value * 0.4) }}</td>
          </tr>
        </tbody>
      </table>
      <h5 class="title is-6">Skills Acquired</h5>
      <div class="skill-summary">
        <skill
          v-for="skill in this.skills.filter(function (e) {
            return e.rank <= total && requirements;
          })"
          :key="skill.slug"
          :skill="skill"
        >
        </skill>
      </div>
    </template>
  </chain-expertise>
</template>

<script>
import Skill from "@/components/expertise/Skill.vue";
import ChainExpertise from "@/components/expertise/ChainExpertise.vue";

export default {
  name: "MagicFist",
  components: {
    Skill,
    ChainExpertise,
  },
  props: {
    expertise: {
      type: Object,
      required: true,
    },
    skills: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
    hideLocked: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    parseExpertise(amount) {
      var a = Number.parseInt(amount) / 100;
      var b = a.toString();
      if (a === 0) {
        return "Class 0 Rank 0";
      } else if (a >= 100) {
        return "Class " + b.charAt(0) + b.charAt(1) + " Rank " + b.charAt(2);
      } else if (a >= 10) {
        return "Class " + b.charAt(0) + " Rank " + b.charAt(1);
      } else {
        return "Class 0 Rank " + b.charAt(0);
      }
    },
    setValues(to) {
      if (to === "zero") {
        this.expertise.rush.value = 0;
        this.expertise.destructionMagic.value = 0;
        this.expertise.magicControl.value = 0;
      } else if (to === "required") {
        this.expertise.rush.value = 1000;
        this.expertise.destructionMagic.value = 1000;
        this.expertise.magicControl.value = 1000;
      } else if (to === "max") {
        this.expertise.rush.value = this.expertise.rush.max;
        this.expertise.destructionMagic.value =
          this.expertise.destructionMagic.max;
        this.expertise.magicControl.value = this.expertise.magicControl.max;
      }
    },
  },
  computed: {
    isVisible() {
      if (!this.hideLocked) return true;
      else if (this.requirements) return true;
      else return false;
    },
    requirements() {
      if (
        this.expertise.rush.value >= 1000 &&
        this.expertise.destructionMagic.value >= 1000 &&
        this.expertise.magicControl.value >= 1000
      )
        return true;
      else return false;
    },
    total() {
      let rush = this.expertise.rush.value * 0.3;
      let destructionMagic = this.expertise.destructionMagic.value * 0.3;
      let magicControl = this.expertise.magicControl.value * 0.4;

      return Number.parseInt(rush + destructionMagic + magicControl);
    },
    classRank() {
      let rush = this.expertise.rush.value * 0.3;
      let destructionMagic = this.expertise.destructionMagic.value * 0.3;
      let magicControl = this.expertise.magicControl.value * 0.4;

      var a = Number.parseInt(rush + destructionMagic + magicControl) / 100;
      var b = a.toString();
      if (
        a === 0 ||
        this.expertise.rush.value < 1000 ||
        this.expertise.destructionMagic.value < 1000 ||
        this.expertise.magicControl.value < 1000
      ) {
        return "Class 0 Rank 0";
      } else if (a >= 100) {
        return "Class " + b.charAt(0) + b.charAt(1) + " Rank " + b.charAt(2);
      } else if (a >= 10) {
        return "Class " + b.charAt(0) + " Rank " + b.charAt(1);
      } else {
        return "Class 0 Rank " + b.charAt(0);
      }
    },
  },
};
</script>

<style lang="scss">
.skill-summary figure {
  margin: 0px;
}
</style>
