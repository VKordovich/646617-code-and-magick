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

// генератор случайных чисел
var renderName = function (min, max) {
  var randomWizard = min - 0.5 + Math.random() * (max - min + 1);
  randomWizard = Math.round(randomWizard);
  return randomWizard;
}

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
