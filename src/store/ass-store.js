import Vue from 'vue';

export const EventBus = new Vue({
  data:{
    characters: "characters"
  },

  methods:{
    setCharacters: function(chars){
      this.characters = Object.assign({}, chars);
    }
  }
}
);