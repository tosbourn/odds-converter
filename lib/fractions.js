Meteor.fractions = {
  reduce: function (a,b) {
    var n  = new Array(2);
    var f = Meteor.fractions.GCD(a,b);
    n[0] = a/f;
    n[1] = b/f;
    return n;
  },

  GCD: function (num1,num2) {
    var a; var b;
    if (num1 < num2) {a = num2; b = num1;}
    else if (num1 > num2) {a = num1; b = num2;}
    else if (num1 == num2) {return num1;}
    while(1) {
      if (b == 0) {
        return a;
      }
      else {
        var temp = b;
        b = a % b;
        a = temp;
      }
    }
  },
  
  moneyline: function(numerator, denominator) {
    return (numerator > denominator) ? "+" + (numerator / denominator) * 100 : "-" + (denominator / numerator) * 100;
  }
}
