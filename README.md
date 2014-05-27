Marionette Timeline
=======================

Implementation of a Timeline enabled to end user change the Date Range of Timeline to get differnt results via Ajax.

This example use the project <a target="_blank" href="http://enzolutions.com/projects/silex_rss_importer_image" taget="_blank" >enzolutions.com</a> as Rest Server.

The data develired by Rest Server is list of Time Magazine Close Up images imported from <a href="_blank" href="http://lightbox.time.com/category/closeup/feed/">http://lightbox.time.com/category/closeup/feed/</a> you can check the data at <a target_"_blank" href="http://silex.7sabores.com/timeline/index.php/rest/covers">http://silex.7sabores.com/timeline/index.php/rest/covers</a>.

Inside you can find how bind jQuery events with BackboneJS Routes.

Libraries used.

* <a target="_blank" href="http://marionettejs.com">MarionetteJS</a>
* <a target="_blank" href="http://backbonejs.org">BackboneJS</a>
* <a target="_blank" href="">jQRangeSlider</a>
* <a target="_blank" href="http://adomas.org/javascript-mouse-wheel/">javascript-mouse-wheel</a>


**DEMO** : <a target="_blank" href="http://enzolutions.com/marionette-timeline/">http://enzolutions.com/marionette-timeline/</a>

![Marionnete Timeline](https://raw.githubusercontent.com/enzolutions/marionette-timeline/master/images/marionettejs_date_range_filter.png "Marionnete Timeline")

### Usage

You just need to play with Date Range select to get less or more results as you can see in the picture above.

#### Installing Rest Server

You must follow the instructions to install Rest Server <a target="_blank" href="http://enzolutions.com/projects/silex_rss_importer_image" taget="_blank" >enzolutions.com</a> or you can implement your own Server to delivery diferent data.


#### Configuring Collections

Is required edit ResultCollection to set the proper URL for Rest Server as you can see in the following example.

````
define(["marionette",
        "../models/ResultModel"], function(Marionette, Result ) {

    var Results = Backbone.Collection.extend({
       model: Result,
       initialize : function(options) {
          this.min = options.min;
          this.max = options.max;
       },
       url: function() {
         return 'http://silex.7sabores.com/timeline/index.php/rest/covers' + this.min + '/' + this.max;
       },
    });

    return Results;

});

````
