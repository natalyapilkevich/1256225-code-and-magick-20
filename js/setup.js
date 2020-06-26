'use strict';
// Создание персонажа
(function () {

  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');

  wizardCoat.addEventListener('click', function () {
    window.colorizeItem(wizardCoat, window.util.WIZARD_COAT_COLOR, 'input[name=coat-color]');
  });

  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');

  wizardEyes.addEventListener('click', function () {
    window.colorizeItem(wizardEyes, window.util.WIZARD_EYES_COLOR, 'input[name=eyes-color]');
  });

  var wizardFireball = document.querySelector('.setup-fireball-wrap');

  wizardFireball.addEventListener('click', function () {
    window.colorizeItem(wizardFireball, window.util.WIZARD_FIREBALL_COLOR, 'input[name=fireball-color]');
  });

})();
