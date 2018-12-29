
const gsxToAss = function(characters){
  characters.forEach(chara => {
    let tempChara = {};

    Object.keys(chara).forEach(key => {
      // if key does not contain gsx, data is irrelevant; delete 
      if(!key.includes("gsx$")){
        delete chara[key];
      } else {
        // get proper value
        chara[key] = chara[key].$t;

        // array strings tagged as ending in "arr" are converted into arrays 
        if(key.endsWith("arr")){
          chara[key] = chara[key].split("\n");
        }
      }
    })
  })
}
export default {
  gsxToAss
}