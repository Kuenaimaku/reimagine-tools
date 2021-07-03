<template>
  <div>
    <slot v-if="$slots.title" name="title" />
    <template v-else>{{ title }}</template>
    <o-field>
      <p class="control" @click="stepLeft(step2)">
        <o-button type="is-primary" :disabled="disabledMin">
          <o-icon icon="chevron-double-left"></o-icon>
        </o-button>
      </p>
      <p class="control" @click="stepLeft(step1)">
        <o-button type="is-info" :disabled="disabledMin">
          <o-icon icon="chevron-left"></o-icon>
        </o-button>
      </p>
      <o-input
        type="number"
        expanded
        :editable="editable"
        v-model.number="computedValue"
      ></o-input>
      <p class="control" @click="stepRight(step1)">
        <o-button type="is-info" :disabled="disabledMax">
          <o-icon icon="chevron-right"></o-icon>
        </o-button>
      </p>
      <p class="control" @click="stepRight(step2)">
        <o-button type="is-primary" :disabled="disabledMax">
          <o-icon icon="chevron-double-right"></o-icon>
        </o-button>
      </p>
    </o-field>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newValue: !isNaN(this.value) ? this.value : parseFloat(this.min) || 0,
    };
  },
  props: {
    title: {
      type: String,
    },
    step1: {
      type: Number,
      required: true,
    },
    step2: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      required: false,
    },
    max: {
      type: Number,
      required: false,
    },
    modelValue: {
      type: Number,
      required: false,
    },
    editable: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    stepLeft(amount) {
      let oldValue = this.computedValue;
      var _value = 0;
      if (oldValue - amount < this.min) {
        _value = this.min;
      } else {
        _value = this.computedValue - amount;
      }
      this.computedValue = _value;
    },
    stepRight(amount) {
      let oldValue = this.computedValue;
      var _value = 0;
      if (oldValue + amount > this.max) {
        _value = this.max;
      } else {
        _value = this.computedValue + amount;
      }
      this.computedValue = _value;
    },
  },
  computed: {
    disabledMin() {
      return this.computedValue <= this.min;
    },
    disabledMax() {
      return this.computedValue >= this.max;
    },
    computedValue: {
      get() {
        return this.newValue;
      },
      set(value) {
        let newValue = value;
        if (value === "") {
          newValue = parseFloat(this.min) || null;
        }
        this.newValue = newValue;
        this.$emit("update:modelValue", newValue);
      },
    },
  },
  watch: {
    /**
     * When v-model is changed:
     *   1. Set internal value.
     */
    modelValue: {
      immediate: true,
      handler(value) {
        this.newValue = value
      }
    }
  },
};
</script>

<style lang="scss">
.option-title {
  font-weight: bold;
  font-size: 1.1em;
}
.option-subtitle {
  font-weight: normal;
  font-size: 1em;
}

input[type="number"] {
  text-align: center;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>