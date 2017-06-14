/***
 * Excerpted from "Rails, Angular, Postgres, and Bootstrap, Second Edition",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/dcbang2 for more book information.
***/
var coreJS = require('core-js');
var zoneJS = require('zone.js');
var ng = {
  core:                   require("@angular/core"),
  common:                 require("@angular/common"),
  compiler:               require("@angular/compiler"),
  forms:                  require("@angular/forms"),
  platformBrowser:        require("@angular/platform-browser"),
  platformBrowserDynamic: require("@angular/platform-browser-dynamic"),
  http:                   require("@angular/http"),
  router:                 require("@angular/router")
};

var CustomerSearchComponent  = require("CustomerSearchComponent");
var CustomerDetailsComponent = require("CustomerDetailsComponent");
var AddressComponent         = require("CustomerDetailsComponent/AddressComponent");
var CreditCardComponent      = require("CustomerDetailsComponent/CreditCardComponent");
var CustomerInfoComponent    = require("CustomerDetailsComponent/CustomerInfoComponent");

// existing AppComponent and router configuration...

var AppComponent = ng.core.Component({
  selector: "shine-customers-app",
  template: "<router-outlet></router-outlet>" 
}).Class({
  constructor: [ 
    function() { 
    }
  ] 
});

var routing = ng.router.RouterModule.forRoot(
  [
    {
      path: "",
      component: CustomerSearchComponent
    },
    {
      path: ":id",
      component: CustomerDetailsComponent
    }
  ]
);

var CustomerSearchAppModule = ng.core.NgModule({

  // rest of code as before...
  
  imports: [ 
    ng.platformBrowser.BrowserModule,
    ng.forms.FormsModule,
    ng.http.HttpModule,
    routing
  ],
  declarations: [ 
    CustomerDetailsComponent,
    CustomerSearchComponent,
    AddressComponent,
    CustomerInfoComponent,
    CreditCardComponent,
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
.Class({
  constructor: function() {}
});

ng.platformBrowserDynamic.
  platformBrowserDynamic().
  bootstrapModule(CustomerSearchAppModule);
