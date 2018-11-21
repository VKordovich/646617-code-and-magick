'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 260;
var GAP_TEXT = 20;
var GAP_UP = 20;
var GAP = 50;
var STRING_WIDTH = 40;
var barHeight = 150;
var winCong = ['Ура вы победили!', 'Список результатов:'];

// создание облака
var createCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// поис максимального значения
var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i <= arr.length - 1; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

// цвет столбцов
var getFillColumn = function (name) {
  var rnd = Math.random();
  if (name === 'Вы') {
    var colorColumn = 'rgba(255, 0, 0, 1)';
  } else {
    colorColumn = 'rgba(0, 0, 255, ' + rnd + ')';
  }
  return colorColumn;
};

// цвет текста
var getFillText = function () {
  var colorText = '#000';
  return colorText;
};

window.renderStatistics = function (ctx, names, times) {
  createCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
  createCloud(ctx, 100, 10, '#fff');
  ctx.font = '16px PT Mono';
  var maxTime = getMaxElement(times);

  // отрисовка статистики
  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = getFillText();
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP + (STRING_WIDTH + GAP) * i, 250 - ((barHeight * times[i]) / maxTime + GAP_UP));
    ctx.fillText(names[i], CLOUD_X + GAP + (STRING_WIDTH + GAP) * i, CLOUD_Y);
    ctx.fillStyle = getFillColumn(names[i]);
    ctx.fillRect(CLOUD_X + GAP + (STRING_WIDTH + GAP) * i, CLOUD_Y - GAP_UP, STRING_WIDTH, (-barHeight * times[i]) / maxTime);
  }

  for (var j = 0; j < winCong.length; j++) {
    ctx.fillStyle = getFillText();
    ctx.fillText(winCong[j], CLOUD_X + GAP_TEXT, GAP_TEXT * (j + 2));
  }
};
