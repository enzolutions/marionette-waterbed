define(["marionette",
        "text!../templates/property.tpl"], function(Marionette, propertyTpl ) {

    var PropertyView = Marionette.ItemView.extend({
      initialize: function(options){
            // Store EventAgreegator
            this.vent = options.vent;
      },
      template : _.template(propertyTpl),
    });

    return PropertyView;

});
