<template>
  <div class="row q-pr-sm q-pt-sm">
    <div class="col-8">
      <q-btn :label="btnLabel"
          @click="toggleCompute" 
          align="left"
          class="full-width q-pl-xs"
          label-width="12"
          no-wrap
          :color="btnColor"/>
    </div>
    <div class="col-2 q-pt-sm text-center">
      {{this.value}}
    </div>
    <div class="col-2">
      <q-input :disable="!willCalculate" 
          v-model="add" 
          type="number"
          :step="1"
          align="center"
          :min="min" 
          :max="max"/>
    </div>
  </div>
</template>

<script>
import { EventBus } from "store/ass-store";

import { Converter } from "utils";

export default {
  name: "Stat",

  data() {
    return {
      willCalculate: false,
      add: 0
    }
  },

  mounted() {
    EventBus.$on('retrieveStats', data => {
      data[this.fieldName] = {
        add: Number(this.add),
        base: this.value,
        willCalculate: this.willCalculate
      }
    });
  },

  computed: {
    btnColor(){
      return this.willCalculate ? "primary" : "secondary";
    },
    btnLabel(){
      return Converter.shorten(this.statName);
    }
  },

  props: {
    fieldName: {
      type: String,
      required: true
    },
    statName: {
      type: String,
      default: "Stat"
    },
    value: {
      type: [String, Number],
      default: 0
    },
    min: {
      type: Number,
      default: -5
    },
    max: {
      type: Number,
      default: 5
    }
  },

  methods: {
    toggleCompute: function(){
      this.willCalculate = !this.willCalculate;
    }
  }
}

</script>
