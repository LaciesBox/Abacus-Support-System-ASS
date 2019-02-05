<template>
  <div class="row q-pr-sm q-pt-sm">
    <div :class="btnClass">
      <q-btn :label="shortenedLabel"
          @click="toggleCompute" 
          align="left"
          class="full-width no-shadow q-pl-xs"
          label-width="12"
          color="primary"
          :outline="!willCalculate"
          no-wrap>
          <q-tooltip :delay="300" anchor="top middle" 
            self="bottom middle" :offset="[10, 3]" v-show="btnLabel.length >= 10">
            <strong>{{btnLabel}}</strong>
          </q-tooltip>
          <q-chip class="chip text-center" square floating
           :color="statColor" :text-color="statTextColor">
            {{this.value}}
          </q-chip>
      </q-btn>
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
        color="secondary" v-bind:class="{'stat': true, 'bg-ass-gold': willCalculate}"
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
      willCalculate: EventBus.getStoredStat(this.charaName, this.fieldName, "willCalculate") || false,
      add: EventBus.getStoredStat(this.charaName, this.fieldName, "add") || 0
    }
  },

  mounted() {
    EventBus.$on('retrieveStats', data => {
      if(data.uniqueIdentifier != this.uniqueIdentifier){
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
      return this.statName;
    },
    shortenedLabel(){
      return Converter.shorten(this.statName);
    }
  },

  props: {
    rollListener: {
      type: Boolean,
      required: true
    },
    charaName: {
      type: String,
      required: true
    },
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
    uniqueIdentifier: {
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
    btnClass: {
      type: Array,
      default: () => ["col-10"]
    }
  },
  

  watch: {
    rollListener: function(){
      this.$emit('stat-data-handler', this.fieldName, {
        name: this.finalDisplayName,
        add: Number(this.add),
        base: Number(this.value),
        willCalculate: this.willCalculate
      })
    },
    add: function(){
      EventBus.storeStat(this.charaName, this.fieldName, "add", this.add);
    },
    willCalculate: function(){
      EventBus.storeStat(this.charaName, this.fieldName, "willCalculate", this.willCalculate);
    },
    charaName: function(){
      this.willCalculate = EventBus.getStoredStat(this.charaName, this.fieldName, "willCalculate") || false;
      this.add = EventBus.getStoredStat(this.charaName, this.fieldName, "add") || 0;
    }
  },
  
  methods: {
    toggleCompute: function(){
      this.willCalculate = !this.willCalculate;
    }
  }
}

</script>

<style lang="stylus" scoped>

@import '~variables'

.stat
  color: #EEEEEE

.text-stat
  color: #111111

.bg-stat
  background #E5d6b5

</style>