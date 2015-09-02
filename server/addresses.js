
Meteor.methods({
  totalAddressCount:function(){
     return Addresses.find().count();
  }
});

Addresses._ensureIndex({
  "Postcode": "text"
});

Picker.route('/v1/postcodes/', function(params, req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  if (params.query.q) {
    var addresses = Addresses.find({
      "Postcode": {
        $regex: params.query.q,
        $options: 'i'
      }
    }, {
      fields: {
        '_id': 0 // Don't need the mongo id
      },limit: 15
    }).fetch();

    res.statusCode = 200;
    res.end(JSON.stringify(addresses));
  } else{
    res.statusCode = 400;
    res.end();
  }
});
