var fs = Meteor.npmRequire('fs');
var csv = Meteor.npmRequire('fast-csv');
var path = process.env.PWD + (process.env.NODE_ENV === 'development' ? '/public/data/managed_parties.csv':'/app/programs/web.browser/app/data/managed_parties.csv');
var pathAddresses = process.env.PWD + (process.env.NODE_ENV === 'development' ? '/public/data/CSV_PAF.csv':'/app/programs/web.browser/app/data/CSV_PAF.csv');

Meteor.startup(function() {


});

Meteor.methods({
  reSeedAddresses: function() {
    Addresses.remove({})
    bootstrapAddresses();
  },
  reSeedParties: function() {
    ManagedParties.remove({}  );
    bootstrapManagedParties();
  }
});

var bootstrapManagedParties = function() {
  if (ManagedParties.find().count() === 0) {
    console.log("Starting to import Managed Parties")
    fs.createReadStream(path)
      .pipe(csv({
        headers: true
      }))
      .on("data", Meteor.bindEnvironment(function(data) {
        //console.log("Inserting party into collection: ", data);
        ManagedParties.insert(data)
      }))
      .on("end", Meteor.bindEnvironment(function() {
        console.log("Completed importing managed parties");
      }));
  }
};


var bootstrapAddresses = function() {
  if (Addresses.find().count() === 0) {
    console.log("Starting to Address Data from PAF")
    fs.createReadStream(pathAddresses)
      .pipe(csv({
        headers: [
          "Postcode",
          "PostTown",
          "DependentLocality",
          "DoubleDependentLocality",
          "Thoroughfare",
          "DependentThouroughfare",
          "BuildingNumber",
          "BuildingName",
          "SubBuildingName",
          "PoBox",
          "DepartmentName",
          "OrganisationName",
          "SourceRef",
          "PostcodeType",
          "SuOrgIndicator",
          "DeliveryPointSuffix"
        ]
      }))
      .on("data", Meteor.bindEnvironment(function(data) {
        if (data.Postcode) {
          data.Postcode = data.Postcode.replace(" ", "");
        }
        if (data.BuildingNumber) {
          data.BuildingNumber = parseInt(data.BuildingNumber);
        }
        Addresses.insert(data)
      }))
      .on("end", Meteor.bindEnvironment(function() {
        console.log("Completed importing address data");
      }));
  }
}
