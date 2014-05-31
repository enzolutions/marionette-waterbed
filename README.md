Marionette Waterbed
=======================

Mini Clone of AirBNB.com using MarionetteJS as Front End and Drupal as Rest Backend.

This implementation use the project <a target="_blank" href="http://enzolutions.com/projects/waterbed_rooms/" taget="_blank" >http://enzolutions.com/projects/waterbed_rooms/</a> as Rest Server.


## Libraries used.

* <a target="_blank" href="http://marionettejs.com">MarionetteJS</a>.
* <a target="_blank" href="http://backbonejs.org">BackboneJS</a>.
* <a target="_blank" href="http://underscorejs.org">UnderscoreJS</a>.
* <a target="_blank" href="https://github.com/enzolutions/backbone.drupal"> Backbone Drupal</a>.
* <a target="_blank" href="http://epeli.github.io/underscore.string/">Underscore.string</a>.
* <a target="_blank" href="http://ghusse.github.io/jQRangeSlider/">jQRangeSlider</a>.
* <a target="_blank" href="http://www.basic-slider.com/">Basic Query Slider</a>.
* <a target="_blank" href="https://github.com/yckart/jquery.storage.js">jquery.storage.js</a>.
* <a target="_blank" href="https://code.google.com/p/jquery-ui-map/">jquery-ui-map</a>.

**DEMO** : <a target="_blank" href="http://enzolutions.com/marionette-waterbed/">http://enzolutions.com/marionette-waterbed/</a>

![Marionette Waterbed](https://raw.githubusercontent.com/enzolutions/marionette-waterbed/master/images/marionettejs-waterbed.jpg "Marionette Waterbed")

## Features

* Enable Filtering by Date Range
* Enable Filtering by Price Range
* Display Results and Position in Google Map
* Option to see details of property.

### Installation

After doownload you must configure what is your Rest Server End Point, this definition must be located in file *js/main.js*. Check the following example

````
// Setup Drupal API Information
Backbone.Drupal.restEndpoint = {
  root: 'http://waterbed-backend.com/api',
  dataType: '.json'
};
````

If you want to use Waterbed outside the domain of your Backend Server, you must enable CORS in your Rest Server and enable Authentication using *Backbone Drupal*. See the following example.

````
// Define auth object, set crossDomain if is necessary
var Auth = new Backbone.Drupal.Auth({crossDomain: true});

// Optional Start authentication process for REST ADD/PUT/DELETE
// If credentials are valid the token will be use in further connection
var auth_status = Auth.login('admin', 'admin');
````
