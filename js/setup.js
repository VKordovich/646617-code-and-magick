'use strict';
(function () {
  // показ окна с выбором персонажа
  window.setup = {
    userWindowSetting: document.querySelector('.setup'),
    setupClose: document.querySelector('.setup-close')
  };
  window.setup.userWindowSetting.classList.remove('hidden');

  // показ области дополнительных персонажей
  document.querySelector('.setup-similar').classList.remove('hidden');

  var form = window.setup.userWindowSetting.querySelector('.setup-wizard-form');
  var WIZARD_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var wizardElement = document.querySelector('.setup-wizard');
  var wizardCoatCurrent = wizardElement.querySelector('.wizard-coat');
  var inputCoatCurrent = document.querySelector('.setup-player input:nth-of-type(1)');
  var wizardEyesCurrent = wizardElement.querySelector('.wizard-eyes');
  var inputEyesCurrent = document.querySelector('.setup-player input:nth-of-type(2)');
  var setupFireballCurrent = document.querySelector('.setup-fireball-wrap');
  var inputFireballCurrent = setupFireballCurrent.querySelector('input');

  var wizardsAll = [];
  var setupOpen = document.querySelector('.setup-open');
  // генератор случайных чисел
  var renderName = function (min, max) {
    var randomWizard = min - 0.5 + Math.random() * (max - min + 1);
    randomWizard = Math.round(randomWizard);
    return randomWizard;
  };

  // создание элемента

  // eslint-disable-next-line no-unused-vars
  var onLoadToServer = function (response) {
    window.setup.userWindowSetting.classList.add('hidden');
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onLoadToServer, onErrorLoad);
    evt.preventDefault();
  });

  var onLoad = function (wizards) {
    wizardsAll = wizards;
    // eslint-disable-next-line no-unused-vars
    window.render(wizards);
  };

  var onErrorLoad = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 300px auto; text-align: center; background-color: red; width: 1000px; min-height: 100px;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '60px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onLoad, onErrorLoad);

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var openPopup = function () {
    window.setup.userWindowSetting.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    window.setup.userWindowSetting.classList.add('hidden');
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

  window.setup.setupClose.addEventListener('click', function () {
    closePopup();
  });

  window.setup.setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  var coatColor;
  var eyesColor;

  var DEBOUNCE_INTERVAL = 1000;
  var lastTimeout;
  var debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render(wizardsAll.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  var changeColorWizard = function (place, color, hideInput, choose) {
    place.style = 'fill: ' + color;
    hideInput.value = color;
    if (choose) {
      coatColor = color;
      debounce(updateWizards);
    } else {
      eyesColor = color;
      debounce(updateWizards);
    }
  };

  var changeColorFireball = function (place, color, hideInput) {
    place.style = 'background: ' + color;
    hideInput.value = color;
  };

  wizardCoatCurrent.addEventListener('click', function () {
    changeColorWizard(wizardCoatCurrent, WIZARD_COAT[renderName(0, WIZARD_COAT.length - 1)], inputCoatCurrent, true);
  });

  wizardEyesCurrent.addEventListener('click', function () {
    changeColorWizard(wizardEyesCurrent, WIZARD_EYES[renderName(0, WIZARD_EYES.length - 1)], inputEyesCurrent, false);
  });

  setupFireballCurrent.addEventListener('click', function () {
    changeColorFireball(setupFireballCurrent, FIREBALL_COLOR[renderName(0, FIREBALL_COLOR.length - 1)], inputFireballCurrent);
  });
})();
