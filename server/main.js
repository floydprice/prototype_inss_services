var fs = Meteor.npmRequire('fs');
var csv = Meteor.npmRequire('fast-csv');
var pathBKT = process.env.PWD + (process.env.NODE_ENV === 'development' ? '/public/data/bkt_managed_parties.csv':'/app/programs/web.browser/app/data/bkt_managed_parties.csv');
var pathDRO = process.env.PWD + (process.env.NODE_ENV === 'development' ? '/public/data/dro_managed_parties.csv':'/app/programs/web.browser/app/data/dro_managed_parties.csv');
var pathAddresses = process.env.PWD + (process.env.NODE_ENV === 'development' ? '/public/data/CSV_PAF.csv':'/app/programs/web.browser/app/data/CSV_PAF.csv');

Meteor.startup(function() {


});

Meteor.methods({
  reSeedAddresses: function() {
    Addresses.remove({})
    bootstrapAddresses();
  },
  reSeedBKTParties: function() {
    BKTManagedParties.remove({}  );
    bootstrapBKTManagedParties();
  },
  reSeedDROParties: function() {
    DROManagedParties.remove({}  );
    bootstrapDROManagedParties();
  }
});

var bootstrapBKTManagedParties = function() {
  if (BKTManagedParties.find().count() === 0) {
    console.log("Starting to import BKT Managed Parties")
    fs.createReadStream(pathBKT)
      .pipe(csv({
        headers: true
      }))
      .on("data", Meteor.bindEnvironment(function(data) {
        //console.log("Inserting party into collection: ", data);
        BKTManagedParties.insert(data)
      }))
      .on("end", Meteor.bindEnvironment(function() {
        console.log("Completed importing BKT managed parties");
      }));
  }
};


var bootstrapDROManagedParties = function() {
  if (DROManagedParties.find().count() === 0) {
    console.log("Starting to import DRO Managed Parties")
    fs.createReadStream(pathDRO)
      .pipe(csv({
        headers: true
      }))
      .on("data", Meteor.bindEnvironment(function(data) {
        //console.log("Inserting party into collection: ", data);
        DROManagedParties.insert(data)
      }))
      .on("end", Meteor.bindEnvironment(function() {
        console.log("Completed importing DRO managed parties");
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
