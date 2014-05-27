define(["marionette",
        "text!../templates/results.tpl"], function(Marionette, resultsTpl ) {
    var HelloView = Marionette.ItemView.extend({
        template : _.template(resultsTpl)
    });

    return HelloView;

});
