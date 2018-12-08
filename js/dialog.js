'use strict';
(function () {

  var dialogHandler = window.setup.userWindowSetting.querySelector('.upload');
  var START_TOP = 80;
  var START_LEFT = 50;

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.setup.userWindowSetting.style.top = (window.setup.userWindowSetting.offsetTop - shift.y) + 'px';
      window.setup.userWindowSetting.style.left = (window.setup.userWindowSetting.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        // eslint-disable-next-line no-shadow
        var onClickPreventDefault = function (evt) {
          evt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }

    };

    var resetWin = function () {
      window.setup.userWindowSetting.style.top = START_TOP + 'px';
      window.setup.userWindowSetting.style.left = START_LEFT + '%';
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    window.setup.setupClose.addEventListener('click', resetWin);
  });

})();
