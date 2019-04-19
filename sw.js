/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/404.html","dc79aafb4e9705b999de8993efb416e6"],["/about/index.html","c5c5095044273007747f6b88a31675e8"],["/assets/css/main.css","c4d84a9afd39f8cb3a80399d5aca4c11"],["/assets/img/favicon.jpg","9c074db9e5c42b11d0dc3ecde4ed2044"],["/assets/img/icons/DL-soft.svg","9e3dadc5e5f3e73089ae7bdca933e144"],["/assets/img/icons/android-chrome-192x192.png","85e2981c866c6608758d365c0895835d"],["/assets/img/icons/android-chrome-512x512.png","9a9ef66460e91e6e76fe61e3afb46ddd"],["/assets/img/icons/apple-touch-icon.png","0ac3d12b1cef98c30e6a99d67d999204"],["/assets/img/icons/favicon-16x16.png","80d90da4f1e244b3c18f2af0b6c7d524"],["/assets/img/icons/favicon-32x32.png","81dbdb9466a66ec21a227c2e53381461"],["/assets/img/icons/gears-02.svg","69ebf866e9c63eeebf4aed6a4b6304f9"],["/assets/img/icons/gears.svg","208a07bec110fabaa3c21ad013fc33ad"],["/assets/img/icons/icon-github.svg","4e06335104a29f91e08d4ef420da7679"],["/assets/img/icons/icon-instagram.svg","1e1119e2628235ee4c8771bff15eb2ca"],["/assets/img/icons/icon-twitter.svg","30551913d5399d6520e8a74b6f1e23f0"],["/assets/img/icons/insight.svg","8d11038d2abbb5d1ee8027a3f6007d34"],["/assets/img/icons/mstile-144x144.png","296c3113ccc868d4614c79944d13dd90"],["/assets/img/icons/mstile-150x150.png","3a89e27fffdee06ed373e50af12dc840"],["/assets/img/icons/mstile-310x150.png","78c1237e9154d25d8381b23cc6123c17"],["/assets/img/icons/mstile-310x310.png","f1a8c3e40b4b6434e71a05570638ff5a"],["/assets/img/icons/mstile-70x70.png","bac745a89c2f5297ab1a3bb27547342e"],["/assets/img/icons/predictive.svg","d7c705b057a6936b5cdde1825c6458ad"],["/assets/img/icons/puzzles-02.svg","1299c064b5dbb4356616f9eea9e90775"],["/assets/img/icons/puzzles-05.svg","bef02cedeb1ea1c71d0658b4cc70c444"],["/assets/img/icons/safari-pinned-tab.svg","41a27c4d4c5d87546305883ff90bf68a"],["/assets/img/posts/hero.jpg","c5a934c87b9fcc4b568724c418109886"],["/assets/img/posts/hero2.jpg","5562c901f68f9f3e347bbacd127eb528"],["/assets/img/posts/hero3.jpg","f67ab8bf74098dc1b8773ee2c4b61093"],["/assets/img/posts/hero3_lg.jpg","f67ab8bf74098dc1b8773ee2c4b61093"],["/assets/img/posts/hero3_md.jpg","d929b5f70b62008337ad278ab3942557"],["/assets/img/posts/hero3_placehold.jpg","8a3bc40fe72f062636e41b271d106cc7"],["/assets/img/posts/hero3_sm.jpg","f7f808312790a8ad0c882b530f8293c4"],["/assets/img/posts/hero3_thumb.jpg","6aa316c2af8bcc966b2daa4beec59b3f"],["/assets/img/posts/hero3_thumb@2x.jpg","7bdc3bae6ec53132d0b22e2a5abe50d4"],["/assets/img/posts/hero3_thumbnail.jpg","6052171dfe74de773397ff7e008e73ad"],["/assets/img/posts/hero3_thumbnail@2x.jpg","eda0691f9ffb67b0041bb31741f3bb6e"],["/assets/img/posts/hero3_xs.jpg","0ca0b4ff6e840f53a6d7412a3c22972f"],["/assets/img/posts/hero5.jpg","f108edbcac2a50bb8aa8321be1ea7a2e"],["/assets/img/posts/hero6.jpg","50208cee0b60a43799169f0e997b46c8"],["/assets/img/posts/hero6_lg.jpg","50208cee0b60a43799169f0e997b46c8"],["/assets/img/posts/hero6_md.jpg","1d123631675b29313a1a01291a6ece79"],["/assets/img/posts/hero6_placehold.jpg","d61ec9e858931384d1d095a154a7f4ac"],["/assets/img/posts/hero6_sm.jpg","97f19822789d154ed8dc30ca386e846c"],["/assets/img/posts/hero6_thumb.jpg","0ebdfd3648e29617f0c4ceb1e910ab9c"],["/assets/img/posts/hero6_thumb@2x.jpg","dc98e2e37aafe39276a75945e71468e3"],["/assets/img/posts/hero6_xs.jpg","07f39dba938b912146acb0f0d2d9aa0f"],["/assets/js/bundle.js","df854a763d7d3fd95381b95081eb822f"],["/assets/js/jquery.min.js","895323ed2f7258af4fae2c738c8aea49"],["/assets/js/main.js","7ca1e55d0e1fe01b5e054521c481ee62"],["/assets/js/skel.min.js","93140e29fa68bab55ce6eae874ae674d"],["/contact/index.html","442dfc7783683d9f44fbbe58128abf63"],["/gulpfile.babel.js","f84760e8e054ec40c9b3813abcc88b1a"],["/index.html","c27f02cad64fae0db6982ae8cebbbba1"],["/sw.js","067a05cbb4fc3fe1b44193f867db8c41"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







