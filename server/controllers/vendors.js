var mongoose = require('mongoose');
// require('../models/customer');
var Vendor = mongoose.model('Vendor');
var Product = mongoose.model('Product');
var Order = mongoose.model('Order');
module.exports = (function() {
	return {
		login: function(req, res){
			console.log(req.body);
			Vendor.findOne({email: req.body.email}, function(err, result){
				if(err){
					console.log('error with seller login');
				} else {
					res.json(result);
				}
			})
		},

		grabOrders: function(req, res){
			console.log(req.query.id);
			Vendor.findOne({_id: req.query.id})
			.populate('orders')
			.populate('orders.item')
			.exec(function(err, vendor){
				Order.populate(vendor, {

					path: 'orders.item',
					select: 'product',
					model: Product
				})
				console.log(vendor);
				res.json(vendor);
			})
		}


}})();