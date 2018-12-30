import Consts from "./Constants";

const PERCENTAGE_MULTIPLIER = .02,
    MAX_ROLL = 20,
    CRITICAL_FAIL = 1,
    CRITICAL_SUCC = 20;

const consumeStat = function(stat, multiplier, isPositive){
  if(stat && stat.base && stat.willCalculate){
    multiplier = isPositive ? multiplier : multiplier * -1;
    return  (stat.add + stat.base) * multiplier;
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

// when player clicks "roll"
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
  finalRollValue += computeStats(stats, Consts.OCCUPATION, 1, true, 5);
  //compute talents
  finalRollValue += computeStats(stats, Consts.TALENT, PERCENTAGE_MULTIPLIER, true, 5);

  //compute afflictions
  finalRollValue += computeStats(stats, Consts.AFFLICTION, PERCENTAGE_MULTIPLIER, true, 5);

  //return json object
  return {
    roll: rollValue,
    finalRoll: finalRollValue,
    status: finalRollValue <= CRITICAL_FAIL ? 
        Consts.CRIT_FAIL_IND : finalRollValue >= CRITICAL_SUCC ? 
        Consts.CRIT_SUCC_IND : Consts.NORM_ROLL_IND
  }
}

export default {
  roll,
  PERCENTAGE_MULTIPLIER,
  MAX_ROLL,
  CRITICAL_FAIL,
  CRITICAL_SUCC
}
