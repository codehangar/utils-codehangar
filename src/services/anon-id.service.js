(function() {
  'use strict';

  angular
    .module('utils.codehangar')
    .factory('AnonId', service);

  service.$inject = ['UUID'];

  function service(UUID) {

    this.get = function(cb) {
      var key = 'uuid';

      // Segment is loaded
      if (analytics.user && analytics.user() && analytics.user().anonymousId) {
        localStorage[key] = analytics.user().anonymousId()
      } else if (!localStorage[key]) {
        localStorage[key] = UUID.generate();
        analytics.user().anonymousId(localStorage[key]);
      }

      cb(localStorage[key]);

    };

    return this;

  }
})();
