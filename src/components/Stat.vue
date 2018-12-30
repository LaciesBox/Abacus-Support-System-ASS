<template>
  <div>
    <q-btn :label="btnLabel"
        @click="toggleCompute" 
        align="left"
        dense
        :color="btnColor"
        />
    <!--<q-numeric
      v-model="value"
      :min="0"
      :max="5"
    ></q-numeric>-->
  </div>
</template>

<script>
import { EventBus } from "store/ass-store";

export default {
  name: "Stat",

  data() {
    return {
      willCalculate: false
    }
  },

  mounted() {
    EventBus.$on('retrieveStats', data => {
      data[this.fieldName] = {
        add: 0,
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
      return this.statName + " " + this.value;
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
    }
  },

  methods: {
    toggleCompute: function(){
      this.willCalculate = !this.willCalculate;
    }
  }
}

</script>
