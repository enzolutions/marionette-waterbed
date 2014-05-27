define(["marionette",
        "text!../templates/access_denied.tpl"], function(Marionette, access_deniedTpl ) {

    var AccessDeniedView = Marionette.ItemView.extend({
      initialize: function(options){
        // Assign dinamic variable to render in template
        this.message = options.message;
      },
      // Set the template with onBefore to avoid a timing issue with initilize.
      onBeforeRender: function(){
        this.template = _.template(access_deniedTpl, { message: this.message});
      },
    });

    return AccessDeniedView;

});
