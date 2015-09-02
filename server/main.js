var fs = Meteor.npmRequire('fs');
var csv = Meteor.npmRequire('fast-csv');
var path = process.env.PWD + '/data/managed_parties.csv';
var pathAddresses = process.env.PWD + '/data/CSV_PAF.csv';

Meteor.startup(function() {
  bootstrapManagedParties();
  bootstrapAddresses();

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
        data.Postcode = data.Postcode.replace(" ", "");
        Addresses.insert(data)
      }))
      .on("end", Meteor.bindEnvironment(function() {
        console.log("Completed importing address data");
      }));
  }
}
