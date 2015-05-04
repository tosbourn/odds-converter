Meteor.fractions = {
  reduce: function (numerator, denominator) {
    var f = Meteor.fractions.GCD(numerator, denominator);
    return [numerator / f, denominator / f];
  },

  GCD: function (numerator, denominator) {
    var larger, smaller;
    if (numerator === denominator) {
      return numerator;
    } else if (numerator < denominator) {
      larger = denominator;
      smaller = numerator;
    } else {
      larger = numerator;
      smaller = denominator;
    }

    console.log(numerator, denominator);

    while(smaller !== 0) {
      var temp = smaller;
      smaller = larger % smaller;
      larger = temp;
      console.log(larger, smaller);
    }

    return larger;
  },
  
  moneyline: function(numerator, denominator) {
    if (numerator > denominator) {
      return "+" + parseFloat((numerator / denominator) * 100).toFixed(2);
    } else {
      return "-" + parseFloat((denominator / numerator) * 100).toFixed(2);
    }
  }
}
