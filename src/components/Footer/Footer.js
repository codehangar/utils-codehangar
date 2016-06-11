(function() {
  'use strict';

  angular
    .module("utils.codehangar")
    .directive("footer", directive);

  function directive() {
    return {
      restrict: 'A',
      scope: {},
      templateUrl: 'components/Footer/Footer.html',
      controller: controller,
      controllerAs: 'vm',
      bindToController: true
    }
  }

  function controller() {
    var vm = this;

    vm.submit = function(email) {
      if (!email) {
        return;
      }

      analytics.alias(email, {}, {}, function() {
        analytics.identify(email, {
          email: email
        });

        analytics.track('email subscribe', {
          source: 'utils.codehangar',
          email: email,
          position: 'page bottom'
        });
      })
    }

    vm.init = function() {

    };
    vm.init();
  }
})();
