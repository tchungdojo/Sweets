var Product = require('../server/controllers/products.js');
var Order = require('../server/controllers/orders.js');
var User = require('../server/controllers/users.js');
var Vendor = require('../server/controllers/vendors.js');
module.exports = function(app, upload){
	app.post('/product_add', function(req, res){
		Product.productAdd(req, res);
	})
	app.get('/inventory/:id', function(req, res){
		Product.inventory(req, res);
	})
	app.post('/updateProduct', function(req, res){
		Product.updateProduct(req, res);
	})
	app.post('/editProduct', function(req, res){
		Product.editProduct(req, res);
	})
	// app.post('/imgUpload', upload.single('file'), function (req, res, next) {
	// 	Product.updateUrl(req, res);
	// })
	app.post('/cSeller_login', function(req, res){
		Vendor.login(req, res);
	})	
	app.get('/allInventory', function(req, res){
		Product.allInventory(req, res);
	})
	app.post('/user_add', function(req, res){
		User.userAdd(req, res);
	})
	app.post('/nUser_login', function(req, res){
		User.userLogin(req, res);
	})
	app.post('/vendorCheckoutTo', function(req,res){
	 	Order.vendorCheckoutTo(req,res);
	})
	app.post('/orderCheckout', function(req,res){
	 	Order.orderCheckout(req,res);
	})
	app.get('/sellerOrders', function(req, res){
		Vendor.grabOrders(req, res);
	})
	app.get('/users', function(req, res){
		User.userList(req, res);
	})
	app.post('/orderStatus', function(req, res){
		Order.orderStatus(req, res);
	})
		// app.post('/imgUpload', upload.single('pic'), function(req, res){
	// 	// console.log(req.body);
	// 	// console.log(req.file);
	// 	// res.status(204).end();
	// });
}