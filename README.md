![Marketcloud](http://www.marketcloud.it/img/logo/new_with_text.png)
# NodeJS + Marketcloud eCommerce starter
NodeJS starter eCommerce project with ExpressJS and Marketcloud



[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/Marketcloud/node-marketcloud-starter)

*Please note that after using the deploy to heroku button, if you run the heroku git:clone from the Heroku CLI you will get an empty repository. Read more [here](https://github.com/cobyism/ghost-on-heroku/issues/67)*.

*To avoid this,clone this project to your development machine, then add Heroku as Git remote. You will be able to commit your changes to the GitHub repository and Heroku's continuous deployment will update your app automatically. [You can follow these steps](#deploying-to-heroku)* 


## Demo
http://marketcloud-demo.herokuapp.com

## Table of contents
1. [Features](#features)
2. [Requirements](#requirements)
3. [Installation](#installation)
4. [Checkout configuration](#checkout-configuration)
5. [Deploy to Herou](#deploying-to-heroku)

## Features
* Built on NodeJS and ExpressJS, plus the Marketcloud node client
* Takes advantage of EJS templates
* Boostrap3 based frontend plus some JQuery
* Easily replace the small JQuery code with your favorite Javascript framework like React/Angular/Angular2
* Built in Braintree payments (Credit card + Paypal) form




## Requirements
You will need nodejs, npm and bower

## Installation

Clone the respository to your local machine
```
cd to/the/directory/
npm install && bower install
```
Every Marketcloud application has a pair of public and secret key that are used to make requests. To find your application's keys, go at https://www.marketcloud.it/applications click on the arrow at the right corner of your application's box and then click on _properties_ . Here you can see your app's keys.

The app.js script look for these keys in your environment, so you have to set the variables in your system:
```
export MARKETCLOUD_PUBLIC_KEY="your-public-key";
export MARKETCLOUD_SECRET_KEY="your-secret-key";
```

Now you can run the app with
```
npm start
```
## Checkout configuration
This app uses Braintree to handle payments, in order to accept payments using this app, remember to setup the Braintree integration in your Marketcloud Dashboard.
More information here [Braintree integration for Marketcloud](https://www.marketcloud.it/documentation/guides/braintree)

You can also use custom payment methods of course. Ask us!


## Deploying to Heroku

If you used the "deploy to heroku" button, and you run the command `heroku git:clone appname` from the Heroku CLI you will get an empty repository. Read more [here](https://github.com/cobyism/ghost-on-heroku/issues/67).

To use this starter project with Heroku, follow these steps:

1. After you clicked the deploy to heroku button and you have your new app on heroku, clone this repository on your local machine. To do so, open a terminal and run `git clone https://github.com/Marketcloud/node-marketcloud-starter`
2. CD into the directory `cd node-marketcloud-starter`
3. Add your Heroku app remote to the local repository by running your terminal `git remote add heroku https://git.heroku.com/your-app-name.git` . Remember to replace your-app-name with your Heroku app name.
4. Add your modifications, git add  and commit your changes
5. git push *heroku* master
```
git clone https://github.com/Marketcloud/node-marketcloud-starter
cd node-marketcloud-starter
git remote add heroku https://git.heroku.com/your-app-name.git
# Now you can edit the project as you want
git add myfile.js
git commit -m 'Added my modifications to Marketcloud starter project'
git push heroku master
```
