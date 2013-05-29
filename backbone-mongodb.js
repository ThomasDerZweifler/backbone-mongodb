// backbone-mongodb 0.1.0
//
// (c) 2013 Vadim Mirgorod
// Licensed under the MIT license.

(function(Backbone) {

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

  Backbone.MongoModel = _.extend(Backbone.Model, mixin);
  Backbone.MongoModel.mixin = mixin;
}).call(this, Backbone);
