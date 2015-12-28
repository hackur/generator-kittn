/**
 * Modernizr Fallback Loader
 * @description It will loaded Global with Browserify Shim
 * The test are asynchron now
 * https://github.com/Modernizr/Modernizr#new-asynchronous-event-listeners
 */

// JS Loader
// https://github.com/pyrsmk/toast
import toast from 'pyrsmk-toast'
import Modernizr from 'Modernizr'

// Test for Pictur
Modernizr.on('picture', ( result ) => {
  if (!result) {
    toast('assets/js/ls.respimg.min.js');
  }
})
