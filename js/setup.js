'use strict';
// Создание персонажа

var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var NUMBER_OF_WIZARDS = 4;

var userDialog = document.querySelector('.setup');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var randomData = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var wizards = [];
for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
  var eachWizard = {
    name: randomData(WIZARD_FIRST_NAMES) + ' ' + randomData(WIZARD_LAST_NAMES),
    coatColor: randomData(WIZARD_COAT_COLOR),
    eyesColor: randomData(WIZARD_EYES_COLOR)
  };
  wizards.push(eachWizard);
}

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

// Открытие/закрытие окна настройки персонажа

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = document.querySelector('.setup-user-name');

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape' && !userNameInput.matches(':focus')) {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

// Валидация формы создания персонажа

var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function () {
  var valueLength = userNameInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - MIN_NAME_LENGTH) + ' симв.');
  } else {
    userNameInput.setCustomValidity('');
  }
});

var colorizeItem = function (element, arr, input) {
  var color = randomData(arr);
  if (element.hasAttribute('xlink:href')) {
    element.style.fill = color;
  } else {
    element.style.background = color;
  }
  document.querySelector(input).value = color;
};

var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');

wizardCoat.addEventListener('click', function () {
  colorizeItem(wizardCoat, WIZARD_COAT_COLOR, 'input[name=coat-color]');
});

var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');

wizardEyes.addEventListener('click', function () {
  colorizeItem(wizardEyes, WIZARD_EYES_COLOR, 'input[name=eyes-color]');
});

var wizardFireball = document.querySelector('.setup-fireball-wrap');

wizardFireball.addEventListener('click', function () {
  colorizeItem(wizardFireball, WIZARD_FIREBALL_COLOR, 'input[name=fireball-color]');
});
