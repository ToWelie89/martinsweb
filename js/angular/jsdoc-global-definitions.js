/**
 * @namespace attributes
 * @description Attributes that can be expected from back end.
 */

/**
 * @namespace controllers
 * @description Controllers coupled to a specific view.
 */

/**
 * @namespace directives
 * @description Reusable directives that can be coupled to multiple views.
 */

/**
 * @namespace errors
 * @description Error codes
 */

/**
 * @namespace filters
 * @description Reusable filters that can be consumed by {@link controllers}, {@link directives} and {@link services}.
 */

/**
 * @namespace services
 * @description Reusable services that can be consumed by {@link controllers}, {@link directives} and {@link filters}.
 */

/**
 * @constructor Promise
 * @description A new promise instance is created when a deferred instance is created and can be retrieved by calling deferred.promise.
 * The purpose of the promise object is to allow for interested parties to get access to the result of the deferred task when it completes.
 * See {@link https://code.angularjs.org/1.2.26/docs/api/ng/service/$q#the-promise-api}
 */
/**
 * @function Promise#then
 * @description Regardless of when the promise was or will be resolved or rejected,
 * then calls one of the success or error callbacks asynchronously as soon as the result is available.
 * The callbacks are called with a single argument: the result or rejection reason.
 * Additionally, the notify callback may be called zero or more times to provide a progress indication,
 * before the promise is resolved or rejected.
 * This method returns a new promise which is resolved or rejected via the return value of the successCallback, errorCallback.
 * It also notifies via the return value of the notifyCallback method.
 * The promise can not be resolved or rejected from the notifyCallback method.
 * @param {Function} successCallback
 * @param {Function} errorCallback
 * @param {Function} notifyCallback
 */
/**
 * @function Promise#catch
 * @description shorthand for Promise.then(null, errorCallback).
 * @param {Function} errorCallback
 */
/**
 * @function Promise#finally
 * @description Allows you to observe either the fulfillment or rejection of a promise,
 * but to do so without modifying the final value.
 * This is useful to release resources or do some clean-up that needs to be done whether the promise was rejected or resolved.
 * See the {@link https://github.com/kriskowal/q/wiki/API-Reference#promisefinallycallback} for more information.
 * Because finally is a reserved word in JavaScript and reserved keywords are not supported as property names by ES3,
 * you'll need to invoke the method like promise['finally'](callback) to make your code IE8 and Android 2.x compatible.
 * @param {Function} callback
 */