const getImgUrl = function(imgName) {
  const images = require.context('assets/', false, /\.png$/);
  return images('./' + imgName + ".png");
};

export default {
  getImgUrl
}