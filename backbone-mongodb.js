// backbone-mongodb 0.1.0
//
// (c) 2013 Vadim Mirgorod
// Licensed under the MIT license.

(function(Backbone) {

  // Define mixing that we will use in our extension.
  var mixin = function() {
    return {
      // Convert MongoDB Extended JSON into regular one.
      parse: function(resp, options) {
        if (_.isObject(resp._id))  {
          resp.id = resp._id.$oid;
          delete resp._id;
        }
        return resp;
      },

      // Convert regular JSON into MongoDB extended one.
      toJSON: function() {
        var attrs = _.omit(this.attributes, 'id');
        if (!_.isUndefined(this.id))  {
          attrs._id = { $oid: this.id };
        }
        return attrs;
      }
    }
  }

  // Create new MongoModel object.
  Backbone.MongoModel = _.extend(Backbone.Model, mixin);

  // Provide mixin to extend Backbone.Model.
  Backbone.MongoModel.mixin = mixin;

  // Another way to perform mixin.
  //_.extend(Backbone.Model.prototype, mixin);

}).call(this, Backbone);
