define(["marionette"], function (Marionette) {
  var Router = Marionette.AppRouter.extend({
    appRoutes: {
      "": "results",
      "property/:pid/:date": "property"
    },
  });

  return Router;
});
