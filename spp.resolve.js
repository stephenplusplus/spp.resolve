angular.module('spp.resolve', []).
  factory('ResolveService',
  ['$q', '$injector',
  function ResolveService($q, $injector) {
    'use strict';

    function resolve(serviceSignature) {
      var deferred = $q.defer();
      var service = serviceSignature.split('.')[0];
      var method = serviceSignature.split('.')[1];

      $injector.get(service)[method]().
        success(deferred.resolve).
        error(deferred.reject);

      return deferred.promise;
    }

    return resolve;
  }]);
