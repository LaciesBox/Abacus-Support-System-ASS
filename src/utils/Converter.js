
const gsxToAss = function(characters){
  let finalCharas = {};

  characters.forEach(chara => {
    Object.keys(chara).forEach(key => {
      // if key does not contain gsx, data is irrelevant; delete 
      if(!key.includes("gsx$")){
        delete chara[key];
      } 
      else {
        // get proper value
        chara[key] = chara[key].$t;

        // array strings tagged as ending in "arr" are converted into arrays 
        if(key.endsWith("arr")){
          chara[key] = chara[key].split("\n");
        }
      }
    })
    // add object of array to finalCharas to be returned
    finalCharas[chara.gsx$name] = chara;
  })

  return finalCharas;
}
export default {
  gsxToAss
}