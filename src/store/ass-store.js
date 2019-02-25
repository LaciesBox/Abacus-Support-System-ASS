import Vue from 'vue';

const MAX_ROLL_HISTORY  = 50;

export const EventBus = new Vue({
  data:{
    characters: "characters",
    storedStats: {},
    rollHistory: "",
    rollHistoryQuantity: 0
  },

  created(){
    this.rollHistory = localStorage.getItem("rollHistory") || "";
    this.rollHistoryQuantity = localStorage.getItem("rollHistoryQuantity") ? Number(localStorage.getItem("rollHistoryQuantity")) : 0;
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
    },
    getRollHistory: function(){
      return this.rollHistory;
      
    },
    appendToRollHistory: function(toAdd){
      //if the rollHistory has exceeded max length, append
      if(this.rollHistoryQuantity >= 50){
        this.rollHistory = this.rollHistory.substring(this.rollHistory.indexOf("\n"),this.rollHistory.length);
      }else {
        localStorage.setItem("rollHistoryQuantity", ++this.rollHistoryQuantity);
      }

      this.rollHistory += "\n" + toAdd;

      //change localStorage data
      localStorage.setItem("rollHistory", this.rollHistory);

      //emit change in roll-history
      EventBus.$emit("modify-roll-history", this.getRollHistory());
    },
    appendPveToRollHistory: function(name, rollValue){
      this.appendToRollHistory("PVE roll: "+ name + ". Roll: "+ rollValue);
    },
    appendPvpToRollHistory: function(duelists, winnerIndex, rollValue) {
      const color0 = winnerIndex == 0 ? "red" : "green";
      const color1 = winnerIndex == 1 ? "red" : "green";
      
      this.appendToRollHistory("PVP roll: <font color="+color0+">"+duelists[0]+"</font> vs <font color="+color1+">"+duelists[1]+"</font>. Roll: "+ rollValue);
    }
  }
}
);