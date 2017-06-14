/***
 * Excerpted from "Rails, Angular, Postgres, and Bootstrap, Second Edition",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/dcbang2 for more book information.
***/
var ng = {
  core:   require("@angular/core")
};

var AddressComponent = ng.core.Component({
  selector: "shine-address",
  template: require("./AddressComponent.html")
}).Class({
  constructor: [
    function() {
    }
  ]
});

module.exports = AddressComponent;
