myApp.controller('usersController', function ($scope, $location, factory){
    $scope.users = [];
    $scope.user = {};
    
    $scope.sellerLogin = function () {
        $scope.errors = [];
        factory.sellerLogin($scope.cSeller, function(data){ 
            if(data == "Invalid patissier login"){
                $scope.errors.push(data);
            }else{
                $scope.users = data;
                $location.path('/seller');    
            }

        })
        $scope.cSeller = {};
    }
    // userFactory.userList(function (data){
    //     $scope.users = data;
    // })

    $scope.addUser= function (){
        $scope.messages = [];
        factory.addUser($scope.newU, function(data){
            $scope.messages.push('Registration successful, please log in!'); 
        });
        $scope.newU = {};        
    }

    $scope.userLogin = function () {
        $scope.errors = [];
        factory.userLogin($scope.nUser, function(data){
            if(data == "Invalid user login"){
                $scope.errors.push(data);
            }else{
                $scope.users = data;
                $location.path('/buyer');    
            }
            
        })
        $scope.nUser = {};
    }
})