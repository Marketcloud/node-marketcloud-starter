var express = require('express');
var router = express.Router();
var qs = require('querystring');
var Marketcloud = require('marketcloud-node');








router.get('/profile',function(req,res,next){
	var mc = req.app.get('marketcloud')
	return mc.users.getById(req.session.user.id)
			.then(function(response){
				res.render('user/profile', {user : response.data});
			})
      .catch(function(response){
        console.log("Error",response);
  	     res.render('error', {
		            message: response.message,
		            error: response,
		            title: 'error'
		        });
      })
});

router.get('/addresses',function(req,res,next){
  var mc = req.app.get('marketcloud')
  return mc.addresses.list({user_id:Number(req.session.user.id)})
      .then(function(response){
        res.render('user/addresses', {user : req.session.user, addresses : response.data});
      })
      .catch(function(response){
        console.log("Error",response);
         res.render('error', {
                message: response.message,
                error: response,
                title: 'error'
            });
      })
})

router.get('/orders',function(req,res,next){
  var mc = req.app.get('marketcloud')
  return mc.orders.list({"user.id":Number(req.session.user.id)})
      .then(function(response){
        res.render('user/orders', {user : req.session.user, orders : response.data});
      })
      .catch(function(response){
        console.log("Error",response);
         res.render('error', {
                message: response.message,
                error: response,
                title: 'error'
            });
      })
})



module.exports = router;
