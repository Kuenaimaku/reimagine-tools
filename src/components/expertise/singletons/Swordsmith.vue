<template>
  <chain-expertise
    :expertise="this.expertise"
    :options="this.options"
    :visible="isVisible"
    :classRank="classRank"
    @setValues="setValues"
    name="Swordsmith"
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
            <th>Blades</th>
            <td>Class 1 Rank 0</td>
            <td>80%</td>
            <td>{{ parseExpertise(expertise.blades.value * 0.8) }}</td>
          </tr>
          <tr>
            <th>Weapon Knowledge</th>
            <td>Class 2 Rank 0</td>
            <td>20%</td>
            <td>
              {{ parseExpertise(expertise.weaponKnowledge.value * 0.2) }}
            </td>
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
  name: "Swordsmith",
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
        this.expertise.blades.value = 0;
        this.expertise.weaponKnowledge.value = 0;
      } else if (to === "required") {
        this.expertise.blades.value = 1000;
        this.expertise.weaponKnowledge.value = 2000;
      } else if (to === "max") {
        this.expertise.blades.value = this.expertise.blades.max;
        this.expertise.weaponKnowledge.value =
          this.expertise.weaponKnowledge.max;
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
        this.expertise.blades.value >= 1000 &&
        this.expertise.weaponKnowledge.value >= 2000
      )
        return true;
      else return false;
    },
    total() {
      let blades = this.expertise.blades.value * 0.8;
      let weaponKnowledge = this.expertise.weaponKnowledge.value * 0.2;

      return Number.parseInt(blades + weaponKnowledge);
    },
    classRank() {
      let blades = this.expertise.blades.value * 0.8;
      let weaponKnowledge = this.expertise.weaponKnowledge.value * 0.2;

      var a = Number.parseInt(blades + weaponKnowledge) / 100;
      var b = a.toString();
      if (
        a === 0 ||
        this.expertise.blades.value < 1000 ||
        this.expertise.weaponKnowledge.value < 2000
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
