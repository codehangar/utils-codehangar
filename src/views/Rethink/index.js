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
          $http.post('https://contact-form-api.herokuapp.com/api/v1/contact/reqlpro', {
            // $http.post('http://localhost:9000/api/v1/contact/reqlpro', {
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

    vm.downloadClick = function(group, link) {
      Segment.track('clicked download ReQLPro', {
        "version": group.version,
        "platform": link.platform,
        "url": link.url
      });
    };

    vm.init = function() {
      vm.downloadCTA = 'Get the Beta';

      vm.downloads = [{
        version: '0.0.3',
        details: 'http://codehangar.io/reqlpro-003-windows-support-insert-edit/',
        links: [{
          platform: 'Mac OS X',
          url: 'https://s3.amazonaws.com/reqlpro/ReQLPro_0.0.3.dmg'
        }, {
          platform: 'Windows 64 Bit',
          url: 'https://s3.amazonaws.com/reqlpro/ReQLPro_0.0.3-win32-x64.zip'
        }]
      }, {
        version: '0.0.2',
        details: 'http://codehangar.io/reqlpro-version-0-0-2/',
        links: [{
          platform: 'Mac OS X',
          url: 'https://s3.amazonaws.com/reqlpro/ReQLPro_0.0.2.dmg'
        }]
      }, {
        version: '0.0.1',
        details: 'http://codehangar.io/rethinkdb-data-management-made-easy-with-reqlpro-admin-gui/',
        links: [{
          platform: 'Mac OS X',
          url: 'https://s3.amazonaws.com/reqlpro/ReQLPro_0.0.1.dmg'
        }]
      }]
    };

    vm.init();
  }
})();
