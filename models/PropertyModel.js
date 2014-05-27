define(["marionette",
        "../models/ResultModel"], function(Marionette, Result ) {

    var Property = Backbone.Drupal.Models.Node.extend({
      initialize : function(options) {
        // Setting the Id Attribute for Drupal model
        this.attributes.nid = options.property_id;
        this.noSaveAttributes = ['property_id'];

        // Extended Backbone.Drupal.Models.Node to my own service for Drupal Nodes.
        // This Rest service return absolute URL for field pictures
        this.urlSource = "node_waterbed";
       },
    });

    return Property;

});
