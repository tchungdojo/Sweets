myApp.controller('productsController', function ($scope, $routeParams, factory, $location){
    $scope.products = [];
    $scope.updateProduct = {};
    $scope.orders = [];
    $scope.userList = [];

    factory.inventory(function(data){
        $scope.products = data;
    }) 
    var product_id = $routeParams.id;
    factory.productById(product_id, function(data){
        $scope.updateProduct = data;
    })
    factory.userList(function(data){
        $scope.userList = data;
    })
    factory.sellerOrders(function(data){
         $scope.orders = data.orders;
         for (var i =0; i< $scope.orders.length; i++){
            for(var j=0; j< $scope.products.length; j++){
                if($scope.orders[i].item == $scope.products[j]._id){
                  $scope.orders[i].name = $scope.products[j].product;
                }
            }
            for(var k=0; k< $scope.userList.length; k++){
                if($scope.orders[i]._user == $scope.userList[k]._id){
                    customer = $scope.userList[k].first_name + ' ' + $scope.userList[k].last_name;
                  $scope.orders[i].customer = customer;
                }
            }
        }
    })
    // $scope.redirect = function(){
    //     $location.path('/seller');
    // }
    // $scope.imgUpload = function(){
    //     console.log($scope.image);
    //     factory.imgUpload($scope.image, function(){

    //     })
    // }
    $scope.editProduct = function(id){
        factory.editProduct($scope.updateProduct);
    }
    
    $scope.productAdd = function (){
        // add to the array
        // console.log($scope.newProduct);
        $scope.newP.dateCreated = new Date();
        $scope.newP.dateUpdated = new Date();
        $scope.newP.url = './static/css/plate.png';
        newP = $scope.newP;
        // console.log(newProduct);
        factory.productAdd(newP);
        // clear the form values
        $scope.newP = {};
        factory.inventory(function(data){
            $scope.products = data;
        }); 
    }

    $scope.orderStatus = function(order){
        factory.orderStatus(order);
    }


})