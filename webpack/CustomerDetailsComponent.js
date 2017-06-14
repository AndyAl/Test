/***
 * Excerpted from "Rails, Angular, Postgres, and Bootstrap, Second Edition",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/dcbang2 for more book information.
***/
var ng = {
  core:   require("@angular/core"),
  http:   require("@angular/http"),
  router: require("@angular/router")
};

var CustomerDetailsComponent = ng.core.Component({
  selector: "shine-customer-details",
  template: require("./CustomerDetailsComponent.html")
}).Class({
  constructor: [
    ng.router.ActivatedRoute,
    ng.http.Http,
    function(activatedRoute,http) {
      this.activatedRoute = activatedRoute;
      this.http = http;
      this.customer = null;
    }
  ],
  ngOnInit: function() {
    var self = this;
    var observableFailed = function(response) {
      window.alert(response);
    }

    // more to come...

    var customerGetSuccess = function(response) {
      self.customer = response.json().customer;
    }
    var routeSuccess = function(params) {
      self.http.get(
        "/customers/" + params['id'] + ".json"
      ).subscribe(
        customerGetSuccess,
        observableFailed
      );
    }

    self.activatedRoute.params.subscribe(routeSuccess,observableFailed);
  }
});

module.exports = CustomerDetailsComponent;
