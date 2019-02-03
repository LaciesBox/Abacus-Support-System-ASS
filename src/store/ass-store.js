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
    storeStat: function(charaName, statName, statAttribName, statAttribValue){
      if(charaName == ""){
        return;
      }
      if(!this.storedStats[charaName]){
        this.storedStats[charaName] = {}
      }
      if(!this.storedStats[charaName][statName]){
        this.storedStats[charaName][statName] = {}
      }

      this.storedStats[charaName][statName][statAttribName] = statAttribValue;
    },
    getStoredStat: function(charaName, statName, statAttribName){
      if(charaName == ""){
        return;
      }

      if(!this.storedStats[charaName] || !this.storedStats[charaName][statName]){
        return null;
      }
      return this.storedStats[charaName][statName][statAttribName];
    }
  }
}
);