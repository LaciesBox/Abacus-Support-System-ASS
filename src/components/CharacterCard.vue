<template>
  <a @click="togglePvpStatus"
  class="">
    <q-card class="wrapper">
      <q-card-media>
        <img :class="{'card-img':true,'selected': inPvp}" :src="chosenChara.avatar">
        <q-card-title slot="overlay">
          <span slot="subtitle">{{chosenChara.name}}</span>
        </q-card-title>
      </q-card-media>
    </q-card>
  </a>
</template>

<script>
import { EventBus } from "store/ass-store";

export default {
  data(){
    return {
      inPvp: false
    }
  },
  computed: {
    chosenChara(){
      if(EventBus.characters && this.chosenCharaName){
        return EventBus.characters[this.chosenCharaName];
      }
      return {};
    }
  },
  props:{
    chosenCharaName: {
      type: String,
      default: "Eien Sonzai"
    },
    charaIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    togglePvpStatus: function(){
      this.$emit("select",this.chosenCharaName, this.inPvp);
      this.inPvp = !this.inPvp;
    }
  }
}
</script>

<style lang="stylus" scoped>

@import "~variables"

.wrapper
  cursor pointer

.card-img
  object-fit cover
  height 175px

.selected
  padding 4px 4px 4px
  background-color $ass-gold
</style>