define(["marionette",
        "../collections/ResultsCollection",
        "../models/PropertyModel",
        "../layouts/SearchLayout",
        "../views/ResultsView",
        "../views/PropertyView",],
        function (Marionette, Results, Property, SearchLayout, ResultsView, PropertyView) {

    var Controller = Marionette.Controller.extend({
        initialize : function(options) {
          // store a regions that will be used to show the stuff rendered by this components
          this.searchRegion = options.searchRegion;
          this.resultsRegion = options.resultsRegion;
          this.propertyRegion = options.propertyRegion;
          this.vent = options.vent;
        },
        /**
         * Initialized on start, without hash
         * @method
         */
         results :  function () {

          // Remove region property if has something
          this.propertyRegion.close();

          // Defined local variable to access in event respose for results
          var resultsRegion = this.resultsRegion;


          // Create Search Layout
          searchLayout = new SearchLayout({});

          // Add Form to render to main region and avoid be replaced
          this.searchRegion.show(searchLayout);

          var results = new Results({});

          var resultsView = new ResultsView({ collection: results });

          // Create a new variable for vent to enable be accessible in trigger response
          var vent = this.vent;

          // Get data and wait clients before render
          results.fetch({
            update: true ,
            success: function (results) {
              // Add View to region to be render
              this.resultsRegion.show(resultsView);

              // Populate the initial map
              jQuery('#map_canvas').gmap().bind('init', function() {
                jQuery.each( results.models, function(i, marker) {

                  // Store Property ID + Date + Price
                  var storage_id = marker.attributes.nid + '-'+  marker.attributes.date;
                  jQuery.localStorage(storage_id, marker.attributes.rooms_availability_index_price);

                  jQuery('#map_canvas').gmap('addMarker', {
                    'position': new google.maps.LatLng(marker.attributes.latitude, marker.attributes.longitude),
                    'bounds': true
                  }).click(function() {

                    // Open Info Window in select marker
                    jQuery('#map_canvas').gmap('openInfoWindow', { 'content': marker.attributes.legend }, this);

                    // Remove previous selected and set new selection
                    jQuery('#results .item').removeClass('selected');
                    jQuery('#results .property-' + marker.attributes.nid).addClass('selected');
                  });
                });
              });


            }.bind(this)
          });

          // Handle filter results by date ofr price.
          this.vent.on("myapp:filter_results", function(checkin, checkout, min_price, max_price){
            var filters = '';

            if(checkin != 'undefined' && checkout != 'undefined') {
              if(_.string.isBlank(filters)) {
                filters = '?';
              }
              filters = filters + 'availabilty[min]=' + checkin + '&availabilty[max]=' + checkout;
            }

            if(min_price != 'undefined' && max_price != 'undefined') {
              if(_.string.isBlank(filters)) {
                filters = '?';
              }
              else {
                filters = filters + '&';
              }

              filters = filters + 'price[min]=' + Math.round(min_price)  + '&price[max]=' + Math.round(max_price);
            }

            // Re - render the view based in filters and reuse collection already declared
            if(!_.string.isBlank(filters)) {
              results.setFilters(filters);
            }

            // Get data and wait clients before render
            results.fetch({
              update: true ,
              success: function (results) {
                // Add View to region to be render
                resultsRegion.show(resultsView);

                // Clean markers
                jQuery('#map_canvas').gmap('destroy');

                jQuery.each( results.models, function(i, marker) {
                // Add new markers
                  jQuery('#map_canvas').gmap('addMarker', {
                      'position': new google.maps.LatLng(marker.attributes.latitude, marker.attributes.longitude),
                      'bounds': true
                    }).click(function() {

                      // Open Info Window in select marker
                      jQuery('#map_canvas').gmap('openInfoWindow', { 'content': marker.attributes.legend }, this);

                      // Remove previous selected and set new selection
                      jQuery('#results .item').removeClass('selected');
                      jQuery('#results .property-' + marker.attributes.nid).addClass('selected');
                    });
                  });

              }.bind(this)
            });


          });
        },
        property: function (property_id, date) {

          var property = new Property({ property_id: property_id});

          // Create Property Layout
          propertyView = new PropertyView({ model: property});

          property.fetch({
            update: true ,
              success: function (property) {
                // Remove Search and Results region views.
                this.resultsRegion.close();
                this.searchRegion.close();

                var price = jQuery.localStorage(property_id +'-' + date);

                // Get values from localStora and modify the model
                propertyView.model.attributes.date = date;
                propertyView.model.attributes.price = price;

                this.propertyRegion.show(propertyView);

                // Set Basic Jquery Slider
                jQuery('#property-details #banner-fade').bjqs({
                  height      : 320,
                  width       : 620,
                  responsive  : true
                });

              }.bind(this)
          });
        },
    });

    return Controller;
});
