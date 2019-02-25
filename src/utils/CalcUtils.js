import Consts from "./Constants";
import { EventBus } from "store/ass-store";

//define clamp function for number
Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};

const PERCENTAGE_MULTIPLIER = 5,
    MAX_ROLL = 20,
    CRITICAL_FAIL = 1,
    CRITICAL_SUCC = 20;

const consumeStat = function(stat, multiplier, isPositive, buffs, debuffs){
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

const computeStats = function(stats, type, multiplier, isPositive, max, buffs, debuffs){
  let sum = 0;
  let stat = {};

  //compute 
  for(let i = 1; i <= max; i++){
    //type + i: basically "talent1","affliction2", "occupation5", etc.
    stat = stats[type+i];

    sum += consumeStat(stat, multiplier, isPositive, buffs, debuffs);
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
  return Math.ceil(Math.random() * 20);
}

const precedenceRoll = function(charas){
  let sortedCharas = [];
  charas.forEach(chara => {
    sortedCharas.push({
      name: chara.name,
      agility: chara.agility,
      roll: parseFloat(chara.agility) + d20()
    });
  })
  sortedCharas.sort((y, x) => {
    let n = x.roll - y.roll;
    if (n !== 0) {
        return n;
    }

    return x.agility - y.agility;
  });

  let returnedSort = [];
  sortedCharas.forEach(chara => {
    returnedSort.push(chara.name);
  });

  return returnedSort;
}

const getTotalStats = function(stats, buffs, debuffs) {
  let totalStats = 0;
  let stat = {};
  Consts.PHYSICAL_PROPERTIES.forEach(property =>{
    stat = stats[property];

    totalStats += consumeStat(stat, 1, true, buffs, debuffs);
  });

  //compute occupations
  totalStats += computeStats(stats, Consts.OCCUPATION, 1, true, 5, buffs, debuffs);

  //compute talents
  totalStats += computeStats(stats, Consts.TALENT, 1, true, 5, buffs, debuffs);

  //compute afflictions
  totalStats += computeStats(stats, Consts.AFFLICTION, 1, false, 5, buffs, debuffs);
  return totalStats;
}

const pvpRoll = function(duelists, logRoll = true) {
  const rollValue = Math.ceil(Math.random() * MAX_ROLL);
  let stats = [];
  let buffs = [];
  let debuffs = [];

  duelists.forEach((duelist, index)=> {
    stats[index] = getTotalStats(duelist, buffs, debuffs);
  })
  const statDiff = stats[0] - stats[1];

  // winner attribute: if rollValue is less than or equal to duelist 1's roll chance,
  // duelist 1 wins; otherwise, duelist 2. Returns 0 for duelist 1, 1 for duelist 2.
  let result = {
    winner: rollValue <= 10 + statDiff ? 0 : 1,
    roll: rollValue,
    statDiff: statDiff
  }

  // if log roll, append to roll history
  if(logRoll) {
    EventBus.appendPvpToRollHistory([duelists[0].name, duelists[1].name], result.winner, rollValue);
  }

  return result;
}

// when player clicks "roll"
const roll = function(stats, logRoll = true) {
  let buffs = [];
  let debuffs = [];
  
  //randomize
  let rollValue = Math.ceil(Math.random() * MAX_ROLL);
  let finalRollValue = rollValue;

  finalRollValue += getTotalStats(stats, buffs, debuffs);

  finalRollValue = finalRollValue.clamp(1,20);

  if(logRoll){
    EventBus.appendPveToRollHistory(stats.name, finalRollValue);
  }

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
  precedenceRoll,
  d20,
  getTotalStats,
  pvpRoll,
  roll,
  getPercentageValue,
  getStrPercentageValue,
  appendPercentageToValue,
  PERCENTAGE_MULTIPLIER,
  MAX_ROLL,
  CRITICAL_FAIL,
  CRITICAL_SUCC
}
