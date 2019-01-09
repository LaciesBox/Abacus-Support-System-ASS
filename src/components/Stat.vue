<template>
  <div class="row q-pr-sm q-pt-sm">
    <div :class="btnClass">
      <q-btn :label="btnLabel"
          @click="toggleCompute" 
          align="left"
          class="full-width q-pl-xs no-shadow"
          label-width="12"
          :outline="!willCalculate"
          color="secondary"
          :text-color="btnTextColor"
          no-wrap/>
    </div>
    <div :class="baseClass">
      <q-chip square :color="statColor" :text-color="statTextColor" style="height: 2.6em; width: 100%; z-index:5;">
        {{this.value}}
      </q-chip>
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
        color="secondary" v-bind:class="{'stat': true, 'bg-amber-4': willCalculate}"
        :min="min" 
        :max="max"/>
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
      if(data.charaIndex != this.charaIndex){
        return;
      }

      data.stats[this.fieldName] = {
        name: this.finalDisplayName,
        add: Number(this.add),
        base: Number(this.value),
        willCalculate: this.willCalculate
      }
    });
  },

  computed: {
    finalDisplayName(){
      return this.displayName || this.statName || "";
    },
    btnColor(){
      return this.willCalculate ? "primary" : "secondary";
    },
    btnTextColor(){
      return this.willCalculate ? "grey-9" : "secondary";
    },
    statColor(){
      return this.willCalculate ? "stat" : "grey-5";
    },
    statTextColor(){
      return this.willCalculate ? "stat" : "grey-8";
    },
    btnLabel(){
      return Converter.shorten(this.statName);
    }
  },

  props: {
    displayName: {
      type: String,
      required: false
    },
    fieldName: {
      type: String,
      required: true
    },
    statName: {
      type: String,
      required: true
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
    },
    charaIndex: {
      type: Number,
      required: true
    },
    baseClass: {
      type: Array,
      default: () => ["col-3", "text-center"]
    },
    btnClass: {
      type: Array,
      default: () => ["col-7"]
    }
  },

  methods: {
    toggleCompute: function(){
      this.willCalculate = !this.willCalculate;
    }
  }
}

</script>

<style lang="stylus">

.stat
  color: #EEEEEE

.text-stat
  color: #111111

.bg-stat
  background: #E5d6b5

</style>