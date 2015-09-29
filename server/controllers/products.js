// this is our friends.js file located at /server/controllers/friends.js
// note the immediate function and the object that is returned

// First add the following two lines at the top of the friends controller so that we can access our model through var Friend
// need to require mongoose to be able to run mongoose.model()
var mongoose = require('mongoose');
// require('../models/customer');
var Product = mongoose.model('Product');

module.exports = (function() {
 return {
  inventory: function(req, res) {
     Product.find({_confectioner: req.params.id}, function(err, results) {
       // console.log(results);
       if(err) {
         console.log('error in grabbing all inventory of one vendor');
       } else {
         // console.log(results);
         res.json(results);
       }
   })
  },

  allInventory: function(req, res) {
     Product.find({}, function(err, results) {
       // console.log(results);
       if(err) {
         console.log('error in grabbing all inventory');
       } else {
         // console.log(results);
         res.json(results);
       }
   })
  },

  productAdd: function(req, res) {
    newProduct = new Product(req.body);
     newProduct.save(function(err) {
       if(err) {
         console.log('error in adding a product');
          } else {
         console.log('New product has been added!');
         res.redirect('#seller');
          }
      })
    },

  updateProduct: function(req, res){
    Product.findOne({_id: req.body.id})
      .populate('_confectioner')
      .exec(function(err, product){
        if(err) {
         console.log('error in grabbing all inventory');
       } else {
         // console.log(product);
         res.json(product);
       }
      })
  },

  editProduct: function(req, res){
    Product.update({_id: req.body.info._id}, 
      {
        product: req.body.info.product,
        price: req.body.info.price,
        serving: req.body.info.serving,
        ingredients: req.body.info.ingredients,
        description: req.body.info.description
      },
      function(err){
        if(err) {
         console.log('error in adding a product');
          } else {
         console.log('product has been updated!');
         res.end();
          }
      })
  },

  updateUrl: function(req, res){
    console.log(req.file);
    Product.update({_id:req.body.productId}, {url: '../../uploads/'+ req.file.filename}, 
      function(err, results){
        if(err) {
         console.log('error in adding a product');
          } else {
         console.log('product has been updated!');
            res.json(results)
          }
      })
  },

  productRemove: function(req, res) {
   console.log(req.body);
   var product = {id: req.body.id}
     Product.remove(product,function(err) {
      if(err) {
         console.log(err);
          } else {
         res.redirect('/products');
          }
      })
    }

}})();
