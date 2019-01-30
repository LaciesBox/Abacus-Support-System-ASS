<template>
  <a @click="click">
    <q-card class="wrapper">
      <q-card-media>
        <img :class="{'card-img':true,'selected':selected}" :src="chosenChara.avatar">

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
      selected: false
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
    click: function(){
      console.log("click");
      this.$emit("select",this.chosenCharaName, this.selected);
      this.selected = !this.selected;
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
  padding 7px 7px 7px
  background-color $blue
</style>