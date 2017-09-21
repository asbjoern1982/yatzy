var service = {
  roll: function(holdDice) {
    yatzy.roll(holdDice);
  },

  getThrowCount: function() {
    return yatzy.getThrowCount();
  },

  resetThrowCount: function() {
    yatzy.resetThrowCount();
  },

  getDice: function() {
    return yatzy.getDice();
  },

  getResults: function() {
    return yatzy.getResults();
  }
}
