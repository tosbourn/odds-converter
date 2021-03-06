if (Meteor.isClient) {
  Session.setDefault('fractional', ''); // 1/2
  Session.setDefault('decimal',    ''); // 0.5
  Session.setDefault('moneyline',  ''); // +200

  Template.mainForm.helpers({
    fractional: function () {
      return Session.get('fractional');
    },
    decimal: function () {
      var formattedDecimal = parseFloat(Session.get('decimal')).toFixed(2);
      return (isNaN(formattedDecimal)) ? "" : formattedDecimal;
    },
    moneyline: function () {
      return Session.get('moneyline');
    }
  });

  Template.mainForm.rendered = function() {
    analytics.page('betting-odds-calculator');
  };

  Template.mainForm.events({
    'keyup [name="fractional"]': function (fraction) {
      var split = fraction.target.value.split("/");
      if (split.length !== 2) return;
      var numerator = parseInt(split[0], 10),
          denominator = parseInt(split[1], 10);

      if (numerator < 1 || denominator < 1) {
        Session.set('decimal', '');
        Session.set('moneyline', '');
        return;
      }

      var moneyline = Meteor.fractions.moneyline(numerator, denominator);

      Session.set('decimal', (numerator / denominator) + 1);
      Session.set('moneyline', moneyline);
    },

    'keyup [name="decimal"]': function (decimal) {
      decimal = parseFloat(decimal.target.value).toFixed(2);

      if (decimal <= 1 || isNaN(decimal)) {
        Session.set('fractional', '');
        Session.set('moneyline', '');
        return;
      }
      var numerator = (decimal-1) * 10000,
          denominator = 10000;

      var reduction = Meteor.fractions.reduce(Math.round(numerator), denominator);
      numerator = reduction[0];
      denominator = reduction[1];

      var moneyline = Meteor.fractions.moneyline(numerator, denominator);

      Session.set('fractional', numerator + "/" + denominator);
      Session.set('moneyline', moneyline);
    },

    'keyup [name="moneyline"]': function (moneyline) {
      moneyline = parseInt(moneyline.target.value, 10);
      var decimal = (moneyline > 0) ? (moneyline/100)+1 : (100/moneyline*-1)+1;
      if (decimal <= 0 || isNaN(decimal)) return;
      var numerator = (decimal-1) * 10000,
          denominator = 10000;

      var reduction = Meteor.fractions.reduce(Math.round(numerator), denominator);
      numerator = reduction[0];
      denominator = reduction[1];

      Session.set('fractional', numerator + "/" + denominator);
      Session.set('decimal', decimal);
    }
  });
}


if (Meteor.isServer) {
  Meteor.startup(function () {});
}
