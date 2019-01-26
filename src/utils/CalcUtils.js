import Consts from "./Constants";

//define clamp function for number
Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};

let buffs = [];
let debuffs = [];

const PERCENTAGE_MULTIPLIER = 5,
    MAX_ROLL = 20,
    CRITICAL_FAIL = 1,
    CRITICAL_SUCC = 20;

const consumeStat = function(stat, multiplier, isPositive){
  if(stat && stat.base && stat.willCalculate){
    multiplier = isPositive ? multiplier : multiplier * -1;

    const result = (stat.add + stat.base) * multiplier;

    if (isPositive){
      buffs.push({name:stat.name,value:result});
    } else {
      debuffs.push({name:stat.name,value:result});
    }

    return result;
  }

  return 0;
}

const computeStats = function(stats, type, multiplier, isPositive, max){
  let sum = 0;
  let stat = {};

  //compute 
  for(let i = 1; i <= max; i++){
    //type + i: basically "talent1","affliction2", "occupation5", etc.
    stat = stats[type+i];

    sum += consumeStat(stat, multiplier, isPositive);
  }

  return sum;
}

const getPercentageValue = function(value){
  return value * PERCENTAGE_MULTIPLIER;
}

const getStrPercentageValue = function(value){
  return getPercentageValue(value) +"%";
}

const appendPercentageToValue = function(value){
  return value + " (" + getStrPercentageValue(value) + ")";
}

const d20 = function() {
  let min = Math.ceil(1);
  let max = Math.floor(20);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// when player clicks "roll"
const roll = function(stats) {
  buffs = [];
  debuffs = [];

  //randomize
  let rollValue = Math.ceil(Math.random() * MAX_ROLL);
  let finalRollValue = rollValue;

  let stat = {};

  //compute physical properties
  Consts.PHYSICAL_PROPERTIES.forEach(property =>{
    stat = stats[property];

    finalRollValue += consumeStat(stat, 1, true);
  });

  //compute occupations
  finalRollValue += computeStats(stats, Consts.OCCUPATION, 1, true, 5);

  //compute talents
  finalRollValue += computeStats(stats, Consts.TALENT, 1, true, 5);

  //compute afflictions
  finalRollValue += computeStats(stats, Consts.AFFLICTION, 1, false, 5);

  finalRollValue = finalRollValue.clamp(1,20);
  //return json object
  return {
    roll: rollValue,
    finalRoll: finalRollValue,
    buffs, debuffs,
    status: finalRollValue <= CRITICAL_FAIL ? 
        Consts.CRIT_FAIL_IND : finalRollValue >= CRITICAL_SUCC ? 
        Consts.CRIT_SUCC_IND : Consts.NORM_ROLL_IND,
    chanceOfDying: (stats.mortalityNumber * 5) + "%",
    verdict: stats.mortalityNumber > finalRollValue ? "Dead" : "Alive"
  }
}

export default {
  d20,
  roll,
  getPercentageValue,
  getStrPercentageValue,
  appendPercentageToValue,
  PERCENTAGE_MULTIPLIER,
  MAX_ROLL,
  CRITICAL_FAIL,
  CRITICAL_SUCC
}
