/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */

;(function($) {

  var types = ['DOMMouseScroll', 'mousewheel'];

  if ($.event.fixHooks) {
    for (var i = types.length; i;) {
      $.event.fixHooks[types[--i]] = $.event.mouseHooks;
    }
  }

  $.event.special.mousewheel = {
    setup: function() {
      if (this.addEventListener) {
        for (var i = types.length; i;) {
          this.addEventListener(types[--i], handler, false);
        }
      } else {
        this.onmousewheel = handler;
      }
    },

    teardown: function() {
      if (this.removeEventListener) {
        for (var i = types.length; i;) {
          this.removeEventListener( types[--i], handler, false );
        }
      } else {
        this.onmousewheel = null;
      }
    }
  };

  $.fn.extend({
    mousewheel: function(data, cb) {
      cb = cb || data;
      typeof data === "function" && (data = null);
      return cb ? this.bind("mousewheel", data, cb) : this.trigger("mousewheel");
    },
    unmousewheel: function(cb) {
      return this.unbind("mousewheel", cb);
    }
  });


  function handler(event) {
    var orgEvent = event || window.event,
        args = [].slice.call(arguments, 1),
        returnValue = true;
    event = $.event.fix(orgEvent);
    event.type = "mousewheel";

    // Old school scrollwheel delta
    if (orgEvent.wheelDelta) { event.delta = orgEvent.wheelDelta / 120; }
    if (orgEvent.detail) { event.delta = -orgEvent.detail / 3; }

    // New school multidimensional scroll (touchpads) deltas
    event.deltaY = event.delta;

    // Gecko
    if (orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
      event.deltaY = 0;
      event.deltaX = -1 * event.delta;
    }

    // Webkit
    if (orgEvent.wheelDeltaY !== undefined) { event.deltaY = orgEvent.wheelDeltaY / 120; }
    if (orgEvent.wheelDeltaX !== undefined) { event.deltaX = -1 * orgEvent.wheelDeltaX / 120; }

    // Add event and delta to the front of the arguments
    // args.unshift(event, delta, deltaX, deltaY);

    return ($.event.dispatch || $.event.handle).call(this, event);
  }
})(jQuery);
