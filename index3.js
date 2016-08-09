var seneca = require("seneca")()
         .use("email")
         .use("sms")
         .use("post");
   
seneca.listen({port: 4000, host: "127.0.0.1"});

var senecaEmail = require("seneca")().client({host: "192.168.1.167", port: 4001});

senecaEmail.act( {channel: 'sms', action: 'send'}, function(err, data) {
    if (err) {
      return console.error(err);
    }
    console.log(data);
  } 
)