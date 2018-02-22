var mongoose = require('mongoose');
var plant = mongoose.Schema({
	    name:String,
		uses:[String],
		locations:[String]
});

module.exports = mongoose.model('medicinal',plant);