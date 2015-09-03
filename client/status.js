Meteor.subscribe("ManagedParties");
Meteor.subscribe("Addresses");
Template.main.helpers({
  partyCount: function() {
    return ReactiveMethod.call("totalPartyCount");
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
  "click #reSeedParties": function(event, template) {
    if (confirm("Doing this will remove all the exisitng data and reseed against the data file, it might take a while... are you sure?")) {
      Meteor.call("reSeedParties");
      alert("Started, give it a while.");
    }
  }
});
