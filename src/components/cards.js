//массив карт
const arhizImage = new URL(
  'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  import.meta.url
);
const chelImage = new URL(
  'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  import.meta.url
);
const ivanovoImage = new URL(
  'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  import.meta.url
);
const camchatkaImage = new URL(
  'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  import.meta.url
);
const kholmImage = new URL(
  'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  import.meta.url
);
const bajkalImage = new URL(
  'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  import.meta.url
);
export const initialCards = [
  {
    name: 'Архыз',
    link: arhizImage
  },
  {
    name: 'Челябинская область',
    link: chelImage
  },
  {
    name: 'Иваново',
    link: ivanovoImage
  },
  {
    name: 'Камчатка',
    link: camchatkaImage
  },
  {
    name: 'Холмогорский район',
    link: kholmImage
  },
  {
    name: 'Байкал',
    link: bajkalImage
  }
];
