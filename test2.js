var seneca = require('seneca')()


seneca.add({role:'api',cmd:'zig'},function(args,done){
  console.log(args);
  done(null,{bar:args.zoo+'g'})
})

seneca.add('role:api,cmd:bar',function(args,done){
  done(null,{bar:args.zoo+'b'})
})

seneca.add('role:api,cmd:qaz',function(args,done){
  done(null,{qaz:args.zoo+'z'})
})


seneca.act('role:web',{use:{

  // define some routes that start with /my-api
  prefix: '/my-api',

  // use action patterns where role has the value 'api' and cmd has some defined value
  pin: {role:'api',cmd:'*'},

  // for each value of cmd, match some HTTP method, and use the
  // query parameters as values for the action
  map:{
    zig: true,                // GET is the default
    bar: {GET:true},          // explicitly accepting GETs
    qaz: {GET:true,POST:true} // accepting both GETs and POSTs
  }
}})

var express = require('express')
var app = express()

// This is how you integrate Seneca with Express
app.use( seneca.export('web') )

app.listen(3000)