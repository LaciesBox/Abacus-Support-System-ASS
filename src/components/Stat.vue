<template>
  <div class="row q-pr-sm q-pt-sm">
    <div class="col-7">
      <q-btn :label="btnLabel"
          @click="toggleCompute" 
          align="left"
          class="full-width q-pl-xs"
          label-width="12"
          no-wrap
          :color="btnColor"/>
    </div>
    <div class="col-3 text-center">
      <q-chip square :color="statColor" style="height: 2.6em; width: 100%;">
        {{this.value}}
      </q-chip>
      <!-- <q-btn :label="this.value" 
          align="left"
          class="full-width q-pl-xs"
          label-width="12"
          no-wrap
          color="primary"/> -->
    </div>
    <div class="col-2">
      <q-field
        helper="MOD"
      >
        <q-input 
        :disable="!willCalculate" 
        v-model="add" 
        type="number"
        :step="1"
        align="center"
        :min="min" 
        :max="max"
        @blur="toggleCompute"/>
      </q-field>
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
        base: Number(this.value),
        willCalculate: this.willCalculate
      }
    });
  },

  computed: {
    btnColor(){
      return this.willCalculate ? "primary" : "secondary";
    },
    statColor(){
      return this.willCalculate ? "yellow" : "primary";
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
