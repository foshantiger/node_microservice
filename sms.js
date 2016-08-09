module.exports = function (options) {
  /**
  * Sends an sms.
  */
  this.add({channel: 'sms', action: 'send'}, function(msg,respond) {
    // Code to send an sms.
    respond(null, {msg:'sms sended!'});
  });

  /**
  * Gets a list of pending emails.
  */
  this.add({channel: 'sms', action: 'pending'}, function(msg,respond) {
     // Code to read pending sms.
     respond(null, {data:'sms list'});
  });
}