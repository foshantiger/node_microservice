var seneca = require("seneca")()
         .use("email")
         .use("sms");
   
seneca.listen({port: 4001, host: "192.168.1.167"});