(function() {
  'use strict';

  angular
    .module('utils.codehangar')
    .controller('RethinkCtrl', controller);

  controller.$inject = ['$timeout', '$http', 'Segment', 'AnonId'];

  function controller($timeout, $http, Segment, AnonId) {

    var vm = this;

    vm.download = function(downloadForm) {
      // This will enable validation message to show,
      // in the event they hit the submit button without touching the email text input
      downloadForm.$setDirty();

      if (downloadForm.$valid) {

        AnonId.get(function(anonId) {

          // Analytics Tracking

          // Browser-side tracking
          Segment.alias(vm.downloadEmail,
            function() {
              Segment.identify(vm.downloadEmail, {
                email: vm.downloadEmail
              });

              Segment.track('clicked download ReQLPro', {
                "downloadCTA": vm.downloadCTA,
                "downloadEmail": vm.downloadEmail
              });
            });

          // Server-side tracking
          var segmentPayload = {
            anonId: anonId,
            event: 'clicked download ReQLPro',
            traits: {
              email: vm.downloadEmail
            },
            properties: {
              "downloadCTA": vm.downloadCTA,
              "downloadEmail": vm.downloadEmail
            }
          }

          // Capture Download Request
          // $http.post('https://contact-form-api.herokuapp.com/api/v1/contact/reqlpro', {
          $http.post('http://localhost:9000/api/v1/contact/reqlpro', {
            email: vm.downloadEmail,
            segment: segmentPayload
          }).then(function(res) {
            $timeout(function() {
              vm.showDownloadSuccess = true;
            });
          }).catch(function(err) {
            console.log("err", err)
          });

        });
      }

    };

    vm.init = function() {
      vm.downloadCTA = 'Get the Beta';
    };

    vm.init();
  }
})();
