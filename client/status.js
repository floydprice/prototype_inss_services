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
