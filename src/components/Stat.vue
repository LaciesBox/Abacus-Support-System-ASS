<template>
  <div>
    <q-btn :label="btnLabel" />
    <!--<q-numeric
      v-model="value"
      :min="0"
      :max="5"
    ></q-numeric>-->
  </div>
</template>

<script>

export default {
  name: "Stat",

  computed: {
    btnLabel(){
      return this.statName + " " + this.value;
    }
  },

  props: {
    statName: {
      type: String,
      default: "Stat"
    },
    value: {
      type: [String, Number],
      default: 0
    }
  }
}

</script>
