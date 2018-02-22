
var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBF0sOtp35lPxCkMuQHPmF1QDjyqeHwbcU'
});

module.exports = function(res,address){


	googleMapsClient.geocode({
  address: address
}, function(err, response) {
  if (!err) {
    console.log(response.json.results);
    res.send(response.json.results[0].geometry.location);
  }
});

}

