'use strict';

// Функция случайного выбора цвета
(function () {
  window.colorizeItem = function (element, arr, input) {
    var color = window.randomData(arr);
    if (element.hasAttribute('xlink:href')) {
      element.style.fill = color;
    } else {
      element.style.background = color;
    }
    document.querySelector(input).value = color;
  };
})();
