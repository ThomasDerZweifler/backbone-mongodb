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

  module('Backbone.Mongodb', _.extend(new Environment, {

    setup : function() {

      // Create new library
      library = new Library();

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

      // Clear all mockup AJAX responses.
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

});
