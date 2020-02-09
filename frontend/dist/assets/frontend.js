'use strict';



;define("frontend/adapters/application", ["exports", "ember-data"], function (_exports, _emberData) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = _emberData.default.RESTAdapter.extend({
    host: 'http://' + location.hostname + ':8000/api'
  });

  _exports.default = _default;
});
;define("frontend/adapters/contact", ["exports", "ember-data"], function (_exports, _emberData) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = _emberData.default.RESTAdapter.extend({});

  _exports.default = _default;
});
;define("frontend/adapters/get-adapter", ["exports", "ember-data"], function (_exports, _emberData) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = _emberData.default.RESTAdapter.extend({
    host: 'http://' + location.hostname + ':8000/api'
  });

  _exports.default = _default;
});
;define("frontend/app", ["exports", "frontend/resolver", "ember-load-initializers", "frontend/config/environment"], function (_exports, _resolver, _emberLoadInitializers, _environment) {
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
;define("frontend/authenticators/custom", ["exports", "ember-simple-auth/authenticators/base"], function (_exports, _base) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = _base.default.extend({
    session: Ember.inject.service(),
    tokenEndpoint: 'api/login',
    host: 'http://localhost:8000',
    sessionId: '',
    sessionName: '',
    activateLoginIcon: Ember.inject.service('activate-login-icon'),

    restore(data) {
      return new Promise((resolve, reject) => {
        console.log(data);

        if (!Ember.isEmpty(data.success.access_token)) {
          console.log(data);
          resolve(data);
        } else {
          reject();
        }
      });
    },

    authenticate(email, password) {
      const data = JSON.stringify({
        username: email,
        password: password
      });
      this.activateLoginIcon.on();
      const requestOptions = {
        async: true,
        url: 'http://localhost:8000/api/login',
        method: 'POST',
        contentType: 'application/json',
        data: data
      };
      var result = Ember.RSVP.resolve(Ember.$.ajax(requestOptions));
      return result;
    },

    invalidateSession(data) {
      alert("test");
      const requestOptions = this.get('session').invalidate();
      return Ember.RSVP.resolve(Ember.$.ajax(requestOptions));
    }

  });

  _exports.default = _default;
});
;define("frontend/components/channel", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({});

  _exports.default = _default;
});
;define("frontend/components/chat", ["exports", "npm:laravel-echo"], function (_exports, _npmLaravelEcho) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const {
    computed,
    observer
  } = Ember;

  var _default = Ember.Component.extend({
    store: Ember.inject.service(),
    user_id_sent: null,
    recipient_id_sent: null,
    message_sent: null,
    model: null,
    session: Ember.inject.service(),

    init() {
      this._super(...arguments);

      const self = this; // window.io = require('socket.io-client');

      window.Echo = new _npmLaravelEcho.default({
        broadcaster: 'socket.io',
        host: window.location.hostname + ':6001'
      });
      window.Echo.channel('office-dashboard').listen('.SomeTestEvent', function (e) {
        var currentUserIdentifier = self.get('session.data.authenticated.identifier');
        let newMessage = e.data;
        let model = self.get('model');
        let user_id = self.get('user_id_sent');
        let recipient_id = self.get('recipient_id_sent');
        let message_sent = self.get('message_sent');
        let sender = //model.push({"id" : user_id, "recipient_id": recipient_id, "message": newMessage, "sender": null});
        //console.log(model);
        self.store.createRecord('selected-user-chat', {
          id: user_id,
          recipient_id: recipient_id,
          message: newMessage,
          sender: true
        });
        let allChat = self.store.peekAll('selected-user-chat'); // allChat.forEach(function(item, index){
        // 	var userId = item.recipient_id;
        // 	if (userId == currentUserIdentifier) {
        // 		Ember.set(item, "sender", true);
        // 	} else {
        // 		Ember.set(item, "sender", false);
        // 		//item['sender'] = true;
        // 	}
        // });
        // console.log(allChat);

        self.set('model', allChat); //this.set('selectedChat', e);
      });
    },

    getChat: computed(function () {
      var test = this.store.peekAll('selected-user-chat');
      console.log('test');
    }),
    getHostNameWithSocket: computed(function () {
      var hostName = location.hostname;
      return "//localhost:6001/socket.io/socket.io.js";
    }),
    actions: {
      submitChatText(chatInputValue, recipient_id) {
        // USED FOR SETTING THEM IN MODEL WHEN LARAVEL ECHO SERVER RECEIVES NEW MESSAGE.
        var userIdentifier = this.get('session.data.authenticated.identifier');
        this.set('user_id_sent', userIdentifier);
        this.set('recipient_id_sent', recipient_id);
        this.set('message_sent', chatInputValue);
        var getModel = this.get('model');
        this.set('model', getModel);
        Ember.$.ajax({
          type: "POST",
          url: "http://" + location.hostname + ":8000/api/postMessage",
          data: {
            user_id: userIdentifier,
            recipient_id: recipient_id,
            message: chatInputValue
          }
        }).then(response => {
          var id = response; // console.log(response);

          this.store.createRecord('selected-user-chat', {
            id: id,
            recipient_id: recipient_id,
            message: chatInputValue,
            sender: false
          });
          let allChat = this.store.peekAll('selected-user-chat');
          this.set('model', allChat); // this.test();
        }).catch(response => {
          alert(response);
          alert('some error occured!!!');
        });
      }

    }
  });

  _exports.default = _default;
});
;define("frontend/components/contact", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const {
    computed,
    observer
  } = Ember;

  var _default = Ember.Component.extend({
    store: Ember.inject.service(),
    sidebarOpened: true,
    selectedUserChat: Ember.inject.service('get-service'),

    didInsertElement() {
      var model = this.get('model');
    },

    actions: {}
  });

  _exports.default = _default;
});
;define("frontend/components/in-sidebar", ["exports", "ember-sidebars/components/in-sidebar"], function (_exports, _inSidebar) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _inSidebar.default;
    }
  });
});
;define("frontend/components/main", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const {
    computed,
    observer
  } = Ember;
  const {
    alias
  } = computed;

  var _default = Ember.Component.extend({
    actions: {
      selectUser(userId) {
        alert(userId);
      }

    }
  });

  _exports.default = _default;
});
;define("frontend/components/show-sidebar", ["exports", "ember-sidebars/components/show-sidebar"], function (_exports, _showSidebar) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _showSidebar.default;
    }
  });
});
;define("frontend/components/welcome-page", ["exports", "ember-welcome-page/components/welcome-page"], function (_exports, _welcomePage) {
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
;define("frontend/components/with-sidebar", ["exports", "ember-sidebars/components/with-sidebar"], function (_exports, _withSidebar) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _withSidebar.default;
    }
  });
});
;define("frontend/controllers/application", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Controller.extend({
    session: Ember.inject.service()
  });

  _exports.default = _default;
});
;define("frontend/controllers/channel", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Controller.extend({});

  _exports.default = _default;
});
;define("frontend/controllers/contact", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Controller.extend({
    actions: {
      actionName: function () {
        alert("TEST");
      }
    }
  });

  _exports.default = _default;
});
;define("frontend/controllers/login", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const {
    computed,
    observer
  } = Ember;

  var _default = Ember.Controller.extend({
    activateLoginIcon: Ember.inject.service('activate-login-icon'),
    needs: ['main'],
    authenticated: false,
    error: false,
    email: '',
    isValid: Ember.computed.match('email', /^.+@.+\..+$/),
    isDisabled: Ember.computed.not('isValid'),
    session: Ember.inject.service(),
    didActivateLogoChange: Ember.computed('activateLoginIcon.loadingLogin', function () {
      return this.get('activateLoginIcon.loadingLogin');
    }),
    actions: {
      authenticate() {
        let {
          email,
          password
        } = this.getProperties('email', 'password');
        this.get('session').authenticate('authenticator:custom', email, password).then(function (result) {
          console.log(result);
        }, function (err) {
          console.log(err);
        });
      }

    }
  });

  _exports.default = _default;
});
;define("frontend/controllers/main", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const {
    computed,
    observer
  } = Ember;
  const {
    alias
  } = computed;

  var _default = Ember.Controller.extend({
    session: Ember.inject.service(),
    websocket: Ember.inject.service(),
    sidebarOpenedRes: false,
    queryParams: ['selectedUserId'],
    selectedUserId: null,
    contacts: computed.reads('model.contacts'),

    init() {
      this._super(...arguments);

      this.fetchChat();
    },

    async fetchChat() {
      if (!this.selectedUserId) {
        this.set('selectedChat', []);
        return;
      }

      let currentUserIdentifier = this.get('session.data.authenticated.identifier');
      let filter = {
        selectedUserId: this.selectedUserId,
        activeUserId: currentUserIdentifier
      };
      let results = await this.store.query('selectedUserChat', {
        filter
      });
      results.forEach(function (item, index) {
        var userId = item.recipient_id;

        if (userId == currentUserIdentifier) {
          Ember.set(item, "sender", true);
        } else {
          Ember.set(item, "sender", false); //item['sender'] = true;
        }
      });
      console.log(results);
      this.set('selectedChat', results);
    },

    didSidebarChanged: Ember.observer('sidebarOpened', function () {
      if ($("#mySidebar").width() > 240) {
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        $('#closeButton').removeClass("closebtnmargin");
        this.set('sidebarOpenedRes', false);
      } else {
        this.set('sidebarOpenedRes', true);
        document.getElementById("mySidebar").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
        $('#closeButton').removeClass("closebtnmargin");
      }
    }),
    actions: {
      // closeSidebar() {
      // 	document.getElementById("left-sidebar").style.width = "0";
      // 			document.getElementById("main").style.marginLeft = "0";
      // 			this.set('sidebarOpened', false);
      // },
      toggleSidebar() {
        this.toggleProperty('sidebarOpened');
      },

      test() {
        this.get('model').reload();
      },

      selectUser(userId) {
        //this.websocket.socketRef.send(userId);
        this.set('selectedUserId', userId);
        this.fetchChat();
      } // selectUser(userId) {
      // 	var self = this;
      // 	alert(userId);
      // 	let peekChat = this.store.peekRecord('selected-user-chat', userId);
      // 	if (peekChat) {
      // 		self.set('model.selectedChat', peekChat);
      // 	} else {
      // 		// this.store.findAll('selected-user-chat').then((records) => {
      // 		//   let test = records.findBy('id', userId);
      // 		//   console.log(test);
      // 		//   self.set('model.selectedChat', test);
      // 		// });
      // 		this.store.query('selectedUserChat', {
      // 		  filter: {
      // 		    id: userId
      // 		  }
      // 		}).then(function(response) {
      // 			// let test = response.findBy('id', userId);
      // 			let test = response.get('recipient_id') == 2;
      // 			console.log("This is filtered resp: " + test);
      // 			// console.log(test);
      // 			// self.set('model.selectedChat', response);
      // 		});
      // 	}
      // }

      /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
      // openSidebar() {
      //   document.getElementById("left-sidebar").style.width = "250px";
      //   this.set('sidebarOpened', true);
      // }


    }
  });

  _exports.default = _default;
});
;define("frontend/controllers/register", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const {
    computed,
    observer
  } = Ember;

  var _default = Ember.Controller.extend({
    authenticated: false,
    error: false,
    name: '',
    email: '',
    isValidEmail: Ember.computed.match('email', /^.+@.+\..+$/),
    isNameEnoughLong: Ember.computed.gte("name.length", 5),
    isValid: Ember.computed.and('isNameEnoughLong', 'isValidEmail'),
    actions: {
      register(name, email, password) {
        Ember.$.ajax({
          type: "POST",
          url: "http://localhost:8000/api/register",
          data: {
            name: name,
            email: email,
            password: password
          }
        }).then(response => {
          alert('Registered!');
          this.set('name', '');
          this.set('email', '');
          this.set('password', '');
          this.transitionToRoute('login');
        }).catch(response => {
          alert('some error occured!!!');
        });
      }

    }
  });

  _exports.default = _default;
});
;define("frontend/helpers/app-version", ["exports", "frontend/config/environment", "ember-cli-app-version/utils/regexp"], function (_exports, _environment, _regexp) {
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
;define("frontend/helpers/pluralize", ["exports", "ember-inflector/lib/helpers/pluralize"], function (_exports, _pluralize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _pluralize.default;
  _exports.default = _default;
});
;define("frontend/helpers/route-action", ["exports", "ember-route-action-helper/helpers/route-action"], function (_exports, _routeAction) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _routeAction.default;
    }
  });
});
;define("frontend/helpers/singularize", ["exports", "ember-inflector/lib/helpers/singularize"], function (_exports, _singularize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _singularize.default;
  _exports.default = _default;
});
;define("frontend/initializers/app-version", ["exports", "ember-cli-app-version/initializer-factory", "frontend/config/environment"], function (_exports, _initializerFactory, _environment) {
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
;define("frontend/initializers/container-debug-adapter", ["exports", "ember-resolver/resolvers/classic/container-debug-adapter"], function (_exports, _containerDebugAdapter) {
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
;define("frontend/initializers/ember-data", ["exports", "ember-data/setup-container", "ember-data"], function (_exports, _setupContainer, _emberData) {
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
;define("frontend/initializers/ember-simple-auth", ["exports", "frontend/config/environment", "ember-simple-auth/configuration", "ember-simple-auth/initializers/setup-session", "ember-simple-auth/initializers/setup-session-service", "ember-simple-auth/initializers/setup-session-restoration"], function (_exports, _environment, _configuration, _setupSession, _setupSessionService, _setupSessionRestoration) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'ember-simple-auth',

    initialize(registry) {
      const config = _environment.default['ember-simple-auth'] || {};
      config.rootURL = _environment.default.rootURL || _environment.default.baseURL;

      _configuration.default.load(config);

      (0, _setupSession.default)(registry);
      (0, _setupSessionService.default)(registry);
      (0, _setupSessionRestoration.default)(registry);
    }

  };
  _exports.default = _default;
});
;define("frontend/initializers/export-application-global", ["exports", "frontend/config/environment"], function (_exports, _environment) {
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
;define("frontend/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (_exports, _initializeStoreService) {
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
;define("frontend/instance-initializers/ember-simple-auth", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  // This is only needed for backwards compatibility and will be removed in the
  // next major release of ember-simple-auth. Unfortunately, there is no way to
  // deprecate this without hooking into Ember's internals…
  var _default = {
    name: 'ember-simple-auth',

    initialize() {}

  };
  _exports.default = _default;
});
;define("frontend/models/contact", ["exports", "ember-data"], function (_exports, _emberData) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const {
    Model
  } = _emberData.default;

  var _default = Model.extend({
    name: _emberData.default.attr('string')
  });

  _exports.default = _default;
});
;define("frontend/models/main", ["exports", "ember-data"], function (_exports, _emberData) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const {
    Model
  } = _emberData.default;

  var _default = Model.extend({
    name: _emberData.default.attr('string')
  });

  _exports.default = _default;
});
;define("frontend/models/selected-user-chat", ["exports", "ember-data"], function (_exports, _emberData) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const {
    Model
  } = _emberData.default;

  var _default = Model.extend({
    recipient_id: _emberData.default.attr('string'),
    message: _emberData.default.attr('string'),
    profile_image: _emberData.default.attr('string')
  });

  _exports.default = _default;
});
;define("frontend/models/user-data", ["exports", "ember-data"], function (_exports, _emberData) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const {
    Model
  } = _emberData.default;

  var _default = Model.extend({
    email: _emberData.default.attr('string')
  });

  _exports.default = _default;
});
;define("frontend/resolver", ["exports", "ember-resolver"], function (_exports, _emberResolver) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _emberResolver.default;
  _exports.default = _default;
});
;define("frontend/router", ["exports", "frontend/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });
  Router.map(function () {
    this.route('login', {
      path: '/'
    });
    this.route('login', {
      path: '/login'
    });
    this.route('register', {
      path: '/register'
    });
    this.route('main', {
      path: '/main'
    });
    this.route('channel');
    this.route('contacts', function () {
      this.route('chat', {
        path: ':userId'
      });
    });
  });
  var _default = Router;
  _exports.default = _default;
});
;define("frontend/routes/application", ["exports", "ember-simple-auth/mixins/application-route-mixin"], function (_exports, _applicationRouteMixin) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Route.extend(_applicationRouteMixin.default, {// beforeModel() {
    //    	this.transitionTo('login');
    //  	}
  });

  _exports.default = _default;
});
;define("frontend/routes/channel", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Route.extend({});

  _exports.default = _default;
});
;define("frontend/routes/chat", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Route.extend({
    store: Ember.inject.service(),

    model(params) {
      console.log(this.get('model'));
    },

    actions: {
      selectUser(userId) {
        alert("HELLO");
      }

    }
  });

  _exports.default = _default;
});
;define("frontend/routes/contact", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Route.extend({
    store: Ember.inject.service(),

    async model() {
      console.log(this.get('model')); //   var contactsUrl = 'http://localhost:8000/api/contacts';
      // let fetchUrlResponse = await fetch(contactsUrl);
      // let contactsJson = await fetchUrlResponse.json();
      // // this.store.createRecord('contact', {
      // //           	id: 1,
      // //           	name: json[0].name,
      // //           	surname: json[0].surname
      // // });
      // return contactsJson;
    },

    actions: {
      selectUser(userId) {
        alert("User selected");
      }

    }
  });

  _exports.default = _default;
});
;define("frontend/routes/login", ["exports", "ember-data", "ember-simple-auth/mixins/unauthenticated-route-mixin"], function (_exports, _emberData, _unauthenticatedRouteMixin) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Route.extend(_unauthenticatedRouteMixin.default, {
    routeAfterAuthentication: 'main',
    // model: function() {
    // var url = 'http://localhost:8000/api/contacts';
    // 	var promise = new Ember.RSVP.Promise(function(resolve, reject) {
    //          var contacts = Ember.$.ajax({ url: url, type: 'GET' });
    //          resolve(contacts);
    //      });
    //      var ttt = DS.PromiseObject.create({ promise: promise });
    //      console.log(ttt);
    //      // var test = DS.PromiseObject.create({ promise: abc });
    //      // console.log(abc);
    //      // console.log(test);
    // },
    actions: {// 	  	getContacts() {
      // 	  		$.ajax({
      // 	            type: "GET",
      // 	            url: "http://localhost:8000/api/contacts"
      // 	        }).then(response => {
      // //	            alert(JSON.stringify(response));
      // 	            this.store.createRecord('contact', {
      // 	            	id: '1',
      // 	            	name: response[0].name,
      // 	            	surname: response[0].surname
      // 	            });
      // 	        });
      // 	  	}
    }
  });

  _exports.default = _default;
});
;define("frontend/routes/main", ["exports", "ember-simple-auth/mixins/authenticated-route-mixin"], function (_exports, _authenticatedRouteMixin) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Route.extend(_authenticatedRouteMixin.default, {
    store: Ember.inject.service(),
    session: Ember.inject.service(),
    currentUser: Ember.inject.service(),
    activateLoginIcon: Ember.inject.service('activate-login-icon'),

    async model() {
      let currentUserIdentifier = this.get('session.data.authenticated.identifier');
      let contacts = await (await fetch('http://localhost:8000/api/contact/' + currentUserIdentifier)).json();
      let channels = await (await fetch('http://localhost:8000/api/channel/' + currentUserIdentifier)).json(); //let tests = await (await fetch('http://localhost:8000/api/test')).json();

      return {
        contacts,
        channels
      };
    },

    // setupController(controller, model) {
    //     this._super(controller, model);
    //     this.controllerFor('contact').set('contact', model);
    //  	},
    actions: {
      // closeSidebar() {
      // 	document.getElementById("left-sidebar").style.width = "0";
      // 			document.getElementById("main").style.marginLeft = "0";
      // },
      // logout() {
      // 	$.ajax({
      //            type: "POST",
      //            url: "http://localhost:8000/api/logout"
      //        }).then(response => {
      //        	this.activateLoginIcon.off();
      //        	this.store.unloadAll('contact');
      //            this.transitionTo('login');
      //        })
      // }
      invalidateSession() {
        this.get('session').invalidate();
      }

    }
  });

  _exports.default = _default;
});
;define("frontend/routes/register", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Route.extend({});

  _exports.default = _default;
});
;define("frontend/serializers/application", ["exports", "ember-data"], function (_exports, _emberData) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = _emberData.default.JSONSerializer.extend({});

  _exports.default = _default;
});
;define("frontend/serializers/contact", ["exports", "ember-data"], function (_exports, _emberData) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = _emberData.default.JSONAPISerializer.extend({});

  _exports.default = _default;
});
;define("frontend/services/activate-login-icon", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Service.extend({
    loadingLogin: false,

    init() {
      this._super(...arguments);
    },

    on() {
      this.set('loadingLogin', true);
    },

    off() {
      this.set('loadingLogin', false);
    }

  });

  _exports.default = _default;
});
;define("frontend/services/ajax", ["exports", "ember-ajax/services/ajax"], function (_exports, _ajax) {
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
;define("frontend/services/cookies", ["exports", "ember-cookies/services/cookies"], function (_exports, _cookies) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _cookies.default;
  _exports.default = _default;
});
;define("frontend/services/current-user", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Service.extend({
    session: Ember.inject.service(),
    store: Ember.inject.service(),

    load() {
      let userId = this.get('session.data.authenticated.user_id');

      if (!Ember.isEmpty(userId)) {
        return this.get('store').findRecord('user', userId).then(user => {
          this.set('user', user);
        });
      } else {
        return Ember.RSVP.resolve();
      }
    }

  });

  _exports.default = _default;
});
;define("frontend/services/ember-sidebars", ["exports", "ember-sidebars/services/ember-sidebars"], function (_exports, _emberSidebars) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberSidebars.default;
    }
  });
});
;define("frontend/services/get-service", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Service.extend({
    store: Ember.inject.service(),
    host: 'http://localhost:8000/api',

    init() {
      this._super(...arguments);
    },

    getWithParam(requestUrl, userId) {
      this.store.query(requestUrl, {
        filter: {
          id: userId
        }
      }).then(function (response) {
        return response;
      });
    }

  });

  _exports.default = _default;
});
;define("frontend/services/session", ["exports", "ember-simple-auth/services/session"], function (_exports, _session) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _session.default;
  _exports.default = _default;
});
;define("frontend/services/socket-io", ["exports", "ember-websockets/services/socket-io"], function (_exports, _socketIo) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _socketIo.default;
    }
  });
});
;define("frontend/services/websocket", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Service.extend({
    socketRef: null,
    websockets: Ember.inject.service(),

    turnOnWebsockets() {
      this._super(...arguments);
    },

    willDestroyElement() {
      this._super(...arguments);

      const socket = this.socketRef;
      socket.off('open', this.myOpenHandler);
      socket.off('message', this.myMessageHandler);
      socket.off('close', this.myCloseHandler);
    },

    myOpenHandler(event) {
      console.log(`On open event has been called: ${event}`);
    },

    myMessageHandler(event) {
      console.log(`Message: ${event.data}`);
      console.log(event);
      this.set('model', JSON.parse(event.data));
    },

    myCloseHandler(event) {
      console.log(event);
      console.log(`On close event has been called: ${event}`);
    }

  });

  _exports.default = _default;
});
;define("frontend/services/websockets", ["exports", "ember-websockets/services/websockets"], function (_exports, _websockets) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _websockets.default;
    }
  });
});
;define("frontend/session-stores/application", ["exports", "ember-simple-auth/session-stores/adaptive"], function (_exports, _adaptive) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = _adaptive.default.extend();

  _exports.default = _default;
});
;define("frontend/templates/application", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "eo2jppm/",
    "block": "{\"symbols\":[],\"statements\":[[1,[23,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "frontend/templates/application.hbs"
    }
  });

  _exports.default = _default;
});
;define("frontend/templates/channel", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "czN5IPbn",
    "block": "{\"symbols\":[],\"statements\":[[1,[23,\"outlet\"],false]],\"hasEval\":false}",
    "meta": {
      "moduleName": "frontend/templates/channel.hbs"
    }
  });

  _exports.default = _default;
});
;define("frontend/templates/chat", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "KfjlF1Rb",
    "block": "{\"symbols\":[],\"statements\":[[5,\"chat\",[],[[\"@model\"],[[24,0,[\"model\"]]]]]],\"hasEval\":false}",
    "meta": {
      "moduleName": "frontend/templates/chat.hbs"
    }
  });

  _exports.default = _default;
});
;define("frontend/templates/components/channel", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "FZvRxmCN",
    "block": "{\"symbols\":[\"item\",\"@model\"],\"statements\":[[7,\"div\"],[11,\"class\",\"channelHeader\"],[9],[0,\"\\n\\n\"],[10],[0,\"\\n\"],[7,\"div\"],[11,\"class\",\"channelHeader\"],[9],[0,\"Channels\"],[7,\"a\"],[11,\"href\",\"\"],[9],[7,\"img\"],[11,\"src\",\"plus-button.png\"],[11,\"width\",\"15\"],[11,\"height\",\"15\"],[11,\"class\",\"plusButton\"],[9],[10],[10],[10],[0,\"\\n\"],[7,\"div\"],[11,\"id\",\"channelParent\"],[9],[0,\"\\n\"],[4,\"each\",[[24,2,[]]],null,{\"statements\":[[0,\"\\t\\t\"],[7,\"a\"],[11,\"href\",\"#\"],[11,\"class\",\"channelDiv\"],[9],[0,\"\\n\\t\\t\\t- \"],[1,[24,1,[\"channel_name\"]],false],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\"]],\"parameters\":[1]},null],[10],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "frontend/templates/components/channel.hbs"
    }
  });

  _exports.default = _default;
});
;define("frontend/templates/components/chat", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "DcTi2V0Q",
    "block": "{\"symbols\":[\"item\",\"@model\"],\"statements\":[[4,\"each\",[[24,2,[]]],null,{\"statements\":[[4,\"if\",[[24,1,[\"sender\"]]],null,{\"statements\":[[0,\"\\t\"],[7,\"div\"],[11,\"class\",\"left-message-box\"],[9],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"chatbox-container-left\"],[9],[0,\"\\n\\t\\t\\t\"],[1,[24,1,[\"message\"]],false],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"user-img-left\"],[9],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[7,\"img\"],[12,\"src\",[30,[\"profile_pictures\",[24,1,[\"profile_image\"]]]]],[11,\"class\",\"chat-image-left\"],[9],[10],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\t\"],[10],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"\\t\"],[7,\"div\"],[11,\"class\",\"right-message-box\"],[9],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"user-img-right\"],[9],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[7,\"img\"],[12,\"src\",[30,[\"profile_pictures\",[24,1,[\"profile_image\"]]]]],[11,\"class\",\"chat-image-right\"],[9],[10],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"chatbox-container-right\"],[9],[0,\"\\n\\t\\t\\t\"],[1,[24,1,[\"message\"]],false],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\n\"]],\"parameters\":[1]},null],[7,\"div\"],[11,\"class\",\"chatbox\"],[9],[0,\"\\n\\t\"],[7,\"form\"],[9],[0,\"\\n\\t\\t\"],[7,\"button\"],[11,\"class\",\"chatbox-submit\"],[11,\"type\",\"submit\"],[9],[0,\"Submit\"],[10],[0,\"\\n\\t\\t\"],[1,[29,\"input\",null,[[\"class\",\"value\"],[\"chatbox-input\",[25,[\"chatInputValue\"]]]]],false],[0,\"\\n\\t\"],[3,\"action\",[[24,0,[]],\"submitChatText\",[25,[\"chatInputValue\"]],[25,[\"item\",\"recipient_id\"]]],[[\"on\"],[\"submit\"]]],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"script\"],[12,\"src\",[23,\"getHostNameWithSocket\"]],[9],[10],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "frontend/templates/components/chat.hbs"
    }
  });

  _exports.default = _default;
});
;define("frontend/templates/components/contact", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "gS9pm/IY",
    "block": "{\"symbols\":[\"item\",\"@model\"],\"statements\":[[7,\"div\"],[11,\"class\",\"contactHeader\"],[9],[0,\"\\n\\n\"],[10],[0,\"\\n\"],[7,\"div\"],[11,\"class\",\"contactHeader\"],[9],[0,\"Contacts\"],[7,\"a\"],[11,\"href\",\"#\"],[9],[7,\"img\"],[11,\"src\",\"plus-button.png\"],[11,\"width\",\"15\"],[11,\"height\",\"15\"],[11,\"class\",\"plusButton\"],[9],[10],[10],[10],[0,\"\\n\"],[7,\"div\"],[11,\"id\",\"contactParent\"],[9],[0,\"\\n\"],[4,\"each\",[[24,2,[]]],null,{\"statements\":[[0,\"\\t\"],[7,\"a\"],[11,\"href\",\"#\"],[11,\"class\",\"contactDiv\"],[12,\"id\",[24,1,[\"id\"]]],[9],[0,\"\\n\"],[4,\"if\",[[24,1,[\"is_active\"]]],null,{\"statements\":[[0,\"\\t\\t\\t\"],[7,\"img\"],[11,\"src\",\"on.png\"],[11,\"height\",\"15\"],[11,\"width\",\"15\"],[11,\"class\",\"contactStatusImage\"],[9],[10],[1,[24,1,[\"name\"]],false],[0,\" \"],[1,[24,1,[\"surname\"]],false],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"\\t\\t\\t\"],[7,\"img\"],[11,\"src\",\"off.png\"],[11,\"height\",\"15\"],[11,\"width\",\"15\"],[11,\"class\",\"contactStatusImage\"],[9],[10],[1,[24,1,[\"name\"]],false],[0,\" \"],[1,[24,1,[\"surname\"]],false],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\t\"],[3,\"action\",[[24,0,[]],[24,0,[\"anAction\"]],[24,1,[\"contact_id\"]]]],[10],[0,\"\\n\"]],\"parameters\":[1]},null],[10],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "frontend/templates/components/contact.hbs"
    }
  });

  _exports.default = _default;
});
;define("frontend/templates/components/main", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "ohKSiUI8",
    "block": "{\"symbols\":[\"item\",\"@model\"],\"statements\":[[7,\"h1\"],[9],[0,\"HELLO2\"],[10],[0,\"\\n\"],[4,\"if\",[[24,2,[]]],null,{\"statements\":[[0,\"\\t\"],[7,\"h1\"],[9],[0,\" We have model\"],[10],[0,\"\\n\"],[4,\"each\",[[24,2,[]]],null,{\"statements\":[[0,\"    \\t\"],[7,\"p\"],[9],[0,\"Hello, \"],[1,[24,1,[\"name\"]],false],[0,\" \"],[1,[24,1,[\"surname\"]],false],[0,\"!\"],[10],[0,\"\\n\"]],\"parameters\":[1]},null]],\"parameters\":[]},null]],\"hasEval\":false}",
    "meta": {
      "moduleName": "frontend/templates/components/main.hbs"
    }
  });

  _exports.default = _default;
});
;define("frontend/templates/contact", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "l3VonTTz",
    "block": "{\"symbols\":[],\"statements\":[[5,\"contact\",[],[[\"@model\",\"@anAction\"],[[24,0,[\"model\"]],[29,\"action\",[[24,0,[]],\"selectUser\"],null]]]],[0,\"\\n\"],[1,[23,\"outlet\"],false]],\"hasEval\":false}",
    "meta": {
      "moduleName": "frontend/templates/contact.hbs"
    }
  });

  _exports.default = _default;
});
;define("frontend/templates/login", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "86nIm8Vt",
    "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[9],[0,\"\\n\"],[7,\"img\"],[11,\"src\",\"download.png\"],[11,\"class\",\"login-image\"],[9],[10],[0,\"\\n\"],[7,\"form\"],[11,\"class\",\"login-register-form\"],[9],[0,\"\\n  \\t\"],[1,[29,\"input\",null,[[\"class\",\"value\",\"id\",\"placeholder\",\"type\"],[\"login-input-field\",[25,[\"email\"]],\"email\",\"Email\",\"email\"]]],false],[7,\"br\"],[9],[10],[0,\"\\n  \\t\"],[1,[29,\"input\",null,[[\"class\",\"value\",\"id\",\"placeholder\",\"type\"],[\"login-input-field\",[25,[\"password\"]],\"password\",\"Password\",\"password\"]]],false],[7,\"br\"],[9],[10],[0,\"\\n\\t\"],[7,\"button\"],[11,\"class\",\"btn btn-primary btn-lg login-button\"],[12,\"disabled\",[23,\"isDisabled\"]],[9],[0,\"Login\"],[10],[0,\"\\n\"],[4,\"link-to\",[\"register\"],null,{\"statements\":[[0,\"\\t  \"],[7,\"button\"],[11,\"class\",\"btn btn-primary btn-lg login-button\"],[9],[0,\"Register\"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[3,\"action\",[[24,0,[]],\"authenticate\"],[[\"on\"],[\"submit\"]]],[10],[0,\"\\n\"],[7,\"br\"],[9],[10],[0,\"\\n\"],[4,\"if\",[[25,[\"didActivateLogoChange\"]]],null,{\"statements\":[[7,\"div\"],[11,\"class\",\"loader-wrapper\"],[9],[0,\"\\n    \"],[7,\"span\"],[11,\"class\",\"loader\"],[9],[7,\"span\"],[11,\"class\",\"loader-inner\"],[9],[10],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[25,[\"error\"]]],null,{\"statements\":[[7,\"h1\"],[9],[0,\" Wrong credentials! \"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[10],[0,\"\\n\\n\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "frontend/templates/login.hbs"
    }
  });

  _exports.default = _default;
});
;define("frontend/templates/main", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "HtglIGmx",
    "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"id\",\"main\"],[9],[0,\"\\n\\t\"],[7,\"div\"],[11,\"class\",\"header\"],[9],[0,\"\\n\\t\\t\"],[7,\"img\"],[11,\"src\",\"logo-top.png\"],[9],[10],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"dropdown\"],[11,\"style\",\"float:right;\"],[9],[0,\"\\n\\t\\t  \"],[7,\"button\"],[11,\"class\",\"dropbtn\"],[9],[0,\"Settings\"],[10],[0,\"\\n\\t\\t  \"],[7,\"div\"],[11,\"class\",\"dropdown-content\"],[9],[0,\"\\n\\t\\t  \"],[7,\"a\"],[11,\"href\",\"#\"],[9],[0,\"Link 1\"],[10],[0,\"\\n\\t\\t  \"],[7,\"a\"],[11,\"href\",\"#\"],[9],[0,\"Link 2\"],[10],[0,\"\\n\"],[4,\"if\",[[25,[\"session\",\"isAuthenticated\"]]],null,{\"statements\":[[0,\"\\t    \\t\"],[7,\"a\"],[11,\"href\",\"#\"],[9],[0,\"Logout\"],[3,\"action\",[[24,0,[]],\"invalidateSession\"]],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\t\\t  \"],[10],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\t\"],[10],[0,\"\\n\\n\\t\"],[7,\"div\"],[11,\"id\",\"mySidebar\"],[11,\"class\",\"sidebar\"],[9],[0,\"\\n\"],[4,\"if\",[[25,[\"sidebarOpenedRes\"]]],null,{\"statements\":[[0,\"\\t\\t\\t\"],[7,\"div\"],[11,\"id\",\"main\"],[9],[0,\"\\n  \\t\\t\\t\\t\"],[7,\"img\"],[11,\"src\",\"arrowClose.png\"],[11,\"height\",\"20\"],[11,\"width\",\"20\"],[11,\"id\",\"closeButton\"],[11,\"class\",\"closebtn\"],[9],[3,\"action\",[[24,0,[]],\"toggleSidebar\"]],[10],[0,\"\\n\\t\\t\\t\"],[10],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"\\t\\t\\t\"],[7,\"div\"],[11,\"id\",\"main\"],[9],[0,\"\\n  \\t\\t\\t\\t\"],[7,\"img\"],[11,\"src\",\"arrowOpen.png\"],[11,\"height\",\"20\"],[11,\"width\",\"20\"],[11,\"id\",\"openButton\"],[11,\"class\",\"openbtn\"],[9],[3,\"action\",[[24,0,[]],\"toggleSidebar\"]],[10],[0,\"\\n\\t\\t\\t\"],[10],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\t\\t\"],[5,\"contact\",[],[[\"@model\",\"@anAction\"],[[24,0,[\"model\",\"contacts\"]],[29,\"action\",[[24,0,[]],\"selectUser\"],null]]]],[0,\"\\n\\t\\t\"],[5,\"channel\",[],[[\"@model\"],[[24,0,[\"model\",\"channels\"]]]]],[0,\"\\n\\t\"],[10],[0,\"\\n\\t\"],[7,\"div\"],[11,\"id\",\"mainView\"],[9],[0,\"\\n\\t\\t\"],[7,\"div\"],[11,\"class\",\"mainViewScrollDiv\"],[9],[0,\"\\n\\t\\t\\t\"],[5,\"chat\",[],[[\"@model\",\"@test\"],[[24,0,[\"selectedChat\"]],[29,\"action\",[[24,0,[]],\"test\"],null]]]],[0,\"\\n\\t\\t\"],[10],[0,\"\\n\\t\"],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "frontend/templates/main.hbs"
    }
  });

  _exports.default = _default;
});
;define("frontend/templates/register", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "QkCI2vQq",
    "block": "{\"symbols\":[],\"statements\":[[7,\"p\"],[9],[0,\"Register Page\"],[10],[0,\"\\n\\n\"],[7,\"div\"],[9],[0,\"\\n\\t\"],[7,\"img\"],[11,\"src\",\"download.png\"],[11,\"class\",\"login-image\"],[9],[10],[0,\"\\n\"],[7,\"form\"],[11,\"class\",\"login-register-form\"],[9],[0,\"\\n  \"],[1,[29,\"input\",null,[[\"class\",\"value\",\"placeholder\"],[\"login-input-field\",[25,[\"name\"]],\"Name\"]]],false],[7,\"br\"],[9],[10],[0,\"\\n  \"],[1,[29,\"input\",null,[[\"class\",\"value\",\"placeholder\"],[\"login-input-field\",[25,[\"email\"]],\"Email\"]]],false],[7,\"br\"],[9],[10],[0,\"\\n  \"],[1,[29,\"input\",null,[[\"class\",\"value\",\"placeholder\",\"type\"],[\"login-input-field\",[25,[\"password\"]],\"Password\",\"password\"]]],false],[7,\"br\"],[9],[10],[0,\"\\n  \"],[7,\"button\"],[11,\"class\",\"btn btn-primary btn-lg login-button\"],[12,\"disabled\",[30,[[29,\"unless\",[[25,[\"isValid\"]],\"disabled\"],null]]]],[11,\"type\",\"submit\"],[9],[0,\"Register\"],[10],[0,\"\\n\"],[4,\"link-to\",[\"login\"],null,{\"statements\":[[0,\"\\t  \"],[7,\"button\"],[11,\"class\",\"btn btn-primary btn-lg login-button\"],[9],[0,\"Login\"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[3,\"action\",[[24,0,[]],\"register\",[25,[\"name\"]],[25,[\"email\"]],[25,[\"password\"]]],[[\"on\"],[\"submit\"]]],[10],[0,\"\\n\"],[10]],\"hasEval\":false}",
    "meta": {
      "moduleName": "frontend/templates/register.hbs"
    }
  });

  _exports.default = _default;
});
;

;define('frontend/config/environment', [], function() {
  var prefix = 'frontend';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

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
            require("frontend/app")["default"].create({"name":"frontend","version":"0.0.0+6c67c933"});
          }
        
//# sourceMappingURL=frontend.map
