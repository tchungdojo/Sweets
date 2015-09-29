// this is our friends.js file located at /server/controllers/friends.js
// note the immediate function and the object that is returned

// First add the following two lines at the top of the friends controller so that we can access our model through var Friend
// need to require mongoose to be able to run mongoose.model()
var mongoose = require('mongoose');
// require('../models/customer');
var Order = mongoose.model('Order');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var Vendor = mongoose.model('Vendor');

module.exports = (function() {
 return {

  orderGet: function(req, res) {
     
      Order.find({_user: req.query.id}, function(err, orders) {
       if(err) {
         console.log(err);
         } else {
           // res.json(results);
          }
        })
          .populate('items')
          .exec(function(err, orders) {
            if(err) {
               console.log('Unable to retrieve items');
             } 
             else { 
               console.log('successfully collected all items!');
               console.log(users);
            }
       })
      res.json(orders);
    },

  // orderAdd: function(req, res) {
  //   // console.log(req.body);
  //    var newOrder = new Order(
  //       {client: req.body.client,
  //        item: req.body.item,
  //        quantity: req.body.quantity, 
  //        dateOrdered: req.body.dateOrdered,
  //        dateUpdated: req.body.dateUpdated
  //       });
  //    newOrder.save(function(err) {
  //      console.log(newOrder);
  //      if(err) {
  //        console.log(err);
  //         } else {
  //        console.log('New order has been added!');
  //        res.redirect('/orders');
  //         }
  //     })
  //   },

    // orderAdd: function(req, res) {
    // // console.log(req.body);
    //   console.log("COMMENT DATA", req.body);
    //   console.log(req.body.user);

    //   User.findOne({id: req.body.user.id}, function(err, user){
    //     Product.findOne({id: req.body.item.id}, function(err, product){
    //         var newOrder = new Order({
    //         quantity: req.body.quantity,
    //         dateOrdered: req.body.dateOrdered,
    //         dateUpdated: req.body.dateUpdated
    //       });
    //       //  set the reference like this:
    //       newOrder._user = user._id;
    //       user.orders.push(newOrder);
    //       newOrder.item.push(product);  
    //       // now save both to the DB
    //       user.save(function(err){
    //            newOrder.save(function(err){
    //                 product.save(function(err){
    //                   if(err) {console.log('Error');
    //                    } 
    //                   else { res.redirect('/');
    //                   }
    //              })
    //           });
    //        });
    //     });
    //   });
   
       // product._order = newOrder._id;
      // Product.Update({id: req.body.item.id},{
      //   stock: product.stock -= req.body.quantity}, function(err, result){} )
    // },

    vendorCheckoutTo: function(req, res) {
    // console.log(req.body);
      console.log("vendorcheckout DATA");
      console.log(req.body);
          var order_id;
        console.log("checkout begins here. 1")
        Vendor.findOne({_id: req.body.order.item._confectioner}, function(err, vendor){
           if(err) {console.log('Error');
            } 
            else {         
              var newOrder = new Order({
              _user: req.body.user,
              total: req.body.order.order.total,
              quantity: req.body.order.order.quantity,
              item: req.body.order.item,
              status: req.body.order.order.status,
              dateOrdered: new Date(),
              dateUpdated: new Date()
              });
              console.log('new order:' + newOrder);
              console.log('newOrder:' + newOrder._id);
              // order_id = newOrder._id;
              console.log('vendor info?');
              // console.log(vendor);
              vendor.orders.push(newOrder._id);
              newOrder.save();
              vendor.save(function(err){
                if(err) {console.log('Error');
                  } 
                else {res.json(newOrder);
                }
              });
            }
         });
     },

  orderCheckout: function(req, res) {
    // console.log(req.body);
      console.log("ORDER DATA", req.body.user);
      

      User.findOne({_id: req.body.user}, function(err, user){
          console.log(user);
           console.log("checkout begins here. this is the last checkout")
            user._orders.push(req.body.item._id);
        user.save(function(err){
          if(err) {console.log('Error');
             } 
            else { res.redirect('/');
             }
          });
      })
    },
    orderStatus: function(req, res){
      console.log(req.body);
      Order.update({_id: req.body.order._id}, {status: req.body.order.status}, function(err, order){
        if(err) {
          console.log('Error');
        } 
        else { 
          console.log('done');
        }
      })
    }
    // orderRemove: function(req, res) {
    //  console.log(req.body);
    //  order = {
    //   user: req.body.user, 
    //   item: req.body.item,
    //   quantity: req.body.quantity,
    //   dateOrdered: req.body.dateOrdered,
    //   dateUpdated: req.body.dateUpdated
    //   };

    //  Order.remove(order,function(err) {
    //   if(err) {
    //      console.log(err);
    //       } else {
    //      res.redirect('/orders');
    //       }
    //   })
    // }

}})();