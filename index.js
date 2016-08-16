var seneca = require('seneca')().use('seneca-entity');

seneca.use('product_plugin', {foo:'bar'});
seneca.use('mongo-store', {
 name: 'jusha',
 host: '119.29.19.250',
 port: '27017',
 username: 'jusha',
 password: 'jusha..'
});

seneca.ready(function(err){
  seneca.act('role:web',{use:{
    prefix: '/products',
    pin: {area:'product',action:'*'},
    map:{
      fetch: {GET:true},
      add: {POST:true,},
      edit: {GET:false, PUT:true},
      delete: {GET: false, DELETE: true}
    }
  }});

  var express = require('express');
  var app = express();
  app.use(require('body-parser').json());
  // This is how you integrate Seneca with Express
  app.use( seneca.export('web') );
  app.listen(3000);
  console.log('Server listen on port 3000...');
});
