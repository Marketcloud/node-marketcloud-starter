![Marketcloud](http://www.marketcloud.it/img/logo/new_with_text.png)
# NodeJS + Marketcloud eCommerce starter
NodeJS starter eCommerce project with ExpressJS and Marketcloud



[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/Marketcloud/node-marketcloud-starter)

## Demo
http://marketcloud-demo.herokuapp.com
## Features
* Built on NodeJS and ExpressJS, plus the Marketcloud node client
* Takes advantage of EJS templates
* Boostrap3 based frontend plus some JQuery
* Easily replace the small JQuery code with your favorite Javascript framework like React/Angular/Angular2

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
