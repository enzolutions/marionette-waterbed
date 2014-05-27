define(["marionette",
        "../models/ResultModel"], function(Marionette, Result ) {

    var Results = Backbone.Drupal.Collections.NodeView.extend({
      initialize : function(options) {
          this.viewName = 'waterbed';
       },
    });

    return Results;

});
