Meteor.subscribe("BKTManagedParties");
Meteor.subscribe("DROManagedParties");
Meteor.subscribe("Addresses");
Template.main.helpers({
  partyBKTCount: function() {
    return ReactiveMethod.call("totalBKTPartyCount");
  },
  partyDROCount: function() {
    return ReactiveMethod.call("totalDROPartyCount");
  },
  addressCount: function() {
    return ReactiveMethod.call("totalAddressCount");
  }
});

Template.main.events({
  "click #reSeedAddresses": function(event, template) {
    if (confirm("Doing this will remove all the exisitng data and reseed against the data file, it will take a while... are you sure?")) {
      Meteor.call("reSeedAddresses");
      alert("Started, give it a while.");
    }
  },
  "click #reSeedBKTParties": function(event, template) {
      Meteor.call("reSeedBKTParties");
  },
  "click #reSeedDROParties": function(event, template) {
      Meteor.call("reSeedDROParties");
  }
});
