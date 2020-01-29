'use strict';

var POSITION_X_MIN = 0;
var POSITION_X_MAX = 1200;
var POSITION_Y_MIN = 130;
var POSITION_Y_MAX = 630;
var SIMILAR_ADS = 8;
var SIMILAR_PHOTOS = 3;
var PIN_LOCATION_X = 25;
var PIN_LOCATION_Y = 70;
var ADS_TIME = ['12:00', '13:00', '14:00'];
var ADS_TYPE = ['palace', 'flat', 'hause', 'bungalo'];
var ADS_TYPE_MAP = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'place': 'Дворец'
};
var NUMBER_ROOMS = {
  'one': 'комната',
  'few': 'комнаты',
  'other': 'комнат'};
var NUMBER_GUESTS = {
  'one': 'гостя',
  'few': 'гостей',
  'other': 'гостей'};
var ADS_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var MAP = document.querySelector('.map');
var mapFiltersContainer = document.querySelector('.map__filters-container');
var PIN = document.querySelector('#pin').content.querySelector('.map__pin');
var CARD = document.querySelector('#card').content;
var cardElement = CARD.cloneNode(true);
var popupTitle = cardElement.querySelector('.popup__title');
var popupTextAddress = cardElement.querySelector('.popup__text-address');
var popupTextPrice = cardElement.querySelector('.popup__text-price');
var popupType = cardElement.querySelector('.popup__type');
var popupTextCapacity = cardElement.querySelector('.popup__text—capacity');
var popupTextTime = cardElement.querySelector('.popup__text-time');
var popupFeatures = cardElement.querySelector('.popup__features');
var popupDescription = cardElement.querySelector('.popup-description');
var popupPhotos = cardElement.querySelector('.popup__photos');
var popupPhoto = popupPhotos.querySelector('.popup__photo');
var popupAvatar = cardElement.querySelector('.popup__avatar');

var generateAds = function (i) {
  var randomX = getRandomBetween(POSITION_X_MIN, POSITION_X_MAX);
  var randomY = getRandomBetween(POSITION_Y_MIN, POSITION_Y_MAX);

  return {
    author: {
      avatar: 'img/avatars/user0' + (i) + '.png'
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
      photos: getPhotos()
    },

    location: {
      x: randomX - PIN_LOCATION_X,
      y: randomY - PIN_LOCATION_Y
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

var getConditionCheck = function (number, word) {
  var tens = Math.abs(number) % 100;
  var units = number % 10;
  if (tens > 10 && tens < 20) {
    return word.other;
  }
  if (units > 1 && units < 5) {
    return word.few;
  }
  if (units === 1) {
    return word.one;
  }
  return word.other;
};

var getFeaturesPopup = function (item) {
  popupFeatures.innerHtml = '';
  for (var i = 0; i < item.offer.features.length; i++) {
    var createElement = document.createElement('li');
    createElement.classList.add('.popup__feature');
    createElement.classList.add('.popup__feature--' + item.offer.features[i]);
    popupFeatures.appendChild(createElement);
  }
};

var getPhotosPopup = function (item) {
  for (var i = 0; i < item.offer.photos.length; i++) {
    if (i === 0) {
      popupPhoto.src = item.offer.photos[i];
    } else {
      var clonPopupPhoto = popupPhoto.cloneNode(true);
      clonPopupPhoto.src = item.offer.photos[i];
      popupPhotos.appendChild(clonPopupPhoto);
    }
  }
};

var renderPins = function (item) {
  var pinElement = PIN.cloneNode(true);
  var pinElementImg = pinElement.querySelector('img');

  pinElement.style.left = item.location.x + 'px';
  pinElement.style.top = item.location.y + 'px';
  pinElementImg.src = item.author.avatar;
  pinElementImg.alt = item.offer.description;

  return pinElement;
};

var showPopup = function (item) {
  popupTitle.textContent = item.offer.title;
  popupTextAddress.textContent = item.offer.address;
  popupTextPrice.textContent = item.offer.price + '₽/ночь';
  popupType.textContent = ADS_TYPE_MAP[item.offer.type];
  popupTextCapacity.textContent = item.offer.rooms + ' ' + getConditionCheck(item.offer.rooms, NUMBER_ROOMS) + ' для ' + item.offer.guests + ' ' + getConditionCheck(item.offer.guests, NUMBER_GUESTS);
  popupTextTime.textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
  getFeaturesPopup(item);
  popupDescription.textContent = item.offer.description;
  getPhotosPopup(item);
  popupAvatar.src = item.author.avatar;

  MAP.appendChild(cardElement);
  MAP.insertBefore(cardElement, mapFiltersContainer);
};

var getAds = function () {
  var ads = [];
  for (var i = 1; i <= SIMILAR_ADS; i++) {
    ads.push(generateAds(i));
  }

  return ads;
};

var getPhotos = function () {
  var photos = [];
  for (var i = 1; i <= SIMILAR_PHOTOS; i++) {
    photos.push('http://o0.github.io/assets/images/tokyo/hotel' + i + '.jpg');
  }

  return photos;
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


// Вот эту, не понимаю что с ней делать
showPopup();
