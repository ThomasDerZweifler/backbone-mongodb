$(document).ready(function() {

  // Create base model and collection objects.
  var Book = Backbone.MongoModel.extend({
    urlRoot: '/books'
  });

  var Library = Backbone.Collection.extend({
    url: '/books',
    model: Book
  });

  var library;

  var attrs = {
    id: 5,
    title: "The Tempest",
    author: "Bill Shakespeare",
  };

  module('Backbone.Mongodb', _.extend(new Environment, {

    setup: function() {

      // Create new library.
      library = new Library();

      // Set init values.
      library.create(attrs, {wait: false});

      // Provide mockup AJAX responses.
      $.mockjax({
        url: '/books',
        responseTime: 10,
        responseText: [
          {_id: { "$oid": "10" }, one: 1},
          {id: "20", one: 1}
        ]
      });

      $.mockjax({
        url: '/books/10',
        responseTime: 10,
        responseText: {_id: { "$oid": "10" }, one: 1}
      });

      $.mockjax({
        url: '/books/20',
        responseTime: 10,
        responseText: {id: "20", one: 1}
      });
    },

    teardown: function() {

      // Remove all mockup AJAX responses.
      $.mockjaxClear();
    },

  }));

  asyncTest("Read MongoDB Extended JSON", 1, function() {
    library.fetch();

    setTimeout(function() {
      ok(library.get('10'));
      start();
    }, 50);
  });

  asyncTest("Read regular JSON", 1, function() {
    library.fetch();

    setTimeout(function() {
      ok(library.get('20'));
      start();
    }, 50);
  });

  test("Export to MongoDB Extended JSON", 2, function() {
    var book = library.get(5);
    ok(book);

    var json = book.toExtendedJSON();
    equal(json._id.$oid, 5);
  });

  // TODO:
  //   * add idAttribute test
  //   * add save/sync test
  //   * add export to regular JSON test
});
