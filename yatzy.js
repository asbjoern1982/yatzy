var yatzy = {
  throwCount: 0,
  dice: [0,0,0,0,0],

  roll: function(holdDice) {
    for (var i = 0; i < yatzy.dice.length; i++)
      if (!holdDice[i])
        yatzy.dice[i] = Math.floor(Math.random() * 6) + 1;
    yatzy.throwCount++;
  },

  getThrowCount: function() {
    return yatzy.throwCount;
  },

  resetThrowCount: function() {
    yatzy.throwCount = 0;
  },

  getDice: function() {
    return yatzy.dice;
  },

  getResults: function() {
    var resultArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for(var i = 0; i < 6; i++)
      resultArray[i] = yatzy.sameVal(i + 1);
    resultArray[6] = yatzy.onePair();
    resultArray[7] = yatzy.twoPair();
    resultArray[8] = yatzy.threeOK();
    resultArray[9] = yatzy.fourOK();
    resultArray[10] = yatzy.fullHaus();
    resultArray[11] = yatzy.smallStraight();
    resultArray[12] = yatzy.largeStraight();
    resultArray[13] = yatzy.chance();
    resultArray[14] = yatzy.yatzy();
    return resultArray;
  },

  countDice: function() {
    var faceVal = [0,0,0,0,0,0];
    for(var d = 0; d < yatzy.dice.length; d++) {
      var dieThrow = yatzy.dice[d];
      if (dieThrow > 0)
        faceVal[dieThrow - 1]++;
    }
    return faceVal
  },

  sameVal: function(val) {
    var temp = yatzy.countDice();
    return temp[val - 1] * val;;
  },

  onePair: function() {
    var pair = 0;
    var temp = yatzy.countDice();
    for(var d = 0; d < temp.length; d++)
      if(temp[d] > 1)
        pair = d + 1;
    return pair * 2;
  },

  twoPair: function() {
    var pairs = 0, pair = 0, pair2 = 0;
    var temp = yatzy.countDice();
    for(var d = 0; d < temp.length; d++)
      if(temp[d] > 1) {
        pair2 = pair;
        pair = d + 1;
      }
    if(pair2 != 0)
      pairs = (pair + pair2) * 2;
    return pairs;
  },

  threeOK: function() {
    var kinds = 0;
    var temp = yatzy.countDice();;
    for(var d = 0; d < temp.length; d++)
      if(temp[d] > 2)
        kinds = d + 1;
    return kinds * 3;
  },

  fourOK: function() {
    var kinds = 0;
    var temp = yatzy.countDice();
    for(var d = 0; d < temp.length; d++)
      if(temp[d] > 3)
        kinds = d + 1;
    return kinds * 4;
  },

  fullHaus: function() {
    var pair = 0, kinds = 0, house = 0;
    var temp = yatzy.countDice();
    for(var d = 0; d < temp.length; d++) {
      if(temp[d] == 2)
        pair = d + 1;
      if(temp[d] > 2)
        kinds = d + 1;
    }
    if(kinds != 0 && pair != 0)
      house = pair * 2 + kinds * 3;
    return house;
  },

  smallStraight: function() {
    var sStraight = 0;
    var temp = yatzy.countDice();
    if (temp[0] == 1
      && temp[1] == 1
      && temp[2] == 1
      && temp[3] == 1
      && temp[4] == 1)
      sStraight = 15;
    return sStraight;
  },

  largeStraight: function() {
    var lStraight = 0;
    var temp = yatzy.countDice();
    if (temp[1] == 1
      && temp[2] == 1
      && temp[3] == 1
      && temp[4] == 1
      && temp[5] == 1)
      lStraight = 20;
    return lStraight;
  },

  chance: function() {
    var chance = 0;
    var temp = yatzy.countDice();
    for(var i = 0; i < temp.length; i++)
      chance += temp[i] * (i + 1);
    return chance;
  },

  yatzy: function() {
    var yatzyresult = 0;
    var temp = yatzy.countDice();
    for(var d = 0; d < temp.length; d++)
      if(temp[d] == 5)
        yatzyresult = 50;
    return yatzyresult;
  }
}
