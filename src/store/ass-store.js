import Vue from 'vue';

const MAX_ROLL_HISTORY  = 50;

export const EventBus = new Vue({
  data:{
    characters: "characters",
    storedStats: {},
    /**
     * reactive counterpart of localStorage
     */
    vLocalStorage: {
      rollHistory: "",
      rollHistoryQuantity: 0,
      notes:"",
      statusEffects: {},
    },
  },

  created(){
    // TODO: make button to clear history
    //this.resetRollHistory(); // to reset rolls, uncomment this
    this.setVLocalStorageOnInit();
  },

  methods:{
    /**
     * transfers localStorage to vLocalStorage
     */
    setVLocalStorageOnInit: function(){
      Object.keys(localStorage).forEach(key => {
        // TODO: data types fcking up
        // keep default value if "false" or empty string
        if(localStorage.getItem(key)){
          this.$set(this.vLocalStorage, key, localStorage.getItem(key));
        }
      });
    },
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
      return this.vLocalStorage.rollHistory;
    },
    resetRollHistory: function(emitChange = false){
      this.setLocalStorageItem("rollHistoryQuantity",0);
      this.setLocalStorageItem("rollHistory","",emitChange);
    },
    getVLocalStorage: function(){
      // make sure to return a new instance of local storage so that other parts of the code
      // don't accidentally change root local storage instance.
      return Object.assign({}, this.vLocalStorage);
    },
    appendToRollHistory: function(toAdd){
      // if the rollHistory has exceeded max length, delete earliest log
      // else, increase rollHistoryQuantity
      if(this.vLocalStorage.rollHistoryQuantity >= MAX_ROLL_HISTORY - 1){
        this.vLocalStorage.rollHistory = this.vLocalStorage.rollHistory.substring(0,this.vLocalStorage.rollHistory.lastIndexOf("\n"));
      }else {
        this.setLocalStorageItem("rollHistoryQuantity", Number(this.vLocalStorage.rollHistoryQuantity)+1);
      }
      
      // add to the top of the logs so that latest isn't in the last of the list.
      this.setLocalStorageItem("rollHistory", toAdd + "\n" + this.vLocalStorage.rollHistory, true);
    },
    appendPveToRollHistory: function(name, rollValue){
      this.appendToRollHistory("<strong>[PVE]</strong>: "+ name + ": "+ rollValue);
    },
    appendPvpToRollHistory: function(duelists, result, rollValue) {
      const color0 = result.winner == 0 ? "red" : "green";
      const color1 = result.winner == 1 ? "red" : "green";
      const duelist1WinChance = (10 + result.statDiff).clamp(0,20);
      
      this.appendToRollHistory("<strong>[PVP]</strong>: <font color="+color0+">"+duelists[0]+"</font>("+duelist1WinChance+") vs <font color="+color1+">"+duelists[1]+"</font>("+(20 - duelist1WinChance)+"): "+ rollValue);
    },
    getLocalStorageItem: function(key){
      return localStorage.getItem(key);
    },
    /**
     * 
     * @param {String} key 
     * @param {Object} value 
     * @param {Boolean} emitChange Set to true if you want to emit. By default it's false to avoid 
     * unnecessary emits, for example if setLocalStorageItem is called multiple times in a method.
     * Usually set to true by the end of an algorithm.
     */
    setLocalStorageItem: function(key, value, emitChange = false){
      localStorage.setItem(key, value);
      this.$set(this.vLocalStorage, key, value);

      //emit change
      if(emitChange){
        // appends the name of the key. Therefore, subscribers should be something like
        // EventBus.$on("modify-local-storage-rollHistory"). TODO: make constants for this.
        EventBus.$emit("modify-local-storage-"+key, this.getVLocalStorage());
      }
    },
    saveNotes: function(notes) {
      this.setLocalStorageItem("notes", notes);
    },
    getNotes: function() {
      return this.vLocalStorage.notes;
    }
  }
}
);