/***
 * Excerpted from "Rails, Angular, Postgres, and Bootstrap, Second Edition",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/dcbang2 for more book information.
***/
var ng = {
  core: require("@angular/core"),
  http: require("@angular/http"),
  router: require("@angular/router")
};
var CustomerSearchComponent = ng.core.Component({

  selector: "shine-customer-search",
  template: require("./template.html")
}).Class({
  constructor: [
    ng.http.Http,
    ng.router.Router,
    function(http,router) {
      this.customers = null;
      this.http      = http;
      this.router    = router;
      this.keywords  = "";
    }
  ],
  viewDetails: function(customer) {
    this.router.navigate(["/",customer.id]);
  },
  search: function($event) {
    var self = this;
    self.keywords = $event;
    if (self.keywords.length < 3) {
      return;
    }
    var x = self.http.get(
      "/customers.json?keywords=" + self.keywords
    );
    x.subscribe(
      function(response) {
        self.customers = response.json().customers;
      },
      function(response) {
        window.alert(response);
      }
    );
  },
});

module.exports = CustomerSearchComponent;
