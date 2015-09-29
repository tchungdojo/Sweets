myApp.controller('storeController', function($scope, $routeParams, factory){
	$scope.products = [];
    $scope.goto_product = {};
    $scope.cart = [];
    $scope.productLocation;

	var product_id = $routeParams.id;

	if ($routeParams.id){
		factory.productById(product_id, function(result){
			$scope.goto_product = result;
			console.log('hi');
			console.log($scope.goto_product);

			$scope.mapOptions = {
			    zoom: 15,
			    center: new google.maps.LatLng(41.923, 12.513),
			    mapTypeId: google.maps.MapTypeId.ROADMAP
			}
			$scope.map = new google.maps.Map(document.getElementById('map'), $scope.mapOptions); 
			
			var cities = $scope.goto_product._confectioner.address;
			var geocoder= new google.maps.Geocoder();

			 var createMarker = function (info){
			    var marker = new google.maps.Marker({
			        map: $scope.map,
			        icon:'/static/css/blueball.png',
			        animation: google.maps.Animation.DROP,
			        position: new google.maps.LatLng(info.lat(), info.lng())
			    });
			 }

			geocoder.geocode( { 'address': cities }, function(results, status) {
			 if (status == google.maps.GeocoderStatus.OK) {
			    newAddress = results[0].geometry.location;
			    $scope.map.setCenter(newAddress);
			    createMarker(newAddress);
			 }
			});
		})
	} else {
		factory.allInventory(function(data){
			$scope.products = data;
			
		})
	}

	$scope.orderAdd = function (product, order){
        // add to the array
          // $scope.cart.push({item: product, quantity: $scope.item.quantity})
          // console.log($scope.cart);       
          order.total = product.price * order.quantity;
          order.status = 'Pending';
          factory.orderAdd(product, order);
          // clear the form values
          $scope.order = {};
           // factory.getOrders(function(data){
           //    $scope.orders = data;
           //  }); 
          }



})