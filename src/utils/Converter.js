const shorten = function(s){
  if (s.length > 10){
    return s.slice(0,10) + ".."
  }
  return s;
}

const kebabToCamel = function(s){
  return s.replace(/(\-\w)/g, function(m){return m[1].toUpperCase();});
}

const removeGsxPrefix = function(s){
  return s.slice(4);
}

const gsxToAssField = function(s){
  return removeGsxPrefix(kebabToCamel(s));
}

const gsxToAss = function(characters){
  let finalCharas = {};

  characters.forEach(chara => {
    let finalChara = {};
    let finalKey = "";

    Object.keys(chara).forEach(key => {
      // if key does not contain gsx, data is irrelevant; skip
      if(key.includes("gsx$")){
        finalKey = gsxToAssField(key);
        
        // array strings tagged as ending in "-arr" are converted into arrays; else assign value
        finalChara[finalKey] = key.endsWith("-arr") ? chara[key].$t.split("\n") : chara[key].$t;
      }
    })
    
    // add object of array to finalCharas to be returned
    finalCharas[finalChara.name] = finalChara;
  })

  return finalCharas;
}
export default {
  gsxToAss,
  gsxToAssField,
  shorten
}