var express = require('express');
var router = express.Router();

var Marketcloud = require('marketcloud-node');



/* GET home page. */

router.get('/', function(req,res,next) {

 var mc = req.app.get('marketcloud')
  

  Marketcloud.Promise.all([
  		mc.products.list({}),
  		mc.categories.list({}),
  		mc.brands.list({})
  ]).then(function(results){

  	res.render('index', {  
  		products : results[0],
  		categories:results[1],
  		brands:results[2]
  	});
  }).catch(function(response){

  	res.render('error', {
		            message: response.errors[0].message,
		            error: response.errors[0],
		            title: 'error'
	});
  })
  
});


router.get('/item/:product_id',function(req,res,next){
	var mc = req.app.get('marketcloud')
	return mc.products.getById(req.params.product_id)
			.then(function(response){
				res.render('item', {product : response});
			})
      .catch(function(){
  	     res.render('error', {
		            message: response.errors[0].message,
		            error: response.errors[0],
		            title: 'error'
		        });
      })
})


router.get('/checkout',function(req,res,next){
  var mc = req.app.get('marketcloud');
  var cart = req.app.locals.cart;

  //Short-circuiting to cart view
  if (cart.items.length === 0)
    return res.render('cart');

  var total_value = cart.items
  .map(function(x){
    return x.price*x.quantity;
  })
  .reduce(function(a,b){
    return a+b;
  });
  
 return  mc.shippings.list({value : total_value})
  .then(function(response){
    res.render('checkout',{shippings : response})
  })
  .catch(function(){
         res.render('error', {
                message: response.errors[0].message,
                error: response.errors[0],
                title: 'error'
            });
      })
  
})

router.post('/checkout',function(req,res,next){
  var mc = req.app.get('marketcloud');
  var created_order = null;
  return mc.orders.create(JSON.parse(req.body.order))
  .then(function(response){
    created_order = response;
    //Creating the payment now
    var payment = {
      method : 'Braintree',
      order_id : response.id,
      nonce : 'fake-valid-nonce'
    };
    
    return mc.payments.create(payment);
  })
  .then(function(response){
    //The payment was ok
    res.render('order_confirmed',{order : created_order})
  })
  .catch(function(error){
    console.log(error)
    res.render('error')
  })
})

router.get('/cart',function(req,res,next){
	var mc = req.app.get('marketcloud')
	res.render('cart')
})


router.get('/search',function(req,res,next){

	var mc = req.app.get('marketcloud')
	return Marketcloud.Promise.all([
  		mc.products.list(req.query),
  		mc.categories.list({}),
  		mc.brands.list({})
  ]).then(function(results){

  	res.render('index', {  
  		products : results[0],
  		categories:results[1],
  		brands:results[2]
  	});
  }).catch(function(response){

  	res.render('error', {
		            message: response.errors[0].message,
		            error: response.errors[0],
		            title: 'error'
	});
  })

})



router.get('/login',function(req,res,next){
  res.render('login');
})

router.post('/login',function(req,res,next){
  // If error, render the loging screen with an error message
  

  var mc = req.app.get('marketcloud');

  return mc.users.authenticate(req.body.email,req.body.password)
  .then(function(response){
    console.log("THEN",response)
    req.session.user = {
      email : response.user.email,
      id : response.user.id,
      token : response.token
    };
    
    res.redirect('/')
  })
  .catch(function(response){
    console.log("CATCH",response)
    res.render('login',{error : 'Invalid credentials'});
  })
})




router.get('/signup',function(req,res,next){
  res.render('signup');
})

router.post('/signup',function(req,res,next){
  // If error, render the loging screen with an error message
  var mc = req.app.get('marketcloud');
  var user = req.body;
  //You can add custom data to user
  return mc.users.create(user)
  .then(function(response){
    console.log(response)
    res.render('login',{message : 'Your account was successfully created.'})
  })
  .catch(function(response){

    res.render('signup',{error : 'An error has occurred'})
  })
})

module.exports = router;
