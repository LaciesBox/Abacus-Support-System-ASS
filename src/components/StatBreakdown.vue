<template>
  <div>
    <div class="row" v-for="buff in buffs" :key="buff.name">
      <div class="col-7 offset-1">
          {{buff.name}}
      </div>
      <div class="col-1 text-align-right">
          {{buff.value}}
      </div>
      <div class="col-3 text-align-right">
          {{CalcUtils.getStrPercentageValue(buff.value)}}
      </div>
    </div>
  </div>
</template>

<script>
import {
  CalcUtils
} from "utils";

export default {
  name: "StatBreakdown",
  created(){
    this.CalcUtils = CalcUtils;
  },
  props:{
    buffs:{
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped lang="stylus">
.text-align-right
  text-align right
</style>