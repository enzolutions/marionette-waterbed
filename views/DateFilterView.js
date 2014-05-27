define(["marionette",
        "text!../templates/datefilter.tpl"], function(Marionette, datefilterTpl ) {
    var DateFilterView = Marionette.ItemView.extend({
      template: _.template(datefilterTpl),
    });

    return DateFilterView;

});
