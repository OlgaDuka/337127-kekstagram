'use strict';

// Константы
var NAMES = ['Федор', 'Артем', 'Маша', 'Петя', 'Вася', 'Наташа'];
var COMMENTS = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'Какая прелесть!',
  'Боже мой, я тоже хочу там побывать...',
  'И что автор хотел сказать этим ужасным видом?!!',
  'Мне здесь нравится все: и вид, и качество снимка. Но вот чего-то все же не хватает...',
  'За такие фотографии я бы руки отрывал.',
  'Ай, молодец! Ай, красава!',
  'Боже! Это куда ж вас занесло...',
  'Такое не забудется никогда!',
  'Ну и крокодил...',
  'У вас что, затвор заело?',
  'Я обязательно должен это увидеть своими глазами. Пишите адрес.'];
var DESCRIPTIONS = [
  'Тестим новую камеру! =)',
  'Это мы на Бали',
  'Вы только посмотрите, какая красота!!',
  'Дух соревнования неистребим.',
  'Н-да... Хотели, как лучше.',
  'Таких снимков у меня еще не было!',
  'Это мы в гостях.',
  'На другом конце света...',
  'Эх, вернуться бы сюда еще раз лет через 10...',
  'Это было очень вкусно',
  'Скорость такая, что дух захватывает.',
  'Знакомьтесь - это наш Вася!',
  'Приглашаем всех на праздник.',
  'А готовил это все мой самый лучший друг.',
];
var MAX_PICTURES = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var NUM_AVATAR = 6;

// Оъект DOM, содержащий список фотографий
var picturesContainer = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
// Часть шаблона - фотография случайного пользователя
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
//  Фрагмент документа, который формируется для вставки в документ
var fragment = document.createDocumentFragment();

// Функции:
// Получение случайного целого значения, включая minValue и исключая maxValue
var getRandomInt = function (minValue, maxValue) {
  return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
};

// Получение случайного значения из массива
var generateDataFromArr = function (arr) {
  var indexRandom = getRandomInt(0, arr.length);
  return arr.splice(indexRandom, 1);
};

var makeElement = function (nameTeg, nameClass, text) {
  var element = document.createElement(nameTeg);
  element.classList.add(nameClass);
  if (text) {
    element.textContent = text;
  }
  return element;
};


// Формирование комментариев для каждого объекта фотографии
var generateComments = function () {
  var lengthArr = getRandomInt(1, 4);
  var arrComments = [];
  var arrLocalComments = COMMENTS.slice();
  var arrLocalNames = NAMES.slice();
  for (var i = 0; i < lengthArr; i++) {
    arrComments[i] = {
      avatar: 'img/avatar-' + getRandomInt(1, NUM_AVATAR) + '.svg',
      message: generateDataFromArr(arrLocalComments),
      name: generateDataFromArr(arrLocalNames)
    };
  }
  return arrComments;
};

// Создание массива объектов фотографий
var generatePictures = function (numberObj) {
  var pictures = [];
  var offset = getRandomInt(1, MAX_PICTURES);
  for (var j = 1; j <= numberObj; j++) {
    var numPhoto = j + offset;
    if (numPhoto > 25) {
      numPhoto -= 25;
    }
    pictures[j] = {
      url: 'photos/' + numPhoto + '.jpg',
      likes: getRandomInt(MIN_LIKES, MAX_LIKES),
      comments: generateComments(),
      description: DESCRIPTIONS[getRandomInt(1, DESCRIPTIONS.length)]
    };
  }
  return pictures;
};

// Формирование данных фотографии - заполнение данными из массива объектов
var renderPicture = function (data) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = data.url;
  pictureElement.querySelector('.picture__likes').textContent = data.likes;
  pictureElement.querySelector('.picture__comments').textContent = data.comments.length;
  return pictureElement;
};

// Формирование данных фотографии - заполнение данными из массива объектов
var renderBigPicture = function (firstPicture) {

  bigPicture.querySelector('.big-picture__img').querySelector('#big').src = firstPicture.url;
  bigPicture.querySelector('.likes-count').textContent = firstPicture.likes;
  var numComments = firstPicture.comments.length;
  bigPicture.querySelector('.comments-count').textContent = numComments;

  var socialComments = bigPicture.querySelector('.social__comments');

  for (var i = 0; i < numComments; i++) {
    var socialComment = makeElement('li', 'social__comment');
    var socialPicture = makeElement('img', 'social__picture');
    socialPicture.src = firstPicture.comments[i].avatar;
    socialPicture.alt = firstPicture.comments[i].name;
    socialPicture.whidth = '35';
    socialPicture.height = '35';
    socialComment.appendChild(socialPicture);
    var socialText = makeElement('p', 'social__text', firstPicture.comments[i].message);
    socialComment.appendChild(socialText);
    socialComments.appendChild(socialComment);
  }
  bigPicture.querySelector('.social__caption').textContent = firstPicture.description;
};

// Реализация

// Создаем и заполняем данными массив объектов фотографий
var pictures = generatePictures(MAX_PICTURES);
// Переносим данные из массива объектов фотографий во фрагмент с фотографиями для вставки на страницу
pictures.forEach(function (elem) {
  fragment.appendChild(renderPicture(elem));
});
// Добавляем фотографии на страницу
picturesContainer.appendChild(fragment);

// Заполняем фрагмент данными из массива объектов фото для отрисовки большой фотографии в центре страницы
bigPicture.classList.remove('hidden');
// Добавляем большую фотографию на страницу
var firstPicture = pictures[1];
renderBigPicture(firstPicture);
