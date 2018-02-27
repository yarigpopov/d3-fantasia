"use strict";

define('d3-fantasia/app', ['exports', 'd3-fantasia/resolver', 'ember-load-initializers', 'd3-fantasia/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('d3-fantasia/components/stack-chart', ['exports', 'd3-scale', 'd3-array', 'd3-shape', 'd3-selection', 'd3-axis'], function (exports, _d3Scale, _d3Array, _d3Shape, _d3Selection, _d3Axis) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    didReceiveAttrs() {
      this._super(...arguments);
      (0, _d3Selection.select)('svg').selectAll("*").remove();
    },
    didRender() {
      this._super(...arguments);
      let data = this.get('data');
      let svg = (0, _d3Selection.select)("svg"),
          margin = { top: 20, right: 20, bottom: 30, left: 40 },
          width = +svg.attr("width") - margin.left - margin.right,
          height = +svg.attr("height") - margin.top - margin.bottom,
          g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      let x = (0, _d3Scale.scaleBand)().rangeRound([0, width]).paddingInner(0.05).align(0.1);

      let y = (0, _d3Scale.scaleLinear)().rangeRound([height, 0]);

      let z = (0, _d3Scale.scaleOrdinal)().range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

      let keys = data.columns.slice(1);

      data.sort(function (a, b) {
        return b.total - a.total;
      });
      x.domain(data.map(function (d) {
        return d.State;
      }));
      y.domain([0, (0, _d3Array.max)(data, function (d) {
        return d.total;
      })]).nice();
      z.domain(keys);

      g.append("g").selectAll("g").data((0, _d3Shape.stack)().keys(keys)(data)).enter().append("g").attr("fill", function (d) {
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

      g.append("g").attr("class", "axis").attr("transform", "translate(0," + height + ")").call((0, _d3Axis.axisBottom)(x));

      g.append("g").attr("class", "axis").call((0, _d3Axis.axisLeft)(y).ticks(null, "s")).append("text").attr("x", 2).attr("y", y(y.ticks().pop()) + 0.5).attr("dy", "0.32em").attr("fill", "#000").attr("font-weight", "bold").attr("text-anchor", "start").text("Population");

      var legend = g.append("g").attr("font-family", "sans-serif").attr("font-size", 10).attr("text-anchor", "end").selectAll("g").data(keys.slice().reverse()).enter().append("g").attr("transform", function (d, i) {
        return "translate(0," + i * 20 + ")";
      });

      legend.append("rect").attr("x", width - 19).attr("width", 19).attr("height", 19).attr("fill", z);

      legend.append("text").attr("x", width - 24).attr("y", 9.5).attr("dy", "0.32em").text(function (d) {
        return d;
      });
      Ember.Logger.info('DidInsert finished');
    }

  });
});
define('d3-fantasia/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define('d3-fantasia/helpers/app-version', ['exports', 'd3-fantasia/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;


  const {
    APP: {
      version
    }
  } = _environment.default;

  function appVersion(_, hash = {}) {
    if (hash.hideSha) {
      return version.match(_regexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_regexp.shaRegExp)[0];
    }

    return version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('d3-fantasia/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('d3-fantasia/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('d3-fantasia/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'd3-fantasia/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  let name, version;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('d3-fantasia/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('d3-fantasia/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('d3-fantasia/initializers/export-application-global', ['exports', 'd3-fantasia/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
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

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define("d3-fantasia/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('d3-fantasia/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('d3-fantasia/router', ['exports', 'd3-fantasia/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {});

  exports.default = Router;
});
define('d3-fantasia/routes/index', ['exports', 'd3-request'], function (exports, _d3Request) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
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
});
define('d3-fantasia/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define("d3-fantasia/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "AzQPyyid", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "d3-fantasia/templates/application.hbs" } });
});
define("d3-fantasia/templates/components/stack-chart", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "xZtSZvC9", "block": "{\"symbols\":[\"data\"],\"statements\":[[0,\"\\n\"],[6,\"svg\"],[9,\"width\",\"960\"],[9,\"height\",\"500\"],[7],[0,\"\\n\\n\"],[8],[0,\"\\n\\n\"],[4,\"each\",[[20,[\"data\"]]],null,{\"statements\":[[0,\"    \"],[1,[25,\"get\",[[19,1,[]],\"Under 5 Years\"],null],false],[0,\"\\n\"]],\"parameters\":[1]},null]],\"hasEval\":false}", "meta": { "moduleName": "d3-fantasia/templates/components/stack-chart.hbs" } });
});
define("d3-fantasia/templates/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "+x0zAuxl", "block": "{\"symbols\":[],\"statements\":[[1,[25,\"stack-chart\",null,[[\"data\"],[[20,[\"model\"]]]]],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "d3-fantasia/templates/index.hbs" } });
});

define('d3-fantasia/config/environment', [], function() {
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

if (!runningTests) {
  require("d3-fantasia/app")["default"].create({"name":"d3-fantasia","version":"0.0.0+3cb129f2"});
}
//# sourceMappingURL=d3-fantasia.map
