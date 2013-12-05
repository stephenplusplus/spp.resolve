# spp.resolve

> quit being so imperative with your resolves.

[AngularJS](http://angularjs.org) uses
[resolves within their router](http://docs.angularjs.org/api/ngRoute.$routeProvider).
These let you "resolve" data that a view needs, before it appears to the user.


## why this?

I noticed I was repeating the following pattern a lot...

```js
$routeProvider.
  when('/url', {
    // ...
    resolve: {
      someData: function ($q, SomeService) {
        var deferred = $q.defer();

        SomeService.
          getSomeData().
          success(deferred.resolve);

        return deferred.promise;
      },
      someOtherData: function ($q, SomeOtherService) {
        var deferred = $q.defer();

        SomeOtherService.
          getSomeOtherData().
          success(deferred.resolve);

        return deferred.promise;
      }
    }
  }).
  when('/another-url', {
    // ...
    resolve: {
      data: function ($q, AnotherService) {
        var deferred = $q.defer();

        AnotherService.
          getData().
          success(deferred.resolve);

        return deferred.promise;
      },
      moreData: function ($q, AnotherService) {
        var deferred = $q.defer();

        AnotherService.
          getMoreData().
          success(deferred.resolve);

        return deferred.promise;
      }
    }
  });
```

As you begin to create more views, and they start to get more complex, you'll be
relying on these resolves quite a bit. Soon, your `resolve` objects will get out
of hand, leaving you scrolling and copying and pasting like a monkey.

`spp.resolve` tries to help other monkeys like me...

```js
function resolve(serviceSignature) {
  return function (ResolveService) {
    return ResolveService(serviceSignature);
  };
}

$routeProvider.
  when('/url', {
    // ...
    resolve: {
      someData: resolve('SomeService.getSomeData'),
      someOtherData: resolve('SomeService.getSomeOtherData')
    }
  }).
  when('/another-url', {
    // ...
    resolve: {
      data: resolve('AnotherService.getData'),
      moreData: resolve('AnotherService.getMoreData')
    }
  });
```


## how to use `spp.resolve`

1. Download it from here, or Bower: `bower install spp.resolve`
2. Add `spp.resolve` as a dependency of your Angular module.
3. Create a `resolve` function in your module's `config` block. (Steal from the
sample code above)
4.


## disclaimers

This probably won't just plug-in to your existing, non-trivial application, so
feel free to experiment and hack it upt to make it work within your app... and
when you do, send back a PR!

*Notice* For all I know, I'm using Angular's routing system entirely wrong.
