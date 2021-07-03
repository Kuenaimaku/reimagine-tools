<template>
  <chain-expertise
    :expertise="this.expertise"
    :options="this.options"
    :visible="isVisible"
    :classRank="classRank"
    @setValues="setValues"
    name="Enhancement"
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
            <th>Curative Magic</th>
            <td>Class 2 Rank 0</td>
            <td>30%</td>
            <td>{{ parseExpertise(expertise.curativeMagic.value * 0.3) }}</td>
          </tr>
          <tr>
            <th>Support Magic</th>
            <td>Class 2 Rank 0</td>
            <td>40%</td>
            <td>
              {{ parseExpertise(expertise.supportMagic.value * 0.4) }}
            </td>
          </tr>
          <tr>
            <th>Bless</th>
            <td>Class 1 Rank 0</td>
            <td>30%</td>
            <td>{{ parseExpertise(expertise.bless.value * 0.3) }}</td>
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
  name: "Enhancement",
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
        this.expertise.curativeMagic.value = 0;
        this.expertise.supportMagic.value = 0;
        this.expertise.bless.value = 0;
      } else if (to === "required") {
        this.expertise.curativeMagic.value = 2000;
        this.expertise.supportMagic.value = 2000;
        this.expertise.bless.value = 1000;
      } else if (to === "max") {
        this.expertise.curativeMagic.value = this.expertise.curativeMagic.max;
        this.expertise.supportMagic.value = this.expertise.supportMagic.max;
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
        this.expertise.curativeMagic.value >= 2000 &&
        this.expertise.supportMagic.value >= 2000 &&
        this.expertise.bless.value >= 1000
      )
        return true;
      else return false;
    },
    total() {
      let curativeMagic = this.expertise.curativeMagic.value * 0.3;
      let supportMagic = this.expertise.supportMagic.value * 0.4;
      let bless = this.expertise.bless.value * 0.3;

      return Number.parseInt(curativeMagic + supportMagic + bless);
    },
    classRank() {
      let curativeMagic = this.expertise.curativeMagic.value * 0.3;
      let supportMagic = this.expertise.supportMagic.value * 0.4;
      let bless = this.expertise.bless.value * 0.3;

      var a = Number.parseInt(curativeMagic + supportMagic + bless) / 100;
      var b = a.toString();
      if (
        a === 0 ||
        this.expertise.curativeMagic.value < 2000 ||
        this.expertise.supportMagic.value < 2000 ||
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
