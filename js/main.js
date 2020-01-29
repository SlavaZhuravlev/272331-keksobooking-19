'use strict';

var POSITION_X_MIN = 0;
var POSITION_X_MAX = 1200;
var POSITION_Y_MIN = 130;
var POSITION_Y_MAX = 630;
var SIMILAR_ADS = 8;
var PIN_LOCATION_X = 25;
var PIN_LOCATION_Y = 70;
var ADS_TIME = ['12:00', '13:00', '14:00'];
var ADS_TYPE = ['palace', 'flat', 'hause', 'bungalo'];
var ADS_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ADS_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var MAP = document.querySelector('.map');
var PIN = document.querySelector('#pin').content.querySelector('.map__pin');

var generateAds = function (i) {
  var randomX = getRandomBetween(POSITION_X_MIN, POSITION_X_MAX);
  var randomY = getRandomBetween(POSITION_Y_MIN, POSITION_Y_MAX);

  return {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },

    offer: {
      title: 'Описание предложения',
      address: randomX + ',' + randomY,
      price: 1000,
      type: getRandomElement(ADS_TYPE),
      rooms: 4,
      guests: 4,
      checkin: getRandomBetween(ADS_TIME),
      checkout: getRandomElement(ADS_TIME),
      features: getRandomElement(ADS_FEATURES),
      description: 'Описание жилья',
      photos: ADS_PHOTOS
    },

    location: {
      x: randomX,
      y: randomY
    }
  };
};

var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomBetween = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var renderPins = function (item) {
  var pinElement = PIN.cloneNode(true);
  var pinElementImg = pinElement.querySelector('img');

  pinElement.style.left = item.location.x - PIN_LOCATION_X / 2 + 'px';
  pinElement.style.top = item.location.y - PIN_LOCATION_Y + 'px';
  pinElementImg.src = item.author.avatar;
  pinElementImg.alt = item.offer.description;

  return pinElement;
};

var getAds = function () {
  var ads = [];
  for (var i = 0; i < SIMILAR_ADS; i++) {
    ads.push(generateAds(i));
  }

  return ads;
};

var similarPins = function (ads) {
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  ads.forEach(function (ad) {
    fragment.appendChild(renderPins(ad));
  });

  mapPins.appendChild(fragment);
};

similarPins(getAds());

MAP.classList.remove('map--faded');
