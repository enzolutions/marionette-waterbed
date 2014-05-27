define(["marionette",
        "text!../templates/search.tpl"], function(Marionette, searchTpl ) {

    var searchLayout = Backbone.Marionette.Layout.extend({
      initialize: function(options){
            // Store EventAgreegator
            this.vent = options.vent;
      },
      events: {
        "change #end_date": "dateSelected",
      },
      template : _.template(searchTpl),
      regions: {
        tasks: "#map-region"
      },
      dateSelected : function (e) {
        e.preventDefault();
        var client = this.$el.find('select').val();
        // Trigger event to update project
        this.vent.trigger("myapp:projects", client);
        this.vent.trigger("myapp:tasks", 0);

      },
    });

    return searchLayout;

});
