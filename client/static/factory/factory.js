myApp.factory('factory', function($http){
	var factory = {};
//-----------product factory--------------//
	var products = [];
  
	factory.inventory = function (callback){
    var seller_id = current_user._id;
		$http.get('/inventory/'+seller_id).success(function (data) {
			products = data;
			callback(products);
		}) 
	}
  factory.allInventory = function (callback){
        // pass the clients to a callback to be used by whoever calls the method
        $http.get('/allInventory').success(function (data) {
          products = data;
          callback(products);
        }) 
  }
  
  factory.productById = function (product_id, callback){
    $http.post('/updateProduct', {id: product_id}).success(function (data) {
      products = data;
      callback(products);
    }) 
  }
  
  factory.editProduct = function(update_product_info){
    $http.post('/editProduct', {info: update_product_info});
  }

	factory.productAdd = function (info){
      info._confectioner = current_user._id;
			$http.post('/product_add', info).success(function(output){
			// orders = output;       
			// callback(orders);   
		  });
		}
  factory.orderStatus = function(order){
    $http.post('/orderStatus', {order: order});
  }

		// factory.productRemove = function(product, callback){
		// 	var data = product;
		// 	$http.post('/product_remove', data).success(function(output){
		// 		products = output;       
		// 		callback(products);   
		// 	});
		// }

//------------user factory----------//
	var users = [];
  var loginUser = {};
    factory.userList = function (callback){
          $http.get('/users').success(function (data) {
          callback(data);
        }) 
       }

    factory.addUser = function (newU, callback){
        newU.dateCreated = new Date();
        $http.post('/user_add', newU).success(function(output){
            users = output;       
            callback(users);   
        });
      }

    factory.userLogin = function(nUser, callback){
    $http.post('/nUser_login', nUser).success(function(output){
      if(output != null && nUser.password == output.password){ //check if output is not empmty => if empty, need to register as a new user
        loginUser = output;
        callback(loginUser);
      } 
      else {
        var message = "Invalid user login";
        callback(message);
      }
    })  
  }

//------------order factory------------//
	
  var cart = [];
	

    factory.orderAdd = function(product, order){
      var item = {item: product, order: order}
      cart.push(item);
      console.log(cart);
      item = {};
    }

    factory.cart = function(){
      console.log("hello, lets check out");
      return cart;
    }

    factory.checkout = function(cart){      
        var order_list = [];
        var cart_checkout = {
          user: loginUser._id,
          cart: cart
        }
        // var cart_pending = [];
        var item_pending = {};
        // console.log(cart_checkout);
        // console.log(cart_checkout.cart);
        // console.log(cart_checkout.cart[0]);
        for(var i=0; i<cart.length; i++){
          var cart_item = {user: loginUser._id, order: cart_checkout.cart[i]};
          $http.post('/vendorCheckoutTo', cart_item).success(function(output){              
              item_pending = output;      
              checkout = {user: loginUser._id, item: item_pending};
              console.log('here is a checkout');
              $http.post('/orderCheckout', checkout).success(function(output){
              });
              console.log("item has been checked out")
              // console.log('item pending: '+ item_pending);
              // console.log(item_pending);
              // order_list.push(item_pending);
              // console.log(cart_checkout);
          }); 
        }
      } 
    // factory.orderAdd = function (order){
    //     console.log(order);
    //     date = new Date();
    //     var data = {
	   //      user: order.user, 
	   //      item: order.item, 
	   //      quantity: order.quantity, 
	   //      dateCreated: date, 
	   //      dateUpdated: date}
    //     console.log(data);
    //     $http.post('/order_add', data).success(function(output){
    //         // orders = output;       
    //         // callback(orders);   
    //     });
    // }


//------------seller factory-----------//
  var current_user;
  var orders = [];
  factory.sellerLogin = function(cSeller, callback){
    $http.post('/cSeller_login', cSeller).success(function(output){
      if(output != null && cSeller.password == output.password){ //check if output is not empmty => if empty, need to register as a new user
        current_user = output;
        callback(output);
      } 
      else {
        var message = "Invalid patissier login";
        callback(message);
      }
    })  
  }

  factory.sellerOrders = function (callback){
        // pass the clients to a callback to be used by whoever calls the method
        $http.get('/sellerOrders', {params: {id: current_user._id}}).success(function (data) {
            orders = data;
            callback(orders);
        }) 
    }
    factory.uploadFile = function(fd, callback){
      $http.post('/imgUpload', fd, {
            withCredentials: true,
            headers: {'Content-Type': undefined },
            transformRequest: angular.identity
        }).success(function(output){
          // $location.path('/seller');
          success = output;
          callback(success);
        });
    }




	return factory;
})