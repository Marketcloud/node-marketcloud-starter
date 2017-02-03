var app = angular.module('MarketcloudExpressStarter',[]);


app.factory('marketcloud',function(){
	var client = marketcloud

	client.public = 'f84af487-a315-42e6-a57a-d79296bd9d99';
	client.baseUrl = 'http://localhost:5000/v0'
	return client;
})

app.controller('ItemController',function($scope,$http,marketcloud){
	$scope.product = JSON.parse($("#product_data").text());
	$scope.cart = JSON.parse($("#cart_data").text());


	$scope.selectedVariants = {}

	// choice, variant
	function testVariant(c,v) {
		
		var test = true;
		for (k in c) {
			if (c[k] === v[k])
				test = false
		}
		return test;
	}
	function getVariantObject(choice) {

		var found = null;
		$scope.product.variants.forEach(function(v){
			if (testVariant(choice,v)){
				
				found = v;
			}
		})
		return found;
	}
	$scope.addingToCart = false;
	$scope.addToCart = function() {

		var chosen = null;
		if ($scope.product.has_variants){
			for (var k in $scope.product.variantsDefinition) {

				if (!$scope.selectedVariants[k]){

					return notie.alert(2,"Please select "+k)
				}
			}

			
			
			for (var i=0; i< $scope.product.variants.length; i++){
				var curr = $scope.product.variants[i];

				var all_match = true;
				for (var k in $scope.selectedVariants){

					if (curr[k] !== $scope.selectedVariants[k]){
						all_match = false;
					}
				}

				if (true === all_match){
					chosen = curr;
				}

			}

				$scope.addingToCart = true;
				marketcloud.carts.add($scope.cart.id,[{
					product_id : $scope.product.id,
					quantity : 1,
					variant_id : chosen.id
				}],function(err,data){
					$scope.addingToCart = false;
					$scope.$apply();
					if (err){
						console.log("ERROR",err)
						notie.alert(3,"AN error has occurred",1);
					}
					else{
						console.log("DATA",data)
						notie.alert(1,"Item added to cart",1)
					}
				})
		}
		else{

				$scope.addingToCart = true;
				marketcloud.carts.add($scope.cart.id,[{
					product_id : $scope.product.id,
					quantity : 1,
					variant_id :0
				}],function(err,data){
					$scope.addingToCart = false;
					$scope.$apply();
					if (err){
						notie.alert(3,"AN error has occurred",1);
					}
					else{
						notie.alert(1,"Item added to cart",1)
					}
				})

		}
		



	}

})

var cartController = function(scope,marketcloud){
	scope.cart = JSON.parse($("#cart_data").text());

	scope.updateCart = function() {
		marketcloud.carts.update(scope.cart.id,scope.cart.items,function(err,data){
			if (err){
				console.log(err)
				return notie.alert(3,'An error has occurred',1);
			}

			notie.alert(1,'Cart updated',1);
			scope.cart = data;
			scope.$apply();
			
		})
	}

	scope.removeFromCart = function(product_id,variant_id) {
		console.log("Removing "+product_id)
		marketcloud.carts.remove(scope.cart.id,[{
			product_id : product_id,
			variant_id : variant_id || 0
		}],function(err,data){
			if (err)
				return notie.alert(3,'An error has occurred',1);

			notie.alert(1,'Removed from cart',1);
			scope.cart = data;
			scope.$apply();
			
		})
	}
};
cartController.$inject = ['$scope','marketcloud']
app.controller('CartController',cartController);


app.controller('CheckoutController',function($scope,$http,marketcloud){

	$scope.address = {
		email : 'cikkense@gmail.com',
		full_name : 'Mattia Astorfi',
		country : 'Italy',
		city : 'Ancona',
		address1 : 'Fake street 123',
		state : 'Marche',
		postal_code : '60100'
	}


	$scope.payment_method_nonce = null;
	
	$scope.selected_shipping_method_id = null;
	$scope.cart = JSON.parse($("#cart_data").text());


	// We generated a client token for you so you can test out this code
	// immediately. In a production-ready integration, you will need to
	// generate a client token on your server (see section below).
	$scope.clientToken = null;
	

	$http({
		method : 'POST',
		url : 'https://api.marketcloud.it/v0/integrations/braintree/clientToken',
		
		headers : {
			Authorization : marketcloud.public
		}
	})
	.then(function(response){
		


		$scope.clientToken = response.data.data.clientToken;
		console.log("Braintree returned a clientToken",$scope.clientToken)
		// Prendi il token dal server
		console.log("The Payment method must still be confirmed.")
		braintree.setup($scope.clientToken, "dropin", {
		  container: "payment-form",
		  onPaymentMethodReceived: function (nonce) {
		  			$scope.payment_method_nonce = nonce;
		  			$scope.payment_method_nonce = 'fake-valid-nonce';
		            console.log("Braintree returned a nonce",nonce);
		            $scope.doCheckout()
		        }
		});

	
	})
	.catch(function(response){
		console.log("Token response",response.data.data.clientToken);
		notie.alert(2,"An error has occurred, order cannot be processed, please try reloading the page.")
	})


	$scope.doCheckout = function() {
		var order = {
			shipping_address : $scope.address,
			billing_address : $scope.address,
			cart_id : $scope.cart.id,
			shipping_id : $scope.selected_shipping_method_id
		};
		marketcloud.orders.create(order,function(err,data){

			if (err) {
				return notie.alert(3,"Oh mama the order is not right",1);
			}

			console.log("Order saved with id "+data.id);
			
			marketcloud.payments.create({
				method : 'Braintree',
				order_id : data.id,
				nonce : $scope.payment_method_nonce
			},function(err,response){
				if (err) {
					notie.alert(3,"O mama, what happnd",1);
					
				} else {
					console.log("Order paid")
					notie.alert(1,"O mama, checkout was good",1);
				}
			})
			
		});
		
	}


	$scope.printScope = function() {
		

		var order = {
			shipping_address : $scope.address,
			billing_address : $scope.address,
			cart_id : $scope.cart.id,
			shipping_id : $scope.selected_shipping_method_id
		}

		console.log("DAH ORDAH",order);
	}
})
