import Consts from "constants/ass-constants";

const PERCENTAGE_MULTIPLIER = .02;
const MAX_ROLL = 20;

const blankRollDetails = function() {
  return {
    constitution:{
      calculate:false,
      base:"",
      add:""
    }
  }
}

const consumeStat = function(stat, multiplier, isPositive){
  multiplier = isPositive ? multiplier : multiplier * -1;

  if(stat.willCalculate){
    return  (stat.add + stat.base) * multiplier;
  }

  return 0;
}

const computeStats = function(type, multiplier, isPositive, max){
  let sum = 0;
  //compute 
  for(let i = 1; i <= max; i++){
    stat = stats[type+i];

    sum += consumeStat(stat, multiplier, isPositive);
  }

  return sum;
}

const roll = function(stats) {
  //randomize
  let rollValue = Math.ceil(Math.random() * MAX_ROLL);
  let finalRollValue = rollValue;

  let stat = {};

  //compute physical properties
  Consts.PHYSICAL_PROPERTIES.forEach(property =>{
    stat = stats[property];

    finalRollValue += consumeStat(stat, PERCENTAGE_MULTIPLIER, true);
  });

  //compute occupations
  finalRollValue += computeStats(Consts.OCCUPATION, 1, true, 5);

  //compute talents
  finalRollValue += computeStats(Consts.TALENT, PERCENTAGE_MULTIPLIER, true, 5);

  //compute afflictions
  finalRollValue += computeStats(Consts.AFFLICTION, PERCENTAGE_MULTIPLIER, true, 5);

  //return json object
  return {
    roll: rollValue,
    finalRoll: finallRollValue
  }
}

export default {
  roll
}
