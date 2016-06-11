(function() {
  'use strict';

  angular
    .module('utils.codehangar')
    .factory('Segment', service);

  service.$inject = ['AnonId'];

  function service(AnonId) {

    this.alias = function(userId, cb) {
      AnonId.get(function(anonId) {
        analytics.alias(userId, {}, {}, function() {
          cb();
        });
      });
    };

    this.identify = function(userId, traits) {
      AnonId.get(function(anonId) {
        analytics.identify(userId, traits, {
          anonymousId: anonId
        });
      });
    };

    this.track = function(event, properties) {
      AnonId.get(function(anonId) {
        analytics.track(event, properties, {
          anonymousId: anonId
        });
      });
    };

    return this;

  }
})();
