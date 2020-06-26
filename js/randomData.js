'use strict';
(function () {
  window.randomData = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };
})();
