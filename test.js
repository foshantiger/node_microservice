var stringUtils = require('./stringUtils');
console.log(stringUtils().stringToOrdinal("aabb"));

var seneca = require( 'seneca' )();
seneca.add({role: 'math', cmd: 'sum'}, function (msg, respond) {
    var sum = msg.left + msg.right;
    respond(null, {answer: sum})
  }
)

seneca.add({role: 'math', cmd: 'sum', integer: true}, function (msg, respond) {
    this.act({role: 'math', cmd: 'sum', left: Math.floor(msg.left),
      right: Math.floor(msg.right)},respond);
});

seneca.add({role: 'math', cmd: 'product'}, function (msg, respond) {
    var product = msg.left * msg.right;
    respond(null, { answer: product } )
  }
)

seneca.act({role: 'math', cmd: 'sum', left: 1.5, right: 2.5}, function(err, data) {
    if (err) {
      return console.error(err);
    }
    console.log(data);
  }
)

seneca.act({role: 'math', cmd: 'sum', left: 1.5, right: 2.5, integer: true}, function(err, data) {
    if (err) {
      return console.error(err);
    }
    console.log(data);
  }
)

// seneca.act({role: 'math', cmd: 'product', left: 3, right: 4}, console.log);

seneca.add({cmd: 'wordcount'}, function(msg, respond) {
    var length = msg.phrase.split(' ').length;
    respond(null, {words: length});
});

seneca.add({cmd: 'wordcount', skipShort: true}, function(msg,respond) {
  var words = msg.phrase.split(' ');
  var validWords = 0;
  for (var i = 0; i < words.length; i++){
    if (words[i].length > 3) {
      validWords++;
    } 
  }
  respond(null, {words: validWords});
});

seneca.act({cmd: 'wordcount', phrase: 'Hello world this is Seneca'}, function(err, response) {
    console.log(response);
});

seneca.act({cmd: 'wordcount', skipShort: true, phrase: 'Hello world this is Seneca'}, function(err, response) {
  console.log(response);
});