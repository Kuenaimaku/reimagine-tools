<template>
  <chain-expertise
    :expertise="this.expertise"
    :options="this.options"
    :visible="isVisible"
    :classRank="classRank"
    @setValues="setValues"
    name="Curse of the Wretched"
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
            <th>Destruction Magic</th>
            <td>Class 1 Rank 0</td>
            <td>10%</td>
            <td>
              {{ parseExpertise(expertise.destructionMagic.value * 0.1) }}
            </td>
          </tr>
          <tr>
            <th>Curse Magic</th>
            <td>Class 2 Rank 0</td>
            <td>50%</td>
            <td>
              {{ parseExpertise(expertise.curseMagic.value * 0.5) }}
            </td>
          </tr>
          <tr>
            <th>Magic Control</th>
            <td>Class 1 Rank 0</td>
            <td>20%</td>
            <td>{{ parseExpertise(expertise.magicControl.value * 0.2) }}</td>
          </tr>
          <tr>
            <th>Bless</th>
            <td>Class 1 Rank 0</td>
            <td>20%</td>
            <td>{{ parseExpertise(expertise.bless.value * 0.2) }}</td>
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
  name: "CurseOfTheWretched",
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
        this.expertise.destructionMagic.value = 0;
        this.expertise.curseMagic.value = 0;
        this.expertise.magicControl.value = 0;
        this.expertise.bless.value = 0;
      } else if (to === "required") {
        this.expertise.destructionMagic.value = 1000;
        this.expertise.curseMagic.value = 2000;
        this.expertise.magicControl.value = 1000;
        this.expertise.bless.value = 1000;
      } else if (to === "max") {
        this.expertise.destructionMagic.value =
          this.expertise.destructionMagic.max;
        this.expertise.curseMagic.value = this.expertise.curseMagic.max;
        this.expertise.magicControl.value = this.expertise.magicControl.max;
        this.expertise.bless.value = this.expertise.bless.max;
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
        this.expertise.destructionMagic.value >= 1000 &&
        this.expertise.curseMagic.value >= 2000 &&
        this.expertise.magicControl.value >= 1000 &&
        this.expertise.bless.value >= 1000
      )
        return true;
      else return false;
    },
    total() {
      let destructionMagic = this.expertise.destructionMagic.value * 0.1;
      let curseMagic = this.expertise.curseMagic.value * 0.5;
      let magicControl = this.expertise.magicControl.value * 0.2;
      let bless = this.expertise.bless.value * 0.2;

      return Number.parseInt(
        destructionMagic + curseMagic + magicControl + bless
      );
    },
    classRank() {
      let destructionMagic = this.expertise.destructionMagic.value * 0.1;
      let curseMagic = this.expertise.curseMagic.value * 0.5;
      let magicControl = this.expertise.magicControl.value * 0.2;
      let bless = this.expertise.bless.value * 0.2;

      var a =
        Number.parseInt(destructionMagic + curseMagic + magicControl + bless) /
        100;
      var b = a.toString();
      if (
        a === 0 ||
        this.expertise.destructionMagic.value < 1000 ||
        this.expertise.curseMagic.value < 2000 ||
        this.expertise.magicControl.value < 1000 ||
        this.expertise.bless.value < 1000
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
