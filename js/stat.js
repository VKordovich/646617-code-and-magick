var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 250;
var GAP_TEXT = 20;
var GAP_UP = 20;
var GAP = 50;
var STRING_WIDTH = 40;
var barHeight = -150;
var winCong = ["Ура вы победили!", "Список результатов:"];

var createCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr) {
  var maxElement = arr[0];

  for (var i = 1; i <= arr.length - 1; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function(ctx, names, times) {
  createCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
  createCloud(ctx, 100, 10, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = "16px PT Mono";

  for (var j = 0; j < winCong.length; j++) {
  ctx.fillText(winCong[j], CLOUD_X + GAP_TEXT, GAP_TEXT * (j + 2))
  };

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
  ctx.fillText(names[i], CLOUD_X + GAP + (STRING_WIDTH + GAP) * i, CLOUD_Y);
  ctx.fillRect(CLOUD_X + GAP + (STRING_WIDTH + GAP) * i, CLOUD_Y - GAP_UP, STRING_WIDTH, (barHeight * times[i]) / maxTime);
  }

};
