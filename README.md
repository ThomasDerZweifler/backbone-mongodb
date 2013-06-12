# backbone-mongodb

Backbone-mongodb extension provides MongoDB compatible models that support MongoDB Extended JSON format.

MongoDB import and export utilities and MongoDB REST Interfaces uses MongoDB Extended JSON for the documents. An ID in MongoDB Extended JSON is presented as following.

```
{
  "$oid": "<id>"
}
```

# Usage

Mix to Backbne.Model.

```
_.extend(Backbone.Model.prototype, Backbone.MongoModel.mixin);
```

Extend to your own model.

```
var Book = Backbone.MongoModel.extend({
  urlRoot: 'http://example.com/books'
});
```


If you want to work with [Mongolab.com], use following snippet.

```
var appConfig = {
  baseURL: 'https://api.mongolab.com/api/1/databases/my-db/collections/',
  addURL: '?apiKey=yGG1E3zxT16PjkFRaOeGaA89loJ1Agpl'
}

var Book = Backbone.MongoModel.extend({
  url: function() {
    if (_.isUndefined(this.attributes.id)) {
      return appConfig.baseURL + 'books' + appConfig.addURL;
    }
    else {
      return appConfig.baseURL + 'books/' + encodeURIComponent(this.attributes.id) + appConfig.addURL;
    }
  },
});


var PostList = Backbone.Collection.extend({
  model: Post,
  url: function() {
    return appConfig.baseURL + 'books' + appConfig.addURL;
  }
});
```

# Examples

*  [SocialMobileApplication](http://dealancer.github.io/sma) - is an example application created to demonstrate Backbone.js and jQueryMobile capabilities, it communicates with [MongoLab](http://mongolab.com/), the RESTful MongoDB service. You can download client application from [github project page](http://github.com/dealancer/sma).
