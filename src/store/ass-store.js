import Vue from 'vue';

export const EventBus = new Vue({
  data:{
    characters: "characters",
    storedStats: {}
  },

  methods:{
    setCharacters: function(chars){
      this.characters = Object.assign({}, chars);
    },
    storeStat: function(charaName, statName, statValue){
      if(!this.storedStats[charaName]){
        this.storedStats[charaName] = {}
      }
      this.storedStats[charaName][statName] = statValue;
    },
    getStoredStat: function(charaName, statName){
      if(!this.storedStats[charaName]){
        return null;
      }
      return this.storedStats[charaName][statName];
    }
  }
}
);