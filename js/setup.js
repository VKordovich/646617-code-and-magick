'use strict';
// показ окна с выбором персонажа
var userWindowSetting = document.querySelector('.setup');
userWindowSetting.classList.remove('hidden');

// показ области дополнительных персонажей
document.querySelector('.setup-similar').classList.remove('hidden');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var WIZARD_NAMES = ['Иван ', 'Хуан Себастьян ', 'Мария ', 'Кристоф ', 'Виктор ', 'Юлия ', 'Люпита ', 'Вашингтон '];
var WIZARD_FAMILY = ['да Марья ', 'Верон ', 'Мирабелла ', 'Вальц ', 'Онопко ', 'Топольницкая ', 'Нионго ', 'Ирвинг '];
var WIZARD_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

// генератор случайных чисел
var renderName = function (min, max) {
  var randomWizard = min - 0.5 + Math.random() * (max - min + 1);
  randomWizard = Math.round(randomWizard);
  return randomWizard;
};

// массив магов
var arrWizard = function () {
  var wizards = [];
  for (var j = 0; j < 4; j++) {
    wizards[j] = {name: WIZARD_NAMES[renderName(0, 7)] + WIZARD_FAMILY[renderName(0, 7)], coatColor: WIZARD_COAT[renderName(1, 6)], eyesColor: WIZARD_EYES[renderName(1, 5)]};
  }
  return wizards;
};

// создание элемента
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// создание фрагмента
var wizard = arrWizard();
var fragment = document.createDocumentFragment();
for (var i = 0; i < wizard.length; i++) {
  fragment.appendChild(renderWizard(wizard[i]));
}
similarListElement.appendChild(fragment);

userWindowSetting.querySelector('.setup-similar').classList.remove('hidden');

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
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
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var wizardCoatCurrent = document.querySelector('.setup-wizard .wizard-coat');
var inputCoatCurrent = document.querySelector('.setup-player input:nth-of-type(1)');

var wizardEyesCurrent = document.querySelector('.setup-wizard .wizard-eyes');
var inputEyesCurrent = document.querySelector('.setup-player input:nth-of-type(2)');

var setupFireballCurrent = document.querySelector('.setup-fireball-wrap');
var inputFireballCurrent = setupFireballCurrent.querySelector('input');

var changeColorWizard = function (place, color, hideInput) {
  place.style = 'fill: ' + color;
  hideInput.value = color;
};

var changeColorFireball = function (place, color, hideInput) {
  place.style = 'background: ' + color;
  hideInput.value = color;
};

wizardCoatCurrent.addEventListener('click', function () {
  changeColorWizard(wizardCoatCurrent, WIZARD_COAT[renderName(1, WIZARD_COAT.length)], inputCoatCurrent);
});

wizardEyesCurrent.addEventListener('click', function () {
  changeColorWizard(wizardEyesCurrent, WIZARD_EYES[renderName(1, WIZARD_EYES.length)], inputEyesCurrent);
});

setupFireballCurrent.addEventListener('click', function () {
  changeColorFireball(setupFireballCurrent, FIREBALL_COLOR[renderName(1, FIREBALL_COLOR.length)], inputFireballCurrent);
});
