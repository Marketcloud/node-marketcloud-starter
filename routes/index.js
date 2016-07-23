var express = require('express');
var router = express.Router();

var Marketcloud = require('marketcloud-node');



/* GET home page. */

router.get('/', function(req, res) {

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


router.get('/item/:product_id',function(req,res){
	var mc = req.app.get('marketcloud')
	mc.products.getById(req.params.product_id)
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


router.get('/checkout',function(req,res){
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
  
  mc.shippings.list({value : total_value})
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

router.get('/cart',function(req,res){
	var mc = req.app.get('marketcloud')
	res.render('cart')
})


router.get('/search',function(req,res){

	var mc = req.app.get('marketcloud')
	Marketcloud.Promise.all([
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
module.exports = router;
