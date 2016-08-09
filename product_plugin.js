var product_plugin = function productManagement(options) {
  var seneca = this;

  console.log(options);

  /**
  * Fetch the list of all the products.
  */
  seneca.add({init: "productManagement"}, function(args,done) {
    console.log('initing the module...');
    done();
  });

  /**
  * Fetch the list of all the products.
  */
  seneca.add({area: "product", action: "fetch"}, function(args,done) {
    var products = seneca.make$("products");
    products.list$({}, done);
  });

  /**
  * Fetch the list of products by category.
  */
  seneca.add({area: "product", action: "fetch", criteria:"byCategory"}, function(args, done) {
    var products = seneca.make$("products");
    console.log('fdsfsd2:' + args.category);
    products.list$({category: 'category', sort$:{price:-1}}, done);
  });

  // /**
  // * Fetch a product by id.
  // */
  // seneca.add({area: "product", action: "fetch", criteria: "byId"},function(args, done) {
  //   var product = seneca.make$("products");
  //   console.log('fdsfsd3:' + args.id);
  //   product.load$(args.id, done);
  // });

  /**
  * Adds a product.
  */
  seneca.add({area: "product", action: "add"}, function(args,done) {
    var products = seneca.make$("products");
    console.log(args);

    products.category = args.category;
    products.name = args.name;
    products.description = args.description;
    products.price = args.price

    products.save$(function(err, product) {
      done(err, products.data$(false));
    });
  });

  /**
  * Removes a product by id.
  */
  seneca.add({area: "product", action: "remove"}, function(args,done) {
    var product = seneca.make$("products");
    console.log(args.id);
    console.warn('warnaewrfewrewrewrewer');
    product.remove$(args.id, function(err) {
      done(err, null);
    });
  });

  /**
  * Edits a product fetching it by id first.
  */
  seneca.add({area: "product", action: "edit"}, function(args,done) {
    seneca.act({area: "product", action: "fetch", criteria:
    "byId", id: args.id}, function(err, result) {
      result.data$(
      {
        name: args.name,
        category: args.category,
        description: args.description,
        price: args.price
      });
      result.save$(function(err, product){
        done(err, product.data$(false));
      }); 
    });
  }); 

  // return 'pluginName';
}

module.exports = product_plugin;