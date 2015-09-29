myApp.controller('ordersController', function ($scope, $routeParams, factory){
      //  initialize an empty array so $scope.students maintains a consistent data type
    $scope.orders = [];
    $scope.products= [];
        // var user_id = $scope.user._id;
        // var user_name = $scope.user.name;
        // var user_id = $routeParams.id;


        // productFactory.inventory(function(data){
        //   $scope.products = data;
        //   console.log($scope.products);
        //   }) 


      $scope.orders = factory.cart();
          console.log($scope.orders);

     $scope.checkout = function(){
          factory.checkout($scope.orders);
        }
      // $scope.orderAdd = function (){
      //   // add to the array
      //   var date = new Date();
      //   $scope.newOrder.dateOrdered = date;
      //   newOrder = $scope.newOrder;
      //   console.log(newOrder);
      //   orderFactory.orderAdd(newOrder);
      //     // clear the form values
      //     $scope.newOrder = {};
      //     orderFactory.getOrders(function(data){
      //         $scope.orders = data;
      //     }); 
      // }

      // $scope.orderRemove = function(order){
      //     // var indexOrder = $scope.orders.indexOf(order);
      //     orderFactory.removeOrder(order);
      //     orderFactory.getOrders(function(data){
      //         $scope.orders = data;
      //     }); 
      // }


  })