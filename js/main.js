require.config({
  baseUrl: 'vendor',
  paths : {
    underscore : 'underscore',
    backbone : 'backbone',
    backbone_drupal: 'backbone.drupal',
    backbone_drupal_services: 'backbone.drupal.services',
    jquery : 'jquery',
    text: 'text',
    async : 'async',
    marionette : 'backbone.marionette',
    wreqr : 'backbone.wreqr',
    eventbinder : 'backbone.eventbinder',
    babysitter : 'backbone.babysitter',
    jqrangeslider: 'jQRangeSlider-min',
    jquery_mousewheel: 'jquery.mousewheel.min',
    jquery_ui: 'jquery-ui.min',
    jquery_ui_map : 'jquery.ui.map.full.min',
    underscore_string: 'underscore.string.min',
    jquery_storage: 'jquery.storage',
    date: 'date',
    bjqs: 'bjqs-1.3.min'
  },
  shim : {
    jquery : {
      exports : 'jQuery'
    },
    underscore : {
      exports : '_'
    },
    underscore_string: {
      deps: ['underscore'],
    },
    jquery_ui_map: {
      deps: ['jquery'],
    },
    bjqs: {
      deps: ['jquery'],
    },
    jquery_ui: {
      deps: ['jquery']
    },
    jquery_mousewheel: {
      deps: ['jquery', 'jquery_ui']
    },
    jqrangeslider: {
      deps: ['jquery','jquery_mousewheel']
    },
    backbone : {
      deps : ['jquery', 'underscore'],
      exports : 'Backbone'
    },
    jquery_storage: {
      deps: ['jquery'],
    },
    backbone_drupal: {
      deps: ['backbone']
    },
    backbone_drupal_services: {
      deps: ['backbone_drupal']
    },
    wreqr: {
      deps : ['backbone'],
      exports: 'Backbone.Wreqr'
    },
    eventbinder : {
      deps : ['backbone']
    },
    babysitter : {
      deps: ['backbone']
    },
    marionette : {
      deps: ['wreqr', 'eventbinder', 'babysitter', 'date', 'underscore_string',
             'backbone_drupal_services', 'jquery_ui_map', 'bjqs','jquery_storage'],
      exports : 'Marionette'
    }
  }
});

// Loading dependences and module to execute Marionette App
require( ["marionette",
          "../modules/RouterModule",
          "../modules/ControllerModule",
          "../views/HeaderView",
          "../views/FooterView",
          "../views/AccessDeniedView",
          "jqrangeslider",
          "async!http://maps.google.com/maps/api/js?sensor=false"],
    function (Marionette, RouterModule, ControllerModule, HeaderView, FooterView, AccessDeniedView) {

    // set up the app instance
    var MyApp = new Marionette.Application();

    // Define regions
    MyApp.addRegions({
      headerRegion: "#header-region",
      searchRegion: "#search-region",
      resultsRegion: "#results-region",
      propertyRegion: "#property-region",
      footerRegion: '#footer-region'
    });

    // Creating a generic ItemView for Header
    headerView = new HeaderView();

    // Add Header View to region to be render
    MyApp.headerRegion.show(headerView);

    // Creating a generic ItemView for Footer
    footerView = new FooterView();

    // Add Header View to region to be render
    MyApp.footerRegion.show(footerView);

    // Setup Drupal API Information
    Backbone.Drupal.restEndpoint = {
      root: 'http://waterbed-backend.com/api',
      dataType: '.json'
    };


    // Define auth object, set crossDomain if is necessary
    var Auth = new Backbone.Drupal.Auth({crossDomain: true});

    // Star authentication process, if credentials are valida the token will be
    // use in further conection
    var auth_status = Auth.login('admin', 'admin');


    if(auth_status) {

      // Initialize the app controller
      // Pass reference to Main Region to Controller
      var controller = new ControllerModule({
        searchRegion: MyApp.searchRegion,
        resultsRegion: MyApp.resultsRegion,
        propertyRegion: MyApp.propertyRegion,
        vent: MyApp.vent
      });

      // initialize the router
      MyApp.router = new RouterModule({
        controller : controller
      });

      // Initialize the app router if neccessary
      MyApp.addInitializer(function(options) {});

      MyApp.on("initialize:after", function(){

        // Postpone jQuery Date Range filter initialize after region is render
        MyApp.searchRegion.on("show", function(view) {

          //Enable Date Range Picker
          jQuery( "#checkin" ).datepicker({
              dateFormat: 'yy-m-d',
              changeMonth: true,
              changeYear: true,
              minDate: new Date(),
              onSelect: function( checkin ) {
                // Set min date for checkout
                jQuery( "#checkout" ).datepicker( "option", "minDate", checkin );

                // Complete other values requiered to filter results
                var checkout = jQuery( "#checkout" ).datepicker({ dateFormat: 'yy-m-d' }).val();

                var price_range = jQuery(".price-range-slider").rangeSlider("values");

                // Trigger event to update results only if range date is defined.
                if(checkout !== '') {
                  MyApp.vent.trigger("myapp:filter_results", checkin, checkout, price_range.min, price_range.max);
                }
              }
          });

          jQuery( "#checkout" ).datepicker({
              dateFormat: 'yy-m-d',
              changeMonth: true,
              changeYear: true,
              minDate: new Date(),
              onSelect: function( checkout ) {
                // Set max date for checking
                jQuery( "#checkin" ).datepicker( "option", "maxDate", checkout );

                // Complete other values requiered to filter results
                var checkin = jQuery( "#checkin" ).datepicker({ dateFormat: 'yy-m-d' }).val();

                var price_range = jQuery(".price-range-slider").rangeSlider("values");

                // Trigger event to update results only if range date is defined.
                if(checkin !== '') {
                  MyApp.vent.trigger("myapp:filter_results", checkin, checkout, price_range.min, price_range.max);
                }
              }
          });


          // Enable Price Slider
          jQuery(".price-range-slider").rangeSlider({bounds: {min: 10, max: 120},
                                                     defaultValues:{min: 35, max: 85}
                                                    });

          // Bind Date Range Slide change event to trigger routing filter
          jQuery(".price-range-slider").bind("valuesChanged", function(e, data){

            var checkin = jQuery( "#checkin" ).datepicker({ dateFormat: 'yy-m-d' }).val();

            var checkout = jQuery( "#checkout" ).datepicker({ dateFormat: 'yy-m-d' }).val();

            // Trigger event to update results only if range date is defined.
            if(checkin !== '' && checkout !== '') {
              MyApp.vent.trigger("myapp:filter_results", checkin, checkout, data.values.min, data.values.max);
            }
          });
        });

        // Start Backbone history a necessary step for bookmarkable URL's
        Backbone.history.start();
    });

    MyApp.start({});
  } else {
    // Generating error message
    accessDeniendView = new AccessDeniedView({ message: 'Authentication fail'});

    // Add Header View to region to be render
    MyApp.propertyRegion.show(accessDeniendView);
  }
});
