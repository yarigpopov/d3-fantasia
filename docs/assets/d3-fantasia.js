'use strict';



;define("d3-fantasia/app", ["exports", "d3-fantasia/resolver", "ember-load-initializers", "d3-fantasia/config/environment"], function (_exports, _resolver, _emberLoadInitializers, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });
  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);
  var _default = App;
  _exports.default = _default;
});
;define("d3-fantasia/components/stack-chart", ["exports", "d3-scale", "d3-array", "d3-shape", "d3-selection", "d3-transition", "d3-axis"], function (_exports, _d3Scale, _d3Array, _d3Shape, _d3Selection, _d3Transition, _d3Axis) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    t: Ember.computed(function () {
      return (0, _d3Transition.transition)().duration(200);
    }),
    sortedData: Ember.computed('data', function () {
      let data = this.get('data');
      data.sort(function (a, b) {
        return b.total - a.total;
      });
      return data;
    }),

    didUpdate() {
      this._super(...arguments);

      const svg = (0, _d3Selection.select)("svg");
      const margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
      };
      const width = +svg.attr("width") - margin.left - margin.right;
      const height = +svg.attr("height") - margin.top - margin.bottom;
      const data = this.get('sortedData');
      let keys = data.columns.slice(1);
      let x = (0, _d3Scale.scaleBand)().rangeRound([0, width]).paddingInner(0.05).align(0.1);
      let y = (0, _d3Scale.scaleLinear)().rangeRound([height, 0]);
      let z = (0, _d3Scale.scaleOrdinal)().range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
      x.domain(data.map(function (d) {
        return d.State;
      }));
      y.domain([0, (0, _d3Array.max)(data, function (d) {
        return d.total;
      })]).nice();
      z.domain(keys);
      svg.selectAll(".stack").data((0, _d3Shape.stack)().keys(keys)(data)).attr("fill", function (d) {
        return z(d.key);
      }).selectAll("rect").data(function (d) {
        return d;
      }).transition(this.t).attr("x", function (d) {
        return x(d.data.State);
      }).attr("y", function (d) {
        return y(d[1]);
      }).attr("height", function (d) {
        return y(d[0]) - y(d[1]);
      }).attr("width", x.bandwidth());
      svg.select(".axis--x").call((0, _d3Axis.axisBottom)(x));
      var legend = svg.select('#legend').attr("id", "legend").attr("font-family", "sans-serif").attr("font-size", 10).attr("text-anchor", "end").selectAll("g").data(keys.slice().reverse()).enter().append("g").attr("transform", function (d, i) {
        return "translate(0," + i * 20 + ")";
      });
      legend.selectAll("rect").data(keys.slice().reverse()).attr("x", width - 19).attr("width", 19).attr("height", 19).attr("fill", z);
      legend.selectAll("text").data(keys.slice().reverse()).attr("x", width - 24).attr("y", 9.5).attr("dy", "0.32em").text(function (d) {
        return d;
      });
    },

    didInsertElement() {
      this._super(...arguments);

      let data = this.get('sortedData');
      let keys = data.columns.slice(1);
      let svg = (0, _d3Selection.select)("svg"),
          margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
      },
          width = +svg.attr("width") - margin.left - margin.right,
          height = +svg.attr("height") - margin.top - margin.bottom,
          g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      let x = (0, _d3Scale.scaleBand)().rangeRound([0, width]).paddingInner(0.05).align(0.1);
      let y = (0, _d3Scale.scaleLinear)().rangeRound([height, 0]);
      let z = (0, _d3Scale.scaleOrdinal)().range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
      x.domain(data.map(function (d) {
        return d.State;
      }));
      y.domain([0, (0, _d3Array.max)(data, function (d) {
        return d.total;
      })]).nice();
      z.domain(keys);
      g.append("g").selectAll("g").data((0, _d3Shape.stack)().keys(keys)(data)).enter().append("g").attr('class', 'stack').attr("fill", function (d) {
        return z(d.key);
      }).selectAll("rect").data(function (d) {
        return d;
      }).enter().append("rect").attr("x", function (d) {
        return x(d.data.State);
      }).attr("y", function (d) {
        return y(d[1]);
      }).attr("height", function (d) {
        return y(d[0]) - y(d[1]);
      }).attr("width", x.bandwidth());
      g.append("g").attr("class", "axis--x").attr("transform", "translate(0," + height + ")").call((0, _d3Axis.axisBottom)(x));
      g.append("g").attr("class", "axis--y").call((0, _d3Axis.axisLeft)(y).ticks(null, "s")).append("text").attr("x", 2).attr("y", y(y.ticks().pop()) + 0.5).attr("dy", "0.32em").attr("fill", "#000").attr("font-weight", "bold").attr("text-anchor", "start").text("Population");
      var legend = g.append("g").attr("id", "legend").attr("font-family", "sans-serif").attr("font-size", 10).attr("text-anchor", "end").selectAll("g").data(keys.slice().reverse()).enter().append("g").attr("transform", function (d, i) {
        return "translate(0," + i * 20 + ")";
      });
      legend.append("rect").attr("x", width - 19).attr("width", 19).attr("height", 19).attr("fill", z);
      legend.append("text").attr("x", width - 24).attr("y", 9.5).attr("dy", "0.32em").text(function (d) {
        return d;
      });
    }

  });

  _exports.default = _default;
});
;define("d3-fantasia/components/welcome-page", ["exports", "ember-welcome-page/components/welcome-page"], function (_exports, _welcomePage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
;define("d3-fantasia/helpers/app-version", ["exports", "d3-fantasia/config/environment", "ember-cli-app-version/utils/regexp"], function (_exports, _environment, _regexp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.appVersion = appVersion;
  _exports.default = void 0;

  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version; // e.g. 1.0.0-alpha.1+4jds75hf
    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility

    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;
    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      } // Fallback to just version


      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  var _default = Ember.Helper.helper(appVersion);

  _exports.default = _default;
});
;define("d3-fantasia/helpers/pluralize", ["exports", "ember-inflector/lib/helpers/pluralize"], function (_exports, _pluralize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _pluralize.default;
  _exports.default = _default;
});
;define("d3-fantasia/helpers/singularize", ["exports", "ember-inflector/lib/helpers/singularize"], function (_exports, _singularize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _singularize.default;
  _exports.default = _default;
});
;define("d3-fantasia/initializers/app-version", ["exports", "ember-cli-app-version/initializer-factory", "d3-fantasia/config/environment"], function (_exports, _initializerFactory, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  let name, version;

  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  var _default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
  _exports.default = _default;
});
;define("d3-fantasia/initializers/container-debug-adapter", ["exports", "ember-resolver/resolvers/classic/container-debug-adapter"], function (_exports, _containerDebugAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];
      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }

  };
  _exports.default = _default;
});
;define("d3-fantasia/initializers/ember-data", ["exports", "ember-data/setup-container", "ember-data"], function (_exports, _setupContainer, _emberData) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    ```app/services/store.js
    import DS from 'ember-data';
  
    export default DS.Store.extend({
      adapter: 'custom'
    });
    ```
  
    ```app/controllers/posts.js
    import { Controller } from '@ember/controller';
  
    export default Controller.extend({
      // ...
    });
  
    When the application is initialized, `ApplicationStore` will automatically be
    instantiated, and the instance of `PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */
  var _default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
  _exports.default = _default;
});
;define("d3-fantasia/initializers/export-application-global", ["exports", "d3-fantasia/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.initialize = initialize;
  _exports.default = void 0;

  function initialize() {
    var application = arguments[1] || arguments[0];

    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;

      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;
        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);

            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  var _default = {
    name: 'export-application-global',
    initialize: initialize
  };
  _exports.default = _default;
});
;define("d3-fantasia/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (_exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'ember-data',
    initialize: _initializeStoreService.default
  };
  _exports.default = _default;
});
;define("d3-fantasia/resolver", ["exports", "ember-resolver"], function (_exports, _emberResolver) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _emberResolver.default;
  _exports.default = _default;
});
;define("d3-fantasia/router", ["exports", "d3-fantasia/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });
  Router.map(function () {});
  var _default = Router;
  _exports.default = _default;
});
;define("d3-fantasia/routes/index", ["exports", "d3-request"], function (_exports, _d3Request) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Route.extend({
    model() {
      return new Promise(function (resolve, reject) {
        (0, _d3Request.csv)('data.csv', (d, i, columns) => {
          let t = 0;

          for (i = 1, t = 0; i < columns.length; ++i) d[columns[i]] = Math.round((Math.random() * 0.2 + 0.9) * d[columns[i]]);

          for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];

          d.total = t;
          return d;
        }, (error, data) => {
          if (error) reject(error);
          console.log(data);
          resolve(data);
        });
      });
    },

    scheduleRefresh() {
      this.refresh();
      Ember.run.later(this, function () {
        this.scheduleRefresh();
      }, 2000);
    },

    activate() {
      this._super(arguments);

      Ember.run.later(this, function () {
        this.scheduleRefresh();
      }, 2000);
    }

  });

  _exports.default = _default;
});
;define("d3-fantasia/services/ajax", ["exports", "ember-ajax/services/ajax"], function (_exports, _ajax) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
;define("d3-fantasia/templates/application", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "yRzsqv2F",
    "block": "{\"symbols\":[],\"statements\":[[1,[21,\"outlet\"],false]],\"hasEval\":false}",
    "meta": {
      "moduleName": "d3-fantasia/templates/application.hbs"
    }
  });

  _exports.default = _default;
});
;define("d3-fantasia/templates/components/stack-chart", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "YJC76vWS",
    "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[7,\"svg\"],[11,\"width\",\"960\"],[11,\"height\",\"500\"],[9],[0,\"\\n\\n\"],[10]],\"hasEval\":false}",
    "meta": {
      "moduleName": "d3-fantasia/templates/components/stack-chart.hbs"
    }
  });

  _exports.default = _default;
});
;define("d3-fantasia/templates/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "OJYV5wpM",
    "block": "{\"symbols\":[\"data\"],\"statements\":[[1,[27,\"stack-chart\",null,[[\"data\"],[[23,[\"model\"]]]]],false],[0,\"\\n\"],[7,\"h3\"],[9],[0,\"Data\"],[10],[0,\"\\n\"],[4,\"each\",[[23,[\"model\"]]],null,{\"statements\":[[0,\"    \"],[1,[27,\"get\",[[22,1,[]],\"Under 5 Years\"],null],false],[0,\"\\n\"]],\"parameters\":[1]},null]],\"hasEval\":false}",
    "meta": {
      "moduleName": "d3-fantasia/templates/index.hbs"
    }
  });

  _exports.default = _default;
});
;

;define('d3-fantasia/config/environment', [], function() {
  var prefix = 'd3-fantasia';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

;
          if (!runningTests) {
            require("d3-fantasia/app")["default"].create({"name":"d3-fantasia","version":"0.0.0+552c3460"});
          }
        
//# sourceMappingURL=d3-fantasia.map
