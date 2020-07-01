const fs = require('fs');
const glasses = './data/glasses.json';

//Check Volume of Cocktail liuqor and Mixers
class VolumeCheck {
  check(cocktail) {
    const cocktailVolume = this.volume(cocktail);
    const glassVolume = this.getGlass(cocktail.glassType);
    if (glassVolume >= cocktailVolume) {
      return { success: true };
    } else {
      return {
        success: false,
        maxQuantity: glassVolume,
        currentQuantity: cocktailVolume,
      };
    }
  }

  //Getting liquor and mixers Volume
  volume(cocktail) {
    let volume = 0;
    cocktail.liquor.forEach(liquor => {
      volume += parseInt(liquor.quantity);
    });
    cocktail.mixers.forEach(mixer => {
      volume += parseInt(mixer.quantity);
    });
    return volume;
  }

  //Getting Glass volume
  getGlass(glassType) {
    const rawdata = fs.readFileSync(glasses);
    const allGlasses = JSON.parse(rawdata);
    const glass = allGlasses.find(glass => glass.type === `${glassType}`);
    return glass.volume;
  }
}

module.exports = VolumeCheck;
