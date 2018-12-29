import Consts from "constants/ass-constants";

const blankRollDetails = function() {
  return {
    constitution:{
      calculate:false,
      base:"",
      add:""
    }
  }
}

const roll = function(stats) {
  let finalRoll = 0;
  Consts.PHYSICAL_PROPERTIES.forEach(property =>{
    stat = stats[property];
    
    if(stat.willCalculate){
      finallRoll += stat.add + stat.base;
    }
  })
}

export default {
  roll
}
